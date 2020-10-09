const express = require('express');
const app = express();
const superagent = require('superagent');
var request = require('request');
var port = 5600;

app.get('/',(req,res) => {
    res.send('<a href="https://github.com/login/oauth/authorize?client_id=9e74b4020e90cc36b963">Login With Github</a>')
});


app.get('/user',(req,res) => {
    const code = req.query.code;
    superagent
    .post('https://github.com/login/oauth/access_token')
    .send({
        client_id:"9e74b4020e90cc36b963",
        client_secret:"3516131298427421fa918a186532bfa699ea00db",
        code:code
    })
    .set('Accept','application/json')
    .end((err,result) => {
        if(err) throw err;
        var accesstoken = result.body.access_token
       const option={
           url:"https://api.github.com/user",
           method:'GET',
           headers:{
               'Accept':'application/json',
               'Authorization':'token '+accesstoken,
               'User-Agent':'my-edureka'
           }
       }
       var out;
       request(option,(err,response,body) => {
           out=body;
           return res.send(out)
       })
    })

})

app.listen(port,() => {
    console.log("Running")
}) 