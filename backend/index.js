
const express=require("express")
const cloudinary=require("cloudinary").v2;
require('dotenv').config();
const cors=require("cors")

const app=express()
app.use(cors())
app.use(express.json())

cloudinary.config({
    cloud_name: process.env.CloudName,
    api_key: process.env.CloudKey,
    api_secret: process.env.CloudSecretKey
});

app.post("/upload",async(req,res)=>{
    console.log(req.body)
    try {
        const result = await cloudinary.uploader.upload(req.body.img, {
            folder: 'image-uploads' 
        });
        res.status(200).send({ url: result.secure_url });
    } catch (error) {
       res.send(error) 
    }
})
app.listen(process.env.Port,async()=>{
  console.log(`server is live on port ${process.env.Port}`)
})