
const files=require('G:/NodeProjects/UptimeMonitoringApi/lib/data');
const {hash}=require("G:/NodeProjects/UptimeMonitoringApi/helpers/uti.js");

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
  const firstName=typeof(m.firstName)==='string'&&m.firstName.trim().length>0? m.firstName : false;
  const lastName=typeof(m.lastName)==='string'&&m.lastName.trim().length>0? m.lastName : false;
  const phone=typeof(m.phone)==='string'&&m.phone.trim().length==11? m.phone : false;
  const password=typeof(m.password)==='string'&&m.password.trim().length>0? m.password : false;

  if(firstName&&lastName&&phone&&password)
  {
      console.log("Hello it is done");
      files.read("test",phone,(err)=>{
          if(err)
          {
              files.create("test",phone,{
                  firstName,
                  lastName,
                  phone,
                  password
              },(err1)=>
              {
                  if(err1)
                  {
                      callBack(400,{
                          error:"Some error happened"
                      })
                  }
                  else
                  callBack(200,{
                    error:"User created successfully"
                })
              })
          }
          else
          {
              console.log("HEllo");
              callBack(400,{
                  error:"USer Already exists"
              })
          }
      })
  }
  else
  {

  }
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