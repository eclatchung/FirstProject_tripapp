const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
  id:{type:String, unique:true},
  name:{type: String, 'default':''},
  password:{type :String},
  periodStart:{type: String},
  periodEnd:{type: String},
  nick_name:{type: String,'default':''},
  salt :{type : String},
  admin: { type: Boolean, default: false }
})

// create new User document
User.statics.create = function(id, password,periodStart,periodEnd,nick_name,name) {
    const user = new this({
        id,
        password,
        periodStart,
        periodEnd,
        nick_name,
        name
    })

    // return the Promise
    return user.save()
}

// find one user by using username
User.statics.findOneById = function(id) {
    return this.findOne({
        id
    }).exec()
}


// verify the password of the User documment
User.methods.verify = function(password) {
    return this.password === password
}

User.methods.assignAdmin = function() {
    this.admin = true
    return this.save()
}



module.exports = mongoose.model('User', User)
