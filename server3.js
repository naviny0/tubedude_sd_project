const express = require('express'); 
const app = express();              
const port = 3003;                 

app.get('/', (req, res) => {
  res.send('hello from server 3');
});

app.listen(port,()=>{
    console.log(`server is 3 running on ${port}`)
})