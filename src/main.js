const express = require('express');
const app = express();
const path = require('path');
const mockDataJson = require('./mockData.json');
const router = express.Router();
app.use(express.static(__dirname + '/public'));
router.get('/',function(req,res){
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.sendFile(path.join(__dirname+'/index.html'));
  //__dirname : It will resolve to your project folder.
});

router.get('/script',function(req,res){
  res.sendFile(path.join(__dirname+'/script.js'));
});

router.get('/mockData',function(req,res){
  res.json(mockDataJson);
});


app.use('/', router);
app.listen(process.env.port || 3000);

console.log('Running at Port 3000');


