const Money = require('../../../models/moneySchema')


/*

POST
/api/money/postdate
{
    id,
    m_date

}

*/

exports.postcreate = (req,res) =>{
  const {name} = req.body
  let newMoney = null

  const create = (money) => {
    if(money){
      throw new Error ('already exists')
    }else {
      return Money.create(name);
    }
  }
  const respone=(money)=>{
    res.json({
      name: name
    })
  }

  const onError=(err) =>{
    res.status(409).json({
      message:error.message
    })
  }


Money.findOneByIdAndTitle(name)
.then(create)
.then(respone)
.catch(onError)



}

/*

POST

/api/money/showmoney

{
  m_date,id
}

*/


exports.getshow = (req, res) => {


  var name = req.body.name || req.query.name

  let newMoney = null

  //const Check = (money) =>{

  //}


  const Respone = (money) => {

    if(!money){
        return res.json({message:'nothing'})
    }else{
    res.json(money)
    }
  }

  const onError = (error) =>{
    res.status(403).json({
    message:error.message
  })
}

  Money.findByIdAndTitlecash(name)
  .then(Respone)
  .catch(onError)


}

/*
POST
/api/money/savepost
*/
exports.uploadmoney=(req,res) => {
const {name,contents,twd}=req.body
var won = twd * 40

const Respone = (money) => {

  if(!money){
      return res.json({message:'nothing'})
  }else{
  res.json(money)
  }
}

const onError = (err) =>{
  res.status(403).json({
  message:err.message
})
}




Money.updateShow(name,twd,won,contents)
.then(Respone)
.catch(onError)

}
