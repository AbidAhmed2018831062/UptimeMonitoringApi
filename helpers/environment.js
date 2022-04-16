const environment={};

environment.staging={
    port:3000,
    statu:"staging",
    max:5,
    twilio:{
        phone:"+18592973227",
        accountSid:"AC38d85286cca258a1ba4e18c111074d7c",
        authToken:"6db8f0129dd52fecd8b8676b2d928091"
    }
};
environment.production={
    port:5000,
    statu:"production",
    max:5,
    twilio:{
        phone:"+18592973227",
        accountSid:"AC38d85286cca258a1ba4e18c111074d7c",
        authToken:"6db8f0129dd52fecd8b8676b2d928091"
    }
};

const envri=typeof(process.env.NODE_ENV)==="string"? process.env.NODE_ENV: "staging";

const en=typeof(environment[envri])==="object"? environment[envri]: {};
module.exports=en;