module.exports = (req, res, next) => {
    if(!req.session.user){
        res.status(403);
        return res.redirect('/login');
    }
    next();
}