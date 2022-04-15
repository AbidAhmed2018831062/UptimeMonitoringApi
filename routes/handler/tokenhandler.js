
const files=require('G:/NodeProjects/UptimeMonitoringApi/lib/data');
const {hash, jsonString,randomString}=require("G:/NodeProjects/UptimeMonitoringApi/helpers/uti.js");

const app={};

app.tokenHandler=(reqProper,callBack)=>{

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
      files.read("test",phone,(err,udata)=>{
          if(!err&&udata)
          {
              console.log(hash(password)+" "+jsonString(udata).password)
              if(hash(password)===jsonString(udata).password){
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
                    error:"Error Happened"
                })
            }

          }
          else
          {
              console.log("HEllo");
              callBack(400,{
                  error:"User does not exist"
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
    const id=typeof(reqProper.query.id)==='string'&&reqProper.query.id.length>0? reqProper.query.id: false;
console.log(id);
    if(id)
    {
        files.read("token", id,(err,user)=>{
            if(!err){
                const u=jsonString(user);
            callBack(200,{
                ID:u.tokenId,
                Expires:u.expires,
                phone:u.phone,
            })
        }
        else
        {
            callBack(200,{error:"Id not found"});
        }
        })
    }
    else
    callBack(200,{erro:"Id not found"});
}
app.user.put=(reqProper,callBack)=>
{
    const m=reqProper.body;
    const id=typeof(m.id)==='string'&&m.id.trim().length>0? m.id : false;
    const extend=typeof(m.extend)==='string'&&m.extend.trim().length>0? m.extend : false;
    
     console.log(id+""+extend);
    if(id&&extend)
    {
        files.read("token",id,(err,userData)=>
        {
            if(!err)
            {
                console.log(userData);
                const u=jsonString(userData);
            if(u.expires>Date.now()){
                u.expires=Date.now()+3600*1000;
           files.update("token",id,u,(err)=>{
               if(err)
               {
                   callBack(200,{
                       message:"Updated Successfully"
                   })
               }else
               callBack(400,{
                error:"Invalid token"
            })
           })
           }
           else{
               
            callBack(400,{
                error:"Invalid Token or token expired"
            })
           }
            }
            else
            callBack(400,{
                error:"Invalid phone number"
            })
        })
    }
    else
    callBack(400,{
        error:"Invalid token"
    })
  
}
app.user.delete=(reqProper,callBack)=>
{
    const m=reqProper.body;
    const id=typeof(m.id)==='string'&&m.id.trim().length==11? m.id : false;

    if(id)
    {
        files.read("token",id,(err,data)=>{
            if(!err&&data)
            {
              files.delete("token",id,(err)=>{
                  if(!err)
                  {
                      callBack(200,{
                          message:"Deleted Successfully"
                      })
                  }
                  else
                  {
                    
                    callBack(500,{message:"Failed"})
                
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

app.user.verify=(id,phone,callback)=>{
    files.read("token",id,(err,udata)=>{
     if(!err&&udata)
     {
         const da=jsonString(udata);
         if(da.tokenId==id&&da.phone==phone){
            
             callback(false);
         }
         else
         callback(true)
     }
     else
     callback(true);
    })
}
module.exports=app;