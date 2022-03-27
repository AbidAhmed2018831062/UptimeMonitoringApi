const app={};

app.sampleHandler=(reqProper,callBack)=>{
   callBack(200,{message:"This is a sample page! Thank you for visiting us"});
}

module.exports=app;