const express = require('express')
const app = express()

const bodyParser = require("body-parser");
let postsArr = require("./initialData");
const port = 3000
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());


app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

let cache = {id:null,maxId:10,count:5};
// your code goes here

const clear = () => {
    cache.count = 5;
    cache.id= null;
}
app.get("/api/posts", (req,res) =>{
    let maxValue =  req.query.max === undefined?10:req.query.max;
    maxValue = maxValue>20?10:maxValue;
    if(cache.count>0){
        if(cache.id === null){
            cache.id = setTimeout(clear , 30*1000);
            cache.maxId  = maxValue;
        }
        maxValue = Math.min(cache.maxId,maxValue);
        res.send(postsArr.slice(0,maxValue));
        cache.count -= 1;
    }else{
        res.status(429).send({
            message:"Exceed Number of API Calls",
        })
    }
});




app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;
