var mongoose = require('mongoose')
const Photo = require('../../../models/photoschema')


var addImgDB=(id,title,imgAddr,imgcontent)  => {

  Photo.find({id:id,title:title},(err,rawPhoto)=>{
    if(err) Photo.create(id,title,imgAddr,imgcontent);
    else{
      rawPhoto.photos.push({contents:imgcontent,photoAddr:imgAddr});
      rawPhoto.save((err,res) => {
      if(err)throw err;
      res.json({"message":"saved"});
  });
}
});
};

module.exports = addImgDB;
