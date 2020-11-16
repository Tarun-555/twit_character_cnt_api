const express = require("express");
const bodyParser = require("body-parser");
const Twit = require("twit");
require("dotenv").config();

const app = express();

app.use(bodyParser.json());

const T = new Twit({
    consumer_key:`${process.env.CONSUMER_KEY}`,
    consumer_secret:`${process.env.CONSUMER_SECRET}`,
    access_token:`${process.env.ACCESS_TOKEN}`,
    access_token_secret:`${process.env.ACCESS_TOKEN_SECRET}`
});


  app.get('/search',(req,res)=>{
    //  console.log(req.body);
    let tweets = new Promise((resolve,reject)=>{T.get('search/tweets', { q: `${req.body}`, count: 10 },(err, data, response)=>{
        //console.log(data);
        if(err) reject(err);
        resolve(data);
       })
      });

      tweets.then((resp)=>{
         // console.log(resp);
         let restxts = resp.statuses;
        // console.log(restxts);
          let textArr = [];

          for(let i=0;i<restxts.length;i++){
              textArr.push(i+1+"."+restxts[i].text)
          }
          return res.json(textArr);
      }).catch();

     })

app.listen(process.env.PORT,()=>{
    console.log(`server running at ${process.env.PORT}`);
})