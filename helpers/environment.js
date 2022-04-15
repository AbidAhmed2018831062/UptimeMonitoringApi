const environment={};

environment.staging={
    port:3000,
    statu:"staging",
    max:5
};
environment.production={
    port:5000,
    statu:"production",
    max:5
};

const envri=typeof(process.env.NODE_ENV)==="string"? process.env.NODE_ENV: "staging";

const en=typeof(environment[envri])==="object"? environment[envri]: {};
module.exports=en;