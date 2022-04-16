const http=require("http");
const lib=require("./lib/data");
const {handleRe}=require("./helpers/helpers");
const en=require("./helpers/environment");
const notification=require("G:/NodeProjects/UptimeMonitoringApi/helpers/notification.js");
const app={};

notification.msg("Hello, I am Abid",'01308376904',(err)=>{
    console.log(err);
});

app.createServer=()=>{
    const ser=http.createServer(app.handleServer);
     console.log(`listening to ${en.port}`);
     try{
    ser.listen(en.port);
     }
     catch{
         
     }
}

app.handleServer=handleRe;

app.createServer();