const app={};

app.nonHandler=(reqProper,callBack)=>{
    callBack(404,{message:"404 Error Page not Found"});
}
module.exports=app;