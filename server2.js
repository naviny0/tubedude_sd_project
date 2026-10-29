const express = require('express'); 
const app = express();              
const port = 3002;                 

app.get('/', (req, res) => {
  res.send('hello from server 2');
});

app.listen(port,()=>{
    console.log(`server is 2 running on ${port}`)
})