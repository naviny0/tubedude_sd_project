const express = require('express'); 
const app = express();              
const port = 3000;                 

app.get('/', (req, res) => {
  res.send('api is healthy');
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

const RATE_LIMIT = 5;
const WINDOW_MS = 60 * 1000;

const requests = {}

app.get('/data', (req, res) => {
  const userId = req.query.userId || req.ip
  const now = Date.now();

  if(!requests[userId]){
    requests[userId]=[]
  }

 requests[userId] = requests[userId].filter(
  (timestamp)=> now - timestamp < WINDOW_MS
 )

 if(requests[userId].length >= RATE_LIMIT){
  return res.status(429).json({message:"Too many Requests: Try again  later."})
 }
 requests[userId].push(now)

 return res.status(200).json(
  {message: "Data fetch successfully. ",
    userId,
    requestInLastMinute:requests[userId].length
  }
 )
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
