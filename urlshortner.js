const express = require('express'); 
const app = express();              
const port = 3000;                 

app.get('/', (req, res) => {
  res.send('api is healthy');
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

const shortUrl ={}

function isValidUrl(string) {
  return URL.canParse(string);
}
function geneteCode(length=6){
  const char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  let code = ''
  for(let i=0;i<length;i++){
    code += char[Math.floor(Math.random() *char.length)]
  }
  return code
}

app.post('/shorten',(req,res)=>{
  const url = req.body.url

  if(!isValidUrl(url)){
   return res.json({message:"please give valid url"})
  }
  let shotcode = geneteCode()
  
  shortUrl[shotcode]=url

  return res.json({message:`Your short url is http://localhost:${port}/${shotcode}`})

})
app.get('/:shortcode',(req,res)=>{
  const shortcode = req.params.shortcode
  
 const url = shortUrl[shortcode]

  return res.redirect(url)
})
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
