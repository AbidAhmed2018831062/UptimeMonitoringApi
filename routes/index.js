const {sampleHandler}=require("./handler/sampleHandler");
const { userHandler } = require("./handler/userHandler");
const { tokenHandler } = require("./handler/tokenhandler");


const app={};

app.routes={
    sample:sampleHandler,
    user:userHandler,
    token: tokenHandler
}

module.exports=app;