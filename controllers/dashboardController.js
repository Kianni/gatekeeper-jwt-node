const serveDashboard = (req, res) => {
  const username = req.user.username;
  res.render('dashboard', { username });
};

export default { serveDashboard };