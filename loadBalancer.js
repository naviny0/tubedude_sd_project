const express = require('express'); 
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();              
const port = 3000;                 

const server = [
  "http://localhost:3001",
  "http://localhost:3002",
  "http://localhost:3003",
]
let currentServer = 0;

app.use('/',(req,res,next)=>{
  const target = server[currentServer]
  console.log(`forwording request to Server ${currentServer +1}`)

  currentServer = (currentServer+1) % server.length

  createProxyMiddleware({
    target,
    changeOrigin:true
  })(req,res,next)
})``
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
