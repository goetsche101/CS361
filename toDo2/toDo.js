var express = require('express')

var app = express()
var handlebars = require('express-handlebars').create({defaultLayout:'main'})
var session = require('express-session')
var bodyParser = require('body-parser')
var request = require('request')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({secret:'SuperSecretPassword'}));


app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3031);

app.get('/',function(req,res,next){
  var context = {};
  //If there is no session, go to the main page.
  if(!req.session.name){
    res.render('newSession', context);
    return;
  }/*end if */
  request('http://flip3.engr.oregonstate.edu:11285/?url=https://en.wikipedia.org/wiki/Blackjack&header=History', function(err, response, body){
    if(!err && response.statusCode < 400){
      context.owm = body;
      res.render('toDo',context);
    } else {
      if(response){
        console.log(response.statusCode);
      }
      next(err);
    }/*end else*/
  }) /* end request() */
  console.log(context.owm)
  context.name = req.session.name;
  context.toDoCount = req.session.toDo.length || 0;
  context.toDo = req.session.toDo || [];
  /*res.render('toDo',context);*/

});/* End app.get() */

app.post('/',function(req,res){
  var context = {};

  if(req.body['New List']){
    req.session.name = req.body.name;
    req.session.toDo = [];
    req.session.curId = 0;
  }

  //If there is no session, go to the main page.
  if(!req.session.name){
    res.render('newSession', context);
    return;
  }

  if(req.body['Add Item']){
    req.session.curId++
    /*req.session.toDo.push({"id":req.session.curId});*/
    req.session.toDo.push({
        'id':req.session.curId.toString(),
        'dueDate':'',
        'description':'',
        'low':'',
        'high':''
      })
  }

  if(req.body['Save']){ /* save contents to .toDo array as objects */
    Object.values(req.session.toDo).forEach(val =>{
      if (val.id === req.body.id){ /* append each attribute with value from body*/
        val.dueDate = req.body.dueDate
        val.description = req.body.description
        if(req.body.priority === "Low"){
          val.low = 'selected'
          val.high = ''
        }else{
          val.low =''
          val.high ='selected'
        }/* end req.body.pri */
      }/* end val.id === if */
    }/* end .forEach */
    )
  }

  if(req.body['Done']){
    req.session.toDo = req.session.toDo.filter(function(e){
      return e.id != req.body.id;
    })
  }


  context.toDoCount = req.session.toDo.length;
  context.toDo = req.session.toDo;
  console.log(context.toDo);
  /*res.render('toDo',context); */
  res.redirect('/')
});

app.use(function(req,res){
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not Found');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.send('500 - Server Error');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
