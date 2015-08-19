angular.element('.fm').on('submit',function(){
  console.log($(this).attr('class'));
  var index;
  if($(this).hasClass('form2'))
  {
    index=2;
  }
  else if($(this).hasClass('form1'))
  {
    index=1;
  }
  else
  {
    index=0;
  }
  $('#btn'+index).val('Submitting...');
  console.log('#fileDialog'+index);
  var path=$('#fileDialog'+index).val();//gather path of file input
  console.log(path);
  var fs=require('fs');
  var request=require('request');
  //console.log(path);
  var json=JSON.parse(localStorage.getItem('problemsToday'));//gather TestInput from problems of today
  var testInput=json[index].testInput;
  var testOutput=json[index].testOutput;
  var contentOfFile=fs.readFileSync(path,'utf8');
  var CLIENT_SECRET='5d9059f7ba36c31d73100c6d063ebb680c1cec46';
  var RUN_URL="http://api.hackerearth.com/code/run/";
  console.log(testInput);
  if(navigator.onLine){
          request.post({  url : RUN_URL,
                    form : {
                                'client_secret': CLIENT_SECRET,
                                'async': 0,
                                'source': contentOfFile,
                                'lang': "CPP",
                                'time_limit': 1,
                                'memory_limit': 262144,
                                'input' : testInput
                            }
    }, function (err, httpResponse, responseBody) {
        if(err) console.log(err.message);
        else {
           var json=JSON.parse(responseBody);
           if(json.compile_status!="OK")
           {
              Materialize.toast(json.compile_status,5000);//for 5 seconds
              $('#btn'+index).val('Submit');
           }
           else{
              if(json.run_status.output==" " || json.run_status.output== "")
              {
                  Materialize.toast('Wrong Answer!',5000);
                  $('#btn'+index).val('Submit');
              }
              else
              {
                var res=json.run_status.output.toString();
                console.log(res);
                testOutput=testOutput.replace(/\r\n/g,'\n').toString();//formatting
                if(res==testOutput)
                {
                  console.log("Yes");
                  Materialize.toast('Congratulations Your Answer is correct!',5000);//for 5 seconds
                  $('#btn'+index).val('Submit');
                }
                else{
                  Materialize.toast('Wrong Answer',5000);
                  $('#btn'+index).val('Submit');
                  console.log("no");
                }
              }
           } 
            console.log(JSON.parse(responseBody));
        }
    });
  }
  else
  {
    Materialize.toast('Please Connect to internet to avail this!',5000);
    $('#btn'+index).val('Submit');
  }
});