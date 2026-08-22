const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    if (req.get('accept')?.includes('application/json')) {
      return res.status(401).json({ message: 'Your session expired. Please sign in and retry.' });
    }
    return res.redirect('/user/login');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    if (req.get('accept')?.includes('application/json')) {
      return res.status(401).json({ message: 'Your session expired. Please sign in and retry.' });
    }
    return res.redirect('/user/login');
  }
};
