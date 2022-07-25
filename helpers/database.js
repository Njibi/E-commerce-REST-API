const mongoose = require('mongoose')

exports.connect = () =>{
mongoose
  .connect(
     process.env.MONGO_URL,
    )
 .then(()=>{
   console.log("database connected....")
  })
 .catch((error)=>{
  console.log("failed to touch database, exit now.....") ;
  console.error(error) ;
  process.exit(1)
 })
}