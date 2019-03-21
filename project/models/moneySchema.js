const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Money= new Schema({
  id:{type:String},
  name: {type: String, trim: true, 'default':''},		// 글 제목
  cashs: [{
    contents: {type: String, },
    twd: {type: Number },
    won: {type: Number }
  }]//,
  //count : {type:Number,trim:true, 'default':0 }
})


Money.statics.findOneByIdAndTitle= function(date) {
  return this.findOne({name:date})
  .exec()
}


Money.statics.create = function(name) {
    const money = new this({

        name
    })

    // return the Promise
    return money.save();
}

Money.statics.findByIdAndTitlecash= function(date){
  return this.findOne({name:date})
  .select('-_id cashs.contents cashs.twd cashs.won ')
  .exec()
}

Money.statics.updateShow = function(m_date,m_twd,m_won,m_description){
    this.update({name:m_date},
    {$put:{cashs:{twd:m_twd,contents:m_description,won:m_won}}}
  )
  return  this.findOne({name:m_date})
  .select('-_id cashs.contents cashs.twd cashs.won ')
  .exec()
}



module.exports=mongoose.model('Money', Money)
