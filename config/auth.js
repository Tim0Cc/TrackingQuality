function ensureAuthenticated(req,res,next) {
  if(req.isAuthenticated()) {
      return next();
  }
  req.flash('error_msg' , 'Sie müssen eingeloggt sein, um auf diesen Inhalt zugreifen zu können!');
  res.redirect('/login');
}

module.exports = { ensureAuthenticated }