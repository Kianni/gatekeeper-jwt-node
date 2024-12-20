document.getElementById('logoutButton').addEventListener('click', async () => {
  const response = await fetch('/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const result = await response.json();
  if (response.ok) {
    alert(result.message); // Display an alert message
    console.log(result.message); // Log the message to the console
    // Remove the token from localStorage
    localStorage.removeItem('token');
    window.location.href = '/';
  } else {
    alert(result.message); // Display an alert message for errors
    console.log(result.message); // Log the error message to the console
  }
});