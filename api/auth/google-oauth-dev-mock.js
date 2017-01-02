
module.exports = (req, res, next)=>{
    req.auth = {
        fullname: 'John Doe',
        email: 'john.doe@givemetime.com'
    };
    next();
};
