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
    
    const hash = crypto.createHmac('sha256', 'a secret').update(str).digest("hex");
    console.log(hash);
    return hash;
}
uti.randomString=(lentgh)=>{
let l=lentgh;

let ran='abcdefghijklmnopqrstuvwxyz123456789';

let out="";

for(let i=0;i<l;i++)
{
    out+=ran.charAt(Math.floor(Math.random()*ran.length));
}
return out;
}

module.exports=uti;