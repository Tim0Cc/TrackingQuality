function ensureAuthenticated(req,res,next) {
  if(req.isAuthenticated()) {
      return next();
  }
  req.flash('error_msg' , 'Failure! You need to be logged in for administrative authorization');
  res.redirect('/login');
}

module.exports = { ensureAuthenticated }