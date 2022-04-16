const http=require("http");
const files=require('G:/NodeProjects/UptimeMonitoringApi/lib/data');
const {handleRe}=require("G:/NodeProjects/UptimeMonitoringApi/helpers/helpers");
const en=require("G:/NodeProjects/UptimeMonitoringApi/helpers/environment");
const notification=require("G:/NodeProjects/UptimeMonitoringApi/helpers/notification.js");
const server={};



server.createServer=()=>{
    const ser=http.createServer(server.handleServer);
     console.log(`listening to ${en.port}`);
     try{
    ser.listen(en.port);
     }
     catch{
         
     }
}

server.handleServer=handleRe;

server.init=()=>{
    server.createServer();
};

module.exports=server;