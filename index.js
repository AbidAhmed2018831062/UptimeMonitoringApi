const http=require("http");
const lib=require("./lib/data");
const {handleRe}=require("./helpers/helpers");
const server=require("./helpers/server");
const worker=require("./helpers/worker");
const en=require("./helpers/environment");
const notification=require("G:/NodeProjects/UptimeMonitoringApi/helpers/notification.js");
const app={};



app.createServer=()=>{
    server.init();

    worker.init();
}

app.createServer();

