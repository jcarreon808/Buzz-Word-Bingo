const express = require ('express');
const app = express();
const PORT =3000;
const bodyParser = require ('body-parser');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended : true}));


let buzzWordArray = [];
let newScore = 0;

function createNewBuzzWord (buzzWord, points){
  let buzzWordTemplate = {
    buzzWord,
    points,
    heard: false
  };

  buzzWordArray.push(buzzWordTemplate);

}

function doesItExist(word){
  console.log('array',buzzWordArray);
  console.log('word passed through',word);
  return buzzWordArray.some((element)=>{
    return element.buzzWord === word;
  });

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
})

.put((req,res)=>{
  if(doesItExist(req.body.buzzWord)){
    buzzWordArray = buzzWordArray.map((element)=>{
      if(element.buzzWord === req.body.buzzWord){
       element.heard = true;
       newScore += parseFloat(element.points);
      }
      return element;
    });
    res.json({'sucess':true, 'newScore':newScore});
  }else{
    res.json({'sucess':false});
  }
})

.delete((req, res)=>{
  if(doesItExist(req.body.buzzWord)){
    buzzWordArray = buzzWordArray.filter((element)=>{
      return element.buzzWord !== req.body.buzzWord;
    });
    res.json({'sucess':true});
  }else{
    res.json({'sucess':false});
  }
});

app.route('/reset')
.post((req,res)=>{
  buzzWordArray =[];
  newScore = 0;
  res.json({'succes':true});
});



const server =  app.listen(PORT, ()=> {
  console.log(`Server started on ${PORT}`);
});