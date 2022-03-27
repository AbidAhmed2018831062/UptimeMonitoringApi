const http=require("http");
const app={};

app.config={
    port:3001,
};

app.createServer=()=>{
    const ser=http.createServer(app.handleServer);

    ser.listen(app.config.port);
}

app.handleServer=(req,res)=>{
    res.end("Hello this is my first node js project");
}

app.createServer();