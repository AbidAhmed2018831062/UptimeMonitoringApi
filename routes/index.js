const {sampleHandler}=require("./handler/sampleHandler");
const { userHandler } = require("./handler/userHandler");
const { tokenHandler } = require("./handler/tokenhandler");
const { checkHandler } = require("./handler/checkHandler");


const app={};

app.routes={
    sample:sampleHandler,
    user:userHandler,
    token: tokenHandler,
    check:checkHandler
}

module.exports=app;