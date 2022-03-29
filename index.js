const http=require("http");

const {handleRe}=require("./helpers/helpers");
const en=require("./helpers/environment");
const data=require("./lib/data");
const app={};


app.createServer=()=>{
    const ser=http.createServer(app.handleServer);
     console.log(`listening to ${en.port}`);
    ser.listen(en.port);
}

app.handleServer=handleRe;

app.createServer();