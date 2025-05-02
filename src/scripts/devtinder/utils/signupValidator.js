signUpValidator = function(req) {
    const {firstName, lastName, email, password} = req.body;

    if(!firstName || !lastName){
        throw new Error("Name is required");
    }else if(!email || !password){
        throw new Error("Email or password is required");
    }
}

module.exports = signUpValidator;