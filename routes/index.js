const {sampleHandler}=require("./handler/sampleHandler")


const app={};

app.routes={
    sample:sampleHandler,
}

module.exports=app;