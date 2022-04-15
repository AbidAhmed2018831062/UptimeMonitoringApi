
const files=require('G:/NodeProjects/UptimeMonitoringApi/lib/data');
const {hash, jsonString, randomString}=require("G:/NodeProjects/UptimeMonitoringApi/helpers/uti.js");
const app1=require("G:/NodeProjects/UptimeMonitoringApi/routes/handler/tokenhandler");
const { default: time } = require('cucumber/lib/time');
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
    const id1=typeof(reqProper.query.id)==='string'&&reqProper.query.id.length==11? reqProper.query.id: false;


console.log(id1);
    if(id1)
    {

        files.read("check",id1,(err,udata)=>{
        if(!err&&udata)
        {
            let phone=jsonString(udata).phone;
            const token=typeof(reqProper.head.id)==='string'&&reqProper.head.id.length==11? reqProper.head.id: false;

            files.read("token",token,(err,udata1)=>{
                if(!err&&udata1){
                    app1.token.verify(token,phone,(err)=>
                    {
                        if(!err)
                        {
                           callBack(200,jsonString(udata));
                        }
                        else
                        callBack(405,{error:"You are not authenticated"});
                    })
                }
            })
        }
        else
        callBack(400,{erro:"There was an error"});
        })
    }
    else
    callBack(200,{erro:"User does not exist"});
}
app.check.put=(reqProper,callBack)=>
{
    const m=reqProper.body;
    const protocol=typeof(m.protocol)==='string'&&['http','https'].indexOf(m.protocol)>-1? m.protocol : false;
    const url=typeof(m.url)==='string'&&m.url.trim().length>0? m.url : false;
    const method=typeof(m.method)==='string'&&['get','post','put','delete'].indexOf(m.method)>-1? m.method : false;
    const successcodes=typeof(m.successcodes)==='object'&&m.successcodes instanceof Array? m.successcodes : false;
    const id=typeof(m.id)==='string'&&m.id.trim().length>0? m.id : false;
    const timeout=typeof(m.timeout)==='number'&&m.timeout>0&&m.timeout<=5&&m.timeout%1==0? m.timeout : false;
  console.log(protocol+""+url+""+timeout+""+successcodes);
    if(protocol||url||timeout||successcodes||method)
    {
        files.read("check",id,(err,udata)=>{
            if(!err&&udata)
            {
                let phone=jsonString(udata).phone;
                const token=typeof(reqProper.head.id)==='string'&&reqProper.head.id.length==11? reqProper.head.id: false;
                app1.token.verify(token,phone,(err)=>{
                    if(!err)
                    {
                        let u=jsonString(udata)
                        if(protocol)
                        {
                            u.protocol=protocol;
                        }
                        if(successcodes)
                        {
                            u.successcodes=successcodes;
                        }
                        if(url)
                        {
                            u.url=url;
                        }
                        if(method)
                        {
                            u.method=method;
                        }
                        if(timeout)
                        u.method=method;
                        files.update("check",id,u,(err)=>{
                            if(!err)
                            {
                                callBack(200,{message:"Successfully Updated"})
                            }
                            else
                            callBack(405,{error:"There was an error"})
                        })
                    }
                })
            }
        })
    }
    else
    callBack(400,{error:"There was a problem in your request"})
}
app.check.delete=(reqProper,callBack)=>
{
     const id1=typeof(reqProper.query.id)==='string'&&reqProper.query.id.length==11? reqProper.query.id: false;


console.log(id1);
    if(id1)
    {

        files.read("check",id1,(err,udata)=>{
        if(!err&&udata)
        {
            let phone=jsonString(udata).phone;
            const token=typeof(reqProper.head.id)==='string'&&reqProper.head.id.length==11? reqProper.head.id: false;

            files.read("token",token,(err,udata1)=>{
                if(!err&&udata1){
                    app1.token.verify(token,phone,(err)=>
                    {
                        if(!err)
                        {
                          files.delete("check",id1,(err)=>{
                           if(!err)
                           {
                               files.read("test",phone,(err,udata2)=>{
                                   if(!err&&udata2){
                                       let d=jsonString(udata2);
                                       let ch=typeof(d.checks) ==="object"&&d.checks instanceof Array?d.checks:[];
                                       let index=ch.indexOf(id1);
                                       if(index>-1)
                                       {
                                           ch.splice(index,1);
                                           d.checks=ch;
                                           files.update("test",phone,d,(err)=>{
                                               if(!err)
                                               {
                                                   callBack(200,{message:"Successfully deleted"});
                                               }
                                               else
                                               callBack(405,{error:"there was an error!"});
                                           })
                                       }
                                       else
                                       {
                                           callBack(405,{error:"there was an error!"});
                                       }
                                   }
                               })
                           }
                          })
                        }
                        else
                        callBack(405,{error:"You are not authenticated"});
                    })
                }
            })
        }
        else
        callBack(400,{erro:"There was an error"});
        })
    }
    else
    callBack(200,{erro:"User does not exist"});

}
module.exports=app;