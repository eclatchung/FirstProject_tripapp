var mongoose= require('mongoose')
const Money = require('../models/moneySchema')


var addMoneyDB = (req,res,next) =>{

  const {id,date,twd,m_description}=req.body
  var won = twd*40;

  const p = function(id,date,twd,m_description,won){
     return new Promise(
    (resolve, reject)=>{
      Money.find({id:id,m_date:date},(err,rawMoney)=>{
        if(err) Money.create(id,date,twd,won);
        else{
          rawMoney.moneys.push({m_description:contents,m_twd:twd,m_won:won});
          rawMoney.save((err,res)=>{
            if(err)throw err })
        }});(err,res)=>{
          if(err) reject(err)
          resolve(res)
        }
    }
  )}
  const onError = (error) => {
      res.status(403).json({
          success: false,
          message: error.message
      })
  }

p.then((res)=>{
  if(!res) res.json({message:"err"})
  next()
}).catch(onError)




};
module.exports=addMoneyDB;
