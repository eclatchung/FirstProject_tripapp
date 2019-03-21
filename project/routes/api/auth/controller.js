const jwt =require('jsonwebtoken')
const User = require('../../../models/UserSchema')

/*
    POST /api/auth
    {
        username,
        password
    }
*/
exports.login = (req, res) => {
    const {id, password} = req.body
    const secret = req.app.get('jwt-secret')

    // check the user info & generate the jwt
        // check the user info & generate the jwt
    const check = (user) => {
        if(!user) {
            // user does not exist
            throw new Error('login failed')
        } else {
            // user exists, check the password
            if(user.verify(password)) {
                // create a promise that generates jwt asynchronously
                const p = new Promise((resolve, reject) => {
                    jwt.sign(
                        {
                            _id: user._id,
                            name: user.name,
                            id:user.id,
                            admin: user.admin
                        },
                        secret,
                        {
                            expiresIn: '7d',
                            issuer: 'siyun',
                            subject: 'userInfo'
                        }, (err, token) => {
                            if (err) reject(err)
                            resolve(token)
                        })
                })
                return p
            } else {
                throw new Error('login failed')
            }
        }
    }

    // respond the token
    const respond = (token) => {
        res.json({
            message: 'logged in successfully',
            token
        })
    }

    // error occured
    const onError = (error) => {
        res.status(403).json({
            message: error.message
        })
    }

    // find the user
    User.findOneById(id)
    .then(check)
    .then(respond)
    .catch(onError)

}


exports.register = (req, res) => {
    const { id, password, periodStart, periodEnd,nick_name,name } = req.body
    let newUser = null

    // create a new user if does not exist
    const create = (user) => {
        if(user) {
            throw new Error('id exists')
        } else {
            return User.create(id, password,periodStart,periodEnd,nick_name,name)
        }
    }

    // count the number of the user
    const count = (user) => {
        newUser = user
        return User.count({}).exec()
    }

    // assign admin if count is 1
    const assign = (count) => {
        if(count === 1) {
            return newUser.assignAdmin()
        } else {
            // if not, return a promise that returns false
            return Promise.resolve(false)
        }
    }

    // respond to the client
    const respond = (isAdmin) => {
        res.json({
            message: 'registered successfully',
            admin: isAdmin ? true : false
        })
    }

    // run when there is an error (username exists)
    const onError = (error) => {
        res.status(409).json({
            message: error.message
        })
    }

    // check username duplication
    User.findOneById(id)
    .then(create)
    .then(count)
    .then(assign)
    .then(respond)
    .catch(onError)
}


exports.check = (req, res) => {
    res.json({
        success: true,
        info: req.decoded
    })
}

exports.mypage=(req,res)=>{
  const{id}=req.body
  let newUser=null

  const respone = (user) => {

    if(!user){
        throw new Error('nothing')
    }else{

      const pa=new Promise((resolve, reject)=>{
        User.findOne({id},(err,user)=>{
          if (err) reject(err)
          resolve(user)
        })
    })
    return pa
    }
  }
  const Respone=(user)=>{
    res.json({
      user
    })
  }

  const onError = (error) =>{
    res.status(403).json({
    message:error.message
  })
}



  User.findOneById(id)
  .then(respone)
  .then(Respone)
  .catch(onError)

}
