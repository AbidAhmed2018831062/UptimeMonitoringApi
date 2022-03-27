
const url=require("url");
const { StringDecoder } = require('string_decoder');
const {routes}=require("G:/NodeProjects/UptimeMonitoringApi/routes/index");
const {nonHandler}=require("G:/NodeProjects/UptimeMonitoringApi/routes/handler/nonHandler");
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

    let data="";

    req.on("data",(buffer)=>{
     data+=ds.write(buffer);
    });
    req.on("end", ()=>{
  data+=ds.end();
  console.log(data);
 res.end("That is it for today");
    });

    const chosenHandler = routes[mainPath] ? routes[mainPath] : nonHandler;
    

    chosenHandler(reqProper,(statusCode,payLoad)=>{
      if(typeof(statusCode)!="number")
      statuescode=500
      if(typeof(payLoad)!="object")
      payLoad={};

      res.writeHead(statusCode);
      res.end(JSON.stringify(payLoad));
    })




    res.end("Hello this is my first node js project");
};


module.exports=app;