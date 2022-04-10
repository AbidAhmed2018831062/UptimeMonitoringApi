const {sampleHandler}=require("./handler/sampleHandler");
const { userHandler } = require("./handler/userHandler");


const app={};

app.routes={
    sample:sampleHandler,
    user:userHandler
}

module.exports=app;