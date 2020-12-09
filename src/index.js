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


// your code goes here

let post = postsArr.length;

app.get("/api/posts", (req,res) =>{
    const maxValue =  req.query.max;
    console.log(maxValue);
    if(maxValue == 15){
        const value = postsArr.slice(0,maxValue);
        res.send(value);
        
    }else{
        const value = postsArr.slice(0,10);
        res.send(value);
    }

    
});




app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;
