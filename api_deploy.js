var request = require('request'),
    express = require('express'),
    app = express(),
    cons = require('consolidate');

app.engine('html', cons.swig) ;
app.set('view engine','html') ;
app.set('views', __dirname + '/views');
app.use(express.bodyParser());

var COMPILE_URL = "http://api.hackerearth.com/code/compile/",
    RUN_URL = "http://api.hackerearth.com/code/run/",
    CLIENT_SECRET = "5d9059f7ba36c31d73100c6d063ebb680c1cec46";

app.get('/',function(req, res){
    res.render('index');
});

app.post('/submit_code', function(req, res){

    var source_code = req.body.source_code ;
    var code_input = req.body.code_input ;

    console.log(source_code);

    request.post({  url : COMPILE_URL,
                    form : {
                                'client_secret': CLIENT_SECRET,
                                'async': 0,
                                'source': source_code,
                                'lang': "CPP",
                                'time_limit': 5,
                                'memory_limit': 262144,
                                'input' : code_input
                            }
    }, function (err, httpResponse, responseBody) {
        if(err) console.log(err.message);
        else {
            for(var part of responseBody){
                console.log(part);
            }
            //code to display the status of compilation
        }
    }) ;
})

app.listen(3000) ;
console.log("Express Server running at localhost:3000\n") ;
