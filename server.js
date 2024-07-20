const cors=require('cors')
const express=require('express')
const app=express()
app.use(express.json())
app.use(cors())
const PORT=8081

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}...`)
})


//connection to mongodb
const mongoose=require('mongoose')
const DB='mongodb+srv://apekshanaik:Naik%409483@cluster0.eymdfbj.mongodb.net/'
mongoose.connect(DB,{
    useNewUrlParser:true,
    
}).then(() =>{
    console.log('Database connected..')
})

const Hotel=require('./HotelBook.js')
app.post('/add-hotel',async(req,res)=>{
    const hotelBook=new Hotel(req.body)
    try{
        await hotelBook.save()
        res.status(201).json({
            status:'Success',
            headers: {
                'Authorization': '',
                'Content-Type': '',
              },
            data:{
                hotelBook
            }
        })
    }catch(err){
        res.status(500).json({
            status: 'Failed',
            message: err
        })
    }
})
app.get('/get-hotel',async(req,res)=>{
    const hotelBook=await Hotel.find({})
    try{
        res.status(200).json({
            status:'Sucess',
            data:{
                hotelBook
            }
        })
    }catch(err){
        res.status(500).json({
            status: 'Failed',
            message: err
        })
    }
})