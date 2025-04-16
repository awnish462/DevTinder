const auth=(req,res,next)=>{
    const token="xyz";
    const isTokenCorrect="xydsadz"===token;
    
    if(!isTokenCorrect){
        console.log("Token is not correct");
        res.send("Token is invalid");
    }else{
        next();
    }
}
module.exports={
auth
}