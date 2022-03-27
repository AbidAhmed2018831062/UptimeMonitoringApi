const http=require("http");

const {handleRe}=require("./helpers/helpers")
const app={};

app.config={
    port:3001,
};

app.createServer=()=>{
    const ser=http.createServer(app.handleServer);

    ser.listen(app.config.port);
}

app.handleServer=handleRe;

app.createServer();