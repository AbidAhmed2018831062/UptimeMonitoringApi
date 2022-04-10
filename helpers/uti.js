const crypto=require("crypto");

const uti={};

uti.jsonString=(str)=>{
    let out={};

    try{
        out=JSON.parse(str);
        //console.log(str);
    }
    catch{

    }

    return out;
}

uti.hash=(str)=>{
    
    const hash = crypto.createHmac('sha256', 'a secret');

    hash.update(str);
    console.log(hash);
    return hash;
}

module.exports=uti;