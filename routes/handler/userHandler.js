const app={};

app.userHandler=(reqProper,callBack)=>{

    const meth=['get','post','put','delete'];
    if(meth.indexOf(reqProper.method)>-1)
    {
        app.user[reqProper.method](reqProper,callBack);
    }
    else
    callBack(405,{message:"Not Allowed"});
}

 app.user={};

app.user.post=(reqProper,callBack)=>
{
    const m=reqProper.body;
  const firstName=typeof(m.firstName)==='string'&&m.firstName.trim().length()>0? m.firstName : false;
  const lastName=typeof(m.firstName)==='string'&&m.firstName.trim().length()>0? m.firstName : false;
  const phone=typeof(m.firstName)==='string'&&m.firstName.trim().length()==11? m.firstName : false;
  const password=typeof(m.firstName)==='string'&&m.firstName.trim().length()>0? m.firstName : false;

  
}
app.user.get=(reqProper,callBack)=>
{
    callBack(200,{message:"All Right"});
}
app.user.put=(reqProper,callBack)=>
{

}
app.user.delete=(reqProper,callBack)=>
{

}
module.exports=app;