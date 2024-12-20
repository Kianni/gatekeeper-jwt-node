document.getElementById('loginForm').addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent the default form submission behavior
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const response = await fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  });

  const result = await response.json();
  if (response.ok) {
    alert(result.message); // Display an alert message
    console.log(result.message); // Log the message to the console
    // Store the token in localStorage
    localStorage.setItem('token', result.token);
    // Fetch the dashboard with JWT
    fetchDashboard();
  } else {
    alert(result.message); // Display an alert message for errors
    console.log(result.message); // Log the error message to the console
  }
});

async function fetchDashboard() {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch('/dashboard', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const html = await response.text();
    document.open();
    document.write(html);
    document.close();
  } catch (error) {
    console.error('Error fetching dashboard:', error);
  }
}