const express = require ('express');
const app = express();
const PORT =3000;
const bodyParser = require ('body-parser');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended : true}));


let buzzWordArray = [];

function createNewBuzzWord (buzzWord, points){
  let buzzWordTemplate = {
    buzzWord,
    points,
    heard: false
  };

  buzzWordArray.push(buzzWordTemplate);

}

app.route('/buzzwords')
.get ((req, res)=>{
  let words = buzzWordArray.map((element)=>{
    return element.buzzWord;
  });
  res.json(words);
})
.post((req, res)=>{

  let newWord = buzzWordArray.every((element)=>{
    return  element.buzzWord !== req.body.buzzWord;
  });

  if(newWord){
    createNewBuzzWord(req.body.buzzWord, req.body.points);
    res.json({'sucess':true});
  } else {
    res.json({'sucess':false});
  }
});



const server =  app.listen(PORT, ()=> {
  console.log(`Server started on ${PORT}`);
});