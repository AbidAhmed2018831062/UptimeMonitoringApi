const fs=require("fs");
const path=require("path");

const lib={};

lib.basedir=path.join(__dirname,"/../.data/");

lib.create=(dir,fileName,data,callback)=>{
    fs.open(`${lib.basedir+dir}/${fileName}.json`,"wx",(err,fileDes)=>{
        console.log(JSON.stringify(data))
        if(!err&&fileDes)
        {

const data1=JSON.stringify(data);
const fileDes1=fileDes;
            fs.writeFile(fileDes,data1,(err1,fileDes)=>{
             if(!err1&&fileDes)
             {
                 try{
                 fs.close(fileDes,(err2)=>{
                   if(!err2)
                   {
                       console.log(data1);
                       callback(true);
                   }
                   else callback(err2.message);

                 })
                }
                catch (exception){
                    console.log(exception.message)
                }
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

lib.read=(dir,fileName,callback)=>{
    fs.readFile(`${lib.basedir+dir}/${fileName}.json`,"utf-8",(err,data)=>{
        if(!err){
        console.log("Abid Ahmed");
        callback(false,data);
    }
        else
        callback(true);
    })
}

lib.update=(dir,fileName,data, callback)=>{
    fs.open(`${lib.basedir+dir}/${fileName}.json`,"r+",(err,fileDes)=>{
            if(!err&&fileDes)
            {
                fs.ftruncate(fileDes,(err2)=>
                {
                    if(!err2&&fileDes)
                    {
                        const data1=JSON.stringify(data);
                     fs.write(fileDes,data1,(err3)=>{
                         if(!err3){
                         fs.close(fileDes,(err4)=>{
                            if(!err4)
                            callback(false);
                            else
                            callback(err4);
                         })
                     }
                     else
                     callback(err3)
                    })
                    }
                    else
                    callback(err2);
                })
            }
            else
            callback(err);

    });
}


lib.delete=(dir,fileName,callback)=>{
    fs.unlink(`${lib.basedir+dir}/${fileName}.json`,(err)=>{
        if(!err){
        console.log("Abid Ahmed");
        callback(false);
    }
        else
        callback(err);
    })
}

module.exports=lib;