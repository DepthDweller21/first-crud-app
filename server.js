const express=require('express')
const parser=require('body-parser')
const app=express()
const PORT=9001

app.use(parser.urlencoded({extended:true}))

app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html')
})

app.post('/quotes', (req, res) => {
    console.log(req.body)
})

app.listen(PORT,function(){
    console.log(`server is live Mr.Duck on port: ${PORT}, please visit the project on localhost:${PORT}`)
})


