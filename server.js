const express=require('express')
const parser=require('body-parser')
const mongoClient=require('mongodb').MongoClient
const app=express()
const connectionString = "mongodb+srv://DepthDweller21:P0YvljIktS2BbbVN@new-crud-app.ebjwiea.mongodb.net/"
const PORT=8000

// not sure what this is but I need it to do something related to json, parsing, urls and APIs, will find out soon enough

app.use(parser.urlencoded({extended:true}))

// this line of code uses express to launch the site on localhost PORT as shown in the variable section

app.listen(PORT,function(){
    console.log(`server is live Mr.Duck on port: ${PORT}, please visit the project on localhost:${PORT}`)
})

//connecting to database
async function runDatabase(){
    try{
        const client= await mongoClient.connect(connectionString)
        console.log('Connected to Database Mr.Duck')
        const db =client.db('crud-app')
        quotesCollection=db.collection('quotes')
    }catch(err){
        console.error(err)
    }
}
runDatabase()

// all this till now was the application initialisation


//here I listen for get requests for any files I might need to send from the server to the client

app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html')
})

//this line of code listens on path /quotes which the HTML responds on

app.post('/quotes', async (req, res) => {
    try{
        const result = await quotesCollection.insertOne(req.body)
        res.redirect('/')
    }catch(err){
        console.error(err)
    }

})






//P0YvljIktS2BbbVN