const http=require("http");
const https=require("https");
const url=require("url");
const files=require('G:/NodeProjects/UptimeMonitoringApi/lib/data');
const {handleRe}=require("G:/NodeProjects/UptimeMonitoringApi/helpers/helpers");
const en=require("G:/NodeProjects/UptimeMonitoringApi/helpers/environment");
const notification=require("G:/NodeProjects/UptimeMonitoringApi/helpers/notification.js");
const {hash, jsonString,randomString}=require("G:/NodeProjects/UptimeMonitoringApi/helpers/uti.js");
const { parse } = require("path");
const worker={};
worker.validateData=data=>{
    let outcome=false;

    let out={
        error:false,
        code:000
    }
    const d=jsonString(data);
    let state=typeof(d.state)==="string"&&d.state.length>0?d.state:"down";
    let time=typeof(d.timeout)==="number"&&d.time>0?d.timeout:true;
    d.state=state;
    d.timeout=time;
   // console.log(state+' '+time);
    if(state&&time)
    {
        const parsedUrl=url.parse(`${d.protocol}://${d.url}`,true);
        const host=parsedUrl.hostname;
        const path=parsedUrl.path;

        const request={
            hostname:host,
            protocol: d.protocol+":",
            path:path,
            method:d.method.toUpperCase(),
            timeout:d.timeout*1000,
        }
        const what=typeof(d.protocol)==="string"&&d.protol==='http'?http:https;
        const req=what.request(request,(res)=>{
            const code1=res.statusCode;

            out.code=this.code1;
           // console.log(Hello+""+code1);

            if(!outcome)
            {
                worker.process(d,out);
                outcome=true;
            }
        });

        req.on("error",(err)=>{
            if(!outcome)
            {
               // console.log(err);
                out.error=true;
                worker.process(d,out)
                outcome=true;

            }
        });
        req.on("timeout",()=>{
            if(!outcome)
            {
              //  console.log("timeout")
                out.error=true;
                out.timeout=true
                worker.process(d,out)
                outcome=true;

            }
        });
    }

}
worker.process=(d,whatTo)=>{
    let do1=!whatTo.error&&d.successcodes.indexOf(whatTo.code)>-1&&!whatTo.timeout?'up':'down';
let al=d.state===do1?false:true;
d.state=do1;
d.timeout=Date.now();

files.update("check",d.checkId,d,(err)=>{
    if(!err)
    {
        if(al)
        {
            d.state=do1;
            notification.msg(`Hey,Your requested method: ${d.method} for url:${d.protocol}://${d.url} state changeds`,d.phone,(e)=>{
                console.log(e);
            });
            console.log("State changed")
        }
        else
        console.log("There was no state change!!");
    }
    else
    console.log("There was an error");
})
}
worker.gatherAllCheck=()=>{
files.list("check",(err,realFile)=>{
    
if(!err)
{
    //console.log(err+""+realFile.length);
   realFile.forEach(fileName => {
       files.read("check",fileName,(err,data)=>{
           if(!err&&data)
           {
              worker.validateData(data);
           }
           else
           console.log("Ho gaya galti");
       })
   });
}
else
console.log("There is no check to make")
});

}
worker.loop=()=>{
    setInterval(()=>{
        worker.gatherAllCheck();
    },10000)
}

worker.init=()=>{
   
    worker.gatherAllCheck();
   worker.loop();
}


module.exports=worker;