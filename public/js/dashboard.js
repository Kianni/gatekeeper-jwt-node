// public/js/dashboard.js
document.addEventListener('DOMContentLoaded', async () => {
  console.log('dashboard.js script loaded');
  const token = localStorage.getItem('token');
  if (!token) {
    console.log('No token found, redirecting to login page');
    window.location.href = '/login.html';
    return;
  }

  try {
    console.log('Token: ', token);
    const response = await fetch('/dashboard', {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error('Error fetching user data:', error);
    window.location.href = '/login.html';
  }
});

document.getElementById('logoutButton').addEventListener('click', () => {
  localStorage.removeItem('token');
  window.location.href = '/login.html';
});