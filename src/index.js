const { app } = require('./app')
const { PORT  } = require('./config')

app.listen( PORT )
console.log(`APP RUNNING ON PORT ${ PORT }`)