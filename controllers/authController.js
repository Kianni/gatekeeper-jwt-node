import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import userService from '../services/userService.js';
import secretKey from '../config/secretKey.js';

const authController = {
  serveRegistrationForm: (req, res) => {
    res.sendFile('registration_form.html', { root: 'public' });
  },

  registerUser: async (req, res) => {
    const { username, password } = req.body;

    // Server-side validation
    const usernameRegex = /^[a-zA-Z_]+$/;
    const passwordRegex = /^[0-9]{4,}$/;

    if (!usernameRegex.test(username)) {
      return res.status(400).json({ message: 'Username can only contain letters and underscores.' });
    }

    if (!passwordRegex.test(password)) {
      return res.status(400).json({ message: 'Password must be at least 4 characters long and contain only numbers.' });
    }

    try {
      // Check if the username already exists
      const existingUser = await userService.findUserByUsername(username);
      if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      await userService.createUser({ username, password: hashedPassword });

      res.status(200).json({ message: 'User registered successfully' });
    } catch (err) {
      console.error('Error during user registration:', err);
      res.status(500).json({ message: 'Internal server error', error: err.message });
    }
  },

  serveLoginForm: (req, res) => {
    res.sendFile('login.html', { root: 'public' });
  },

  loginUser: async (req, res) => {
    const { username, password } = req.body;

    try {
      // Find the user by username
      const user = await userService.findUserByUsername(username);
      if (!user) {
        return res.status(400).json({ message: 'Invalid username or password' });
      }

      // Check if the password is correct
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid username or password' });
      }

      // Generate a JWT token
      const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });

      res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
      console.error('Error during user login:', err);
      res.status(500).json({ message: 'Internal server error', error: err.message });
    }
  },

  logoutUser: (req, res) => {
    // Invalidate the token (this can be done by removing it from the client-side)
    res.status(200).json({ message: 'Logout successful' });
  }
};

export default authController;