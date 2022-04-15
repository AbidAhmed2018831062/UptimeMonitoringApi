
const files=require('G:/NodeProjects/UptimeMonitoringApi/lib/data');
const {hash, jsonString, randomString}=require("G:/NodeProjects/UptimeMonitoringApi/helpers/uti.js");
const app1=require("G:/NodeProjects/UptimeMonitoringApi/routes/handler/tokenhandler");
const app={};

app.checkHandler=(reqProper,callBack)=>{

    const meth=['get','post','put','delete'];
    if(meth.indexOf(reqProper.method)>-1)
    {
        app.check[reqProper.method](reqProper,callBack);
    }
    else
    callBack(405,{message:"Not Allowed"});
}

 app.check={};

app.check.post=(reqProper,callBack)=>
{
    const m=reqProper.body;
  const protocol=typeof(m.protocol)==='string'&&['http','https'].indexOf(m.protocol)>-1? m.protocol : false;
  const url=typeof(m.url)==='string'&&m.url.trim().length>0? m.url : false;
  const method=typeof(m.method)==='string'&&['get','post','put','delete'].indexOf(m.method)>-1? m.method : false;
  const successcodes=typeof(m.successcodes)==='object'&&m.successcodes instanceof Array? m.successcodes : false;

  const timeout=typeof(m.timeout)==='number'&&m.timeout>0&&m.timeout<=5&&m.timeout%1==0? m.timeout : false;
console.log(protocol+""+url+""+timeout+""+successcodes);
  if(protocol&&url&&timeout&&successcodes)
  {
    const id=typeof(reqProper.head.id)==='string'&&reqProper.head.id.length==11? reqProper.head.id: false;
files.read("token",id,(err,udata)=>{
    console.log(udata);
    if(!err&&udata)
    {
     let da1=jsonString(udata);
     phone=da1.phone;
console.log(phone);
     files.read("test",phone,(err1,udata1)=>{
         if(!err1&&udata1)
         {
             let da=jsonString(udata1);
           app1.token.verify(id,phone,(err2)=>{
               if(!err2)
               {
                   let ch=typeof(da.checks)==="object"&&da.checks instanceof Array? da.checks:[];
                   console.log(da.checks+" "+ch)
                   if(ch.length<5)
                   {
                    let checkId=randomString(11);

                    files.create("check",checkId,{
                        checkId,
                        phone,
                        timeout,
                        method,
                        successcodes,
                        url,
                        protocol
                    },(err5)=>{
                        if(!err5)
                        {
                          
                            da.checks=ch;
                         
                            da.checks.push(checkId);
                            files.update("test",phone,da,(err6)=>{
                                if(!err6)
                                {
                                    callBack(200,{message:"Successful"});
                                }
                                else
                                {
                                    callBack(400,{error:"There was an error"});
                                }
                            })
                            
                           
                        }
                        else
                        callBack(200,{error:"There was an error1"});
                    })
                   }
               }
               else
               {
                   callBack(200,{error:"There was an error2"});
               }
           })
         }
         else
         callBack(200,{error:"There was an error3"});
     })
    }
    else
    callBack(405,{error:"you are not authenticated"})
})
  }
  else
  {
    callBack(400,{error:"There is a problem in your inputs!"})
  }
}
app.check.get=(reqProper,callBack)=>
{
    const phone=typeof(reqProper.query.phone)==='string'&&reqProper.query.phone.length==11? reqProper.query.phone: false;


console.log(phone);
    if(phone)
    {

        const id=typeof(reqProper.head.id)==='string'&&reqProper.head.id.length==11? reqProper.head.id: false;

        app1.user.verify(id,phone,(err)=>{
            if(!err)
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
            callBack(405,{erro:"You are not authenticated"});
        })

       
    }
    else
    callBack(200,{erro:"User does not exist"});
}
app.check.put=(reqProper,callBack)=>
{
    const m=reqProper.body;
    const firstName=typeof(m.firstName)==='string'&&m.firstName.trim().length>0? m.firstName : false;
    const lastName=typeof(m.lastName)==='string'&&m.lastName.trim().length>0? m.lastName : false;
    const phone=typeof(m.phone)==='string'&&m.phone.trim().length==11? m.phone : false;
    const password=typeof(m.password)==='string'&&m.password.trim().length>0? m.password : false;
     console.log(phone);
    if(phone)
    {
        const id=typeof(reqProper.head.id)==='string'&&reqProper.head.id.length==11? reqProper.head.id: false;

        app1.user.verify(id,phone,(err)=>{
            if(!err)
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
            callBack(405,{erro:"You are not authenticated"});
        })

    }
    else
    callBack(400,{
        error:"Invalid phone number"
    })
  
}
app.check.delete=(reqProper,callBack)=>
{
    const m=reqProper.body;
    const phone=typeof(m.phone)==='string'&&m.phone.trim().length==11? m.phone : false;

    if(phone)
    {
        const id=typeof(reqProper.head.id)==='string'&&reqProper.head.id.length==11? reqProper.head.id: false;

        app1.user.verify(id,phone,(err)=>{
            if(!err)
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
            callBack(405,{erro:"You are not authenticated"});
        })
      
    }
    else
    callBack(400,{error:"There was an error"});

}
module.exports=app;