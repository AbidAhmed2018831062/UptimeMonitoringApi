const fs=require("fs");
const path=require("path");

const lib={};

lib.basedir=path.join(__dirname,"/../.data/");

lib.create=(dir,fileName,data,callback)=>{
    fs.open(`${lib.basedir+dir}/${fileName}.json`,"wx",(err,fileDes)=>{
        if(!err&&fileDes)
        {

const data1=JSON.stringify(data);
            fs.writeFile(fileDes,data1,(err1,fileDes)=>{
             if(!err1)
             {
                 fs.close(fileDes,(err2)=>{
                   if(!err2)
                   {
                       console.log(data1);
                       callback("false");
                   }
                   else callback(err2);

                 })
             }
             else
             {
                callback(err1);
             }
            })
        }
        else{
            callback(err);
        }
    })
}

module.exports=lib;