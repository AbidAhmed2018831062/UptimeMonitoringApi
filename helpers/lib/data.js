const fs=require("fs");
const path=require("path");

const lib={};

lib.basedir=path.join(__dirname,"/../data/");

lib.create=(dir,fileName,data,callback)=>{
    fs.open(`${lib.basedir+dir}/${file}/'.json`,"wx",(err,fileDes)=>{
        if(!err&&fileDes)
        {

const data1=JSON.stringify(data);
            fs.writeFile(fileDes,data1,(err1,fileDes)=>{
             if(!err1)
             {
                 fs.close(fileDes,(err2)=>{
                   if(!err2)
                   {
                       callback("false");
                   }
                   else callback("Some Error Occured!!");

                 })
             }
             else
             {
                callback("Some Error Occured!!");
             }
            })
        }
        else{
            callback("Some Error Occured!!");
        }
    })
}

module.export=lib;