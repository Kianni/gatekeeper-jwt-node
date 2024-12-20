document.getElementById('registrationForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Client-side validation
  const usernameRegex = /^[a-zA-Z_]+$/;
  const passwordRegex = /^[0-9]{4,}$/;

  if (!usernameRegex.test(username)) {
    alert('Username can only contain letters and underscores.');
    return;
  }

  if (!passwordRegex.test(password)) {
    alert(
      'Password must be at least 4 characters long and contain only numbers.'
    );
    return;
  }

  const response = await fetch('/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  const result = await response.json();
  if (response.ok) {
    alert(result.message);
    window.location.href = '/';
  } else {
    alert(result.message);
  }

  // Clear the form fields
  usernameInput.value = '';
  passwordInput.value = '';
});
