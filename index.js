const http=require("http");
const lib=require("./lib/data");
const {handleRe}=require("./helpers/helpers");
const en=require("./helpers/environment");

const app={};

/*lib.create("test","firstFile",{name:"Abid Ahmed",Uni:"Sust"},(err)=>{
    console.log(err);
});*/
/*lib.read("test","firstFile",(err)=>{
    console.log(err);
});*/
/*lib.update("test","firstFile",{name:"Shakib Ahmed",Uni:"Sust"},(err)=>{
    console.log(err);*/
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