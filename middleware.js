module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        // If it's a POST request to something like /listings/:id/reviews  
        if (req.method === "POST" && req.params.id) {
            req.session.redirectUrl = `/listings/${req.params.id}`;
        } else {
            // Otherwise store the original URL (for GET requests)
            req.session.redirectUrl = req.originalUrl;  // will give the whole path of the route that we were accessing , before logging in 
        }

        req.flash("error", "You must be logged in to perform this operation");
        return res.redirect("/login");
    }
    next();
};




module.exports.saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};