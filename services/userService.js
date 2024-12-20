import User from '../models/User.js';

const userService = {
  findUserByUsername: async (username) => {
    return await User.findOne({ username });
  },

  createUser: async (userData) => {
    const newUser = new User(userData);
    return await newUser.save();
  }
};

export default userService;