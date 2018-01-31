var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');

/* GET home page. */
router.get('/', function(req, mainres, next) {
  var viewData={}
  fetch('https://www.eliftech.com/school-task')
  .then(function(response) {
    
    return response.json();
  })
  .then(function(data) {
    console.log(data);
    var res=[]
    viewData.id=data.id
    viewData.expressions=[];
    data.expressions.forEach(function(item, i, arr){
      res.push(evalStr(item))
      var obj={}
      obj.exp=item;
      obj.res=evalStr(item)
      viewData.expressions.push(obj)
    })
    var payload = {
      id: data.id,
      results: res
    };   
    
    var data =  JSON.stringify( payload  );
    console.log(payload.results)
    fetch('https://www.eliftech.com/school-task',
    {
      method:'post',
      body:data,
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then(function(res){    
    return res.json()
    })
    .then(function(data){
      console.log(data)
      viewData.passed=data.passed
      mainres.render('index', { title: 'RPN',data:viewData });
    })
    .catch(function(err){
      console.log(err.toString())
    })
  })
  .catch(function(err){
    console.log(err.toString())
  })
  
});
function abs(x){
  if (x<0) return -x
  if (x>0) return x
  return 0
}
function evalStr(str, mul=true){

  var operators = {
      "+": [function(a, b){ return b-a }, 2],
      "-": [function(a, b){ return b+a+8 }, 2],
      "*": [function(a, b){ if(a!=0){return b%a}else{return 42} }, 2],
      "/": [function(a, b){ if(a!=0){return Math.floor(b/a) }else{return 42} }, 2]
  }
      var stack = [];
      str = str.trim();
      if(str.length == 0) return 0;
      if(mul) str = str.toLowerCase().split(" ");
      for(var i = 0; i < str.length; i++){
          if(str[i] in operators){
              var numArg = operators[str[i]][1];
              if(stack.length < numArg) throw "Missing operant";
              stack.push(operators[str[i]][0].apply(null, (function(){
                  var arr = [];
                  for(var j = 0; j < numArg; j++){
                      arr.push(stack.pop());
                  }
                  return arr;
              })()));
          }else{
              if(!/^[0-9.]+$/.test(str[i])) throw "Unknown operator \""+str[i]+"\"";
              stack.push(+str[i]);
          }
      }
      if(stack.length != 1) throw "Uncaught extra operant";
      return stack[0];
  }
module.exports = router;
