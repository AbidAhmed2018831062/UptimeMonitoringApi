
const files=require('G:/NodeProjects/UptimeMonitoringApi/lib/data');
const {hash, jsonString,randomString}=require("G:/NodeProjects/UptimeMonitoringApi/helpers/uti.js");

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
  
  const phone=typeof(m.phone)==='string'&&m.phone.trim().length==11? m.phone : false;
  const password=typeof(m.password)==='string'&&m.password.trim().length>0? m.password : false;

  if(phone&&password)
  {
     // console.log("Hello it is done");
      files.read("token",phone,(err,data)=>{
          if(!err&&data)
          {
              if(jsonString(data).password===hash(password)){
            const tokenId=randomString(11);
            const expires=Date.now()+60*60*1000;


              files.create("token",tokenId,{
                  phone,
                  tokenId,
                  expires,
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
                    phone,
                    tokenId,
                    expires,
                })
              })
            }
            else{
                callBack(400,{
                    error:"USer Already exists"
                })
            }

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
    const phone=typeof(reqProper.query.phone)==='string'&&reqProper.query.phone.length==11? reqProper.query.phone: false;
console.log(phone);
    if(phone)
    {
        files.read("test", phone,(err,user)=>{
            if(!err){
                const u=jsonString(user);
            callBack(200,{
                firstName:u.firstName,
                lastName:u.lastName,
                phone:u.phone
            })
        }
        else
        {
            callBack(200,{erro:"User does not exist"});
        }
        })
    }
    else
    callBack(200,{erro:"User does not exist"});
}
app.user.put=(reqProper,callBack)=>
{
    const m=reqProper.body;
    const firstName=typeof(m.firstName)==='string'&&m.firstName.trim().length>0? m.firstName : false;
    const lastName=typeof(m.lastName)==='string'&&m.lastName.trim().length>0? m.lastName : false;
    const phone=typeof(m.phone)==='string'&&m.phone.trim().length==11? m.phone : false;
    const password=typeof(m.password)==='string'&&m.password.trim().length>0? m.password : false;
     console.log(phone);
    if(phone)
    {
        files.read("test",phone,(err,userData)=>
        {
            if(!err)
            {
                console.log(userData);
                const u=jsonString(userData);
                if(firstName)
                {
                    u.firstName=firstName;
                }
                if(lastName)
                {
                    u.lastName=lastName;
                }
                if(password)
                {
                    u.password=password
                }
           files.update("test",phone,u,(err)=>{
               if(!err)
               {
                   callBack(200,{
                       message:"Updated Successfully"
                   })
               }else
               callBack(400,{
                error:"Invalid phone"
            })
           })
            }
            else
            callBack(400,{
                error:"Invalid phone number"
            })
        })
    }
    else
    callBack(400,{
        error:"Invalid phone number"
    })
  
}
app.user.delete=(reqProper,callBack)=>
{
    const m=reqProper.body;
    const phone=typeof(m.phone)==='string'&&m.phone.trim().length==11? m.phone : false;

    if(phone)
    {
        files.read("test",phone,(err,data)=>{
            if(!err&&data)
            {
              files.delete("test",phone,(err)=>{
                  if(!err)
                  {
                      callBack(200,{
                          message:"Deleted Successfully"
                      })
                  }
                  else
                  {
                    
                    callBack(500,{message:"Failed1"})
                
                  }
              })
            }
            else
            callBack(500,{message:"Failed"})
        
        })
    }
    else
    callBack(400,{error:"There was an error"});

}
module.exports=app;