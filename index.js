const express = require ('express') ;
const app = express() ;
const mongoose = require('mongoose') ;
const dotenv = require('dotenv')
dotenv.config();
const userRoute = require('./routes/user') ;
const authRoute = require('./routes/auth') ;
const cryptoJS = require('crypto-js')
const productRoute = require('./routes/Product') ;
const cartRoute = require('./routes/cart') ;
const orderRoute = require('./routes/Order') ;
require('./helpers/database').connect();


// mongoose.connect(
//       process.env.MONGO_URL
//     )
//      .then(()=>{
//             console.log(`sucessfully connected to database`)
//          })
//            .catch((error)=> {console.log(error)
// })

app.use(express.json()) ;
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/carts', cartRoute);
app.use('/api/orders', orderRoute);

app.listen(8080, ()=>{
    console.log(`server started running`) ;
})