const {sampleHandler}=require("./handler/sampleHandler");
const { userHandler } = require("./handler/userHandler");
const { tokenhandler } = require("./handler/tokenhandler");


const app={};

app.routes={
    sample:sampleHandler,
    user:userHandler,
    token: tokenhandler
}

module.exports=app;