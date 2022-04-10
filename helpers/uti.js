const uti={};

uti.jsonString=(str)=>{
    let out={};

    try{
        out=JSON.parse(str);
    }
    catch{

    }

    return out;
}


module.exports=uti;