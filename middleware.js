module.exports.isLoggedIn = (req,res , next) => {
     if(!req.isAuthenticated()){    
        req.session.redirectUrl = req.originalUrl;  // will give the whole path of the route we were accession , before logging in 
        req.flash("error" , "You must be logged in to create listing");
        return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};