
const url=require("url");
const { StringDecoder } = require('string_decoder');
const {routes}=require("G:/NodeProjects/UptimeMonitoringApi/routes/index");
const {nonHandler}=require("G:/NodeProjects/UptimeMonitoringApi/routes/handler/nonHandler");
const {jsonString}=require("G:/NodeProjects/UptimeMonitoringApi/helpers/uti.js");
app={};
app.handleRe=(req,res)=>{
    const ds=new StringDecoder('utf-8');
    const parse=url.parse(req.url,true);//true is denoting the parametres
    const path=parse.pathname;
    const mainPath=path.replace(/^\/+|\/+$/g, '');

    const query=parse.query;

    const head=req.headers;

    const method=req.method.toLowerCase();

    const reqProper={
      parse,
      path,

      mainPath,
      query,
      head,
      method
    }
    const chosenHandler = routes[mainPath] ? routes[mainPath] : nonHandler;
    let data="";

    req.on("data",(buffer)=>{
     data+=ds.write(buffer);
    });
    req.on("end", ()=>{
  data+=ds.end();
  //console.log(data);
  reqProper.body=jsonString(data);
  chosenHandler(reqProper,(statusCode,payLoad)=>{
    if(typeof(statusCode)!="number")
    statuescode=500
    if(typeof(payLoad)!="object")
    payLoad={};
    res.setHeader("Content-Type","application/json");
    res.writeHead(statusCode);
    try{
    res.end(JSON.stringify(payLoad));
    }
    catch{

    }
  });
 //res.end("That is it for today");
    });

    
   //  res.end("Hello this is my first node js project");
};


module.exports=app;