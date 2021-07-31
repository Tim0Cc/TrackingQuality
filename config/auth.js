function ensureAuthenticated(req,res,next) {
  if(req.isAuthenticated()) {
      return next();
  }
  req.flash('error_msg' , 'Failure! You need to be logged in with administrative authorization');
  res.redirect('/admin/login');
}

module.exports = { ensureAuthenticated }