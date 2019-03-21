
var Photo = require('../../../models/PhotoSchema')


exports.postphoto = (req,res) =>{
  const {title} = req.body
  let newphoto = null

  const create = (photo) => {
    if(photo){
      throw new Error ('already exists')
    }else {
      return Photo.create(title);
    }
  }
  const respone=(photo)=>{
    res.json({
      message: 'post created'
    })
  }

  const onError=(err) =>{
    res.status(409).json({
      message:error.message
    })
  }


Photo.findOneByIdAndTitle(title)
.then(create)
.then(respone)
.catch(onError)



}



exports.showphoto = (req, res) => {


  var title = req.body.title || req.query.title



  //const Check = (money) =>{

  //}


  const Respone = (photo) => {

    if(!photo){
        return res.json({message:'nothing'})
    }else{
    res.json(photo)
    }
  }

  const onError = (error) =>{
    res.status(403).json({
    message:error.message
  })
}

  Photo.findByIdAndTitlephoto(title)
  .then(Respone)
  .catch(onError)


}




exports.uploadphoto=(req,res) => {
const {title,content,photoAddr}=req.body


const Respone = (photo) => {

  if(!photo){
      return res.json({message:'nothing'})
  }else{
  res.json(photo)
  }
}

const onError = (err) =>{
  res.status(403).json({
  message:err.message
})
}




Photo.updateShow(title,contents,photoAddr)
.then(Respone)
.catch(onError)

}
