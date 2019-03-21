
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Img = new Schema({
  id:{type:String},
  title: {type: String, trim: true, 'default':''},		// 글 제목
  photos: [{
    contents: {type: String, trim:true, 'default': ''},
    photoAddr: {type: String },
  }]
})

// create new User document
Img.statics.create = function(title) {
    const img = new Img();
    img.title=title
    // return the Promise
    return img.save()
}
/*
// find one user by using username
Img.statics.findOneById = function(id) {
    return this.findOne({
        id
    }).exec()
}
*/
Img.statics.findOneByIdAndTitle= function(date) {
  return this.findOne({title:date})
  .exec()
}
Img.statics.findByIdAndTitlephoto= function(date){
  return this.findOne({title:date})
  .select('-_id photos.contents photos.photoAddr')
  .exec()
}
Img.statics.updateShow = function(title,content,add){
    this.update({title:title},
    {$put:{photos:{content:content,photoAddr:add}}}
  )
  return  this.findOne({title:title})
  .select('-_id photos.contents photos.photoAddr')
  .exec()
}

// verify the password of the User documment



module.exports = mongoose.model('Img', Img)
