// This file will explicitily decide what file to
// use based on the environment
//

if (process.env.NODE_ENV === 'production') {
  //return prod keys
  //module.exports=require()
} else {
  module.exports = require('./dev');
}
