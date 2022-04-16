const {twilio}=require("G:/NodeProjects/UptimeMonitoringApi/helpers/environment.js");

const https=require("https");
const { type } = require("os");
const notification = require('twilio')("AC38d85286cca258a1ba4e18c111074d7c", "6db8f0129dd52fecd8b8676b2d928091");
notification.msg=(body,to,callBack)=>{
let body1=typeof(body)==='string' && body.length>5?body:false;
let to1=typeof(to)==='string' && to.length==11?to:false;
console.log(body1,to1)
    if(body1&&to1){
notification.messages
  .create({
     body: body1,
     from: '+18592973227',
     to: `+88${to1}`
       })
  .then(message => callBack("Message Delivered successfully"));
    }
    else
    callBack("There was an error in the request1")
}
module.exports=notification;