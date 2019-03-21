
const express = require('express')
const bodyParser = require('body-parser')

//const config = require('./config/config')
//config *for security*
const port = process.env.PORT || 3000
const host = 'localhost' //host ipv6
//mongoose.Promise = global.Promise;

const app = express()

// parse JSON and url-encoded query
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())



// set the secret key variable for jwt
//app.set('jwt-secret', config.secret)

// index page, just for testing
app.get('/', (req, res) => {
    res.send('JWT')
})

app.use('/api', require('./routes/api'))


// open the server
app.listen(port,() => {
    console.log(`Express is running on port ${port}`)
})


const mariadb = require('mariadb');
/*
async function asyncFunction() {
  let conn;
  try {
	conn = await pool.getConnection();
	const rows = await conn.query("SELECT 1 as val");
	console.log(rows); //[ {val: 1}, meta: ... ]
	const res = await conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
	console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }

  } catch (err) {
	throw err;
  } finally {
	if (conn) return conn.end();
  }
}*/