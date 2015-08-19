angular.module('homePageModule',[]).controller('homePageController',function($http,$location,$scope,$rootScope)
{
	
	var today=new Date();
	var dd=today.getDate();
	var flag=0;
	if(navigator.onLine)//user is connected to net
	{
		//gather new problems if any
		$http.get('http://aqueous-bayou-9488.herokuapp.com/problems').then(function(result){
			var problems={
				document:[]
			};
			//gather all problems in specified format
			for(var index=0;index<result.data.length;index++){
					problems.document.push({
					"title":(result.data)[index].problemTitle,
					"statement":(result.data)[index].statement.replace(/\r\n/g,'<br>'),
					"testInput":(result.data)[index].testInput,
					"testOutput":(result.data)[index].testOutput,
					"date":(result.data)[index].date
				});
			}
			$rootScope.problems=[];
			//push all problem for today in problems rootScope
			for(var index=0;index<result.data.length;index++)
			{
				if(problems.document[index].date==dd)
				{
					$rootScope.problems.push(problems.document[index]);
				}
			}
			//console.log($rootScope.problems);
			localStorage.setItem('problemsToday',JSON.stringify($rootScope.problems));//set them for offline navigation 
			localStorage.setItem('problemsAll',JSON.stringify(problems.document));//
			//localStorage.setItem('problem1',$rootScope.problems[2]);
		},function(err)
		{
			console.log('Error');//there is an error so get files from localStorage
			flag=1;
		});
		//gather new password
		if(!flag){
			$http.get('http://aqueous-bayou-9488.herokuapp.com/password').then(function(result){
				$scope.passwordForContest=(result.data)[0].password;
				localStorage.setItem('password',$scope.passwordForContest);//set new password for offline use
			},function(err)
			{
				console.log('Error');
				flag=1;//there is an error so get files from localStorage
			});
		}		
	}
	if(flag==1)
		console.log('yeah error!');
	if( flag==1 || !navigator.onLine)
	{
		if(flag)
			console.log('Here due to an error!');
		$scope.passwordForContest=localStorage.getItem('password');
		var json=JSON.parse(localStorage.getItem('problemsAll'));
		var temp=JSON.parse(localStorage.getItem('problemsToday'));
		if(temp[0].date!=dd)//if data in localStorage is old
		{
			$rootScope.problems=[];
			for(var index=0;index<json.length;index++)
			{
				if(json[index].date==dd)//gather new data from whole problem set
				{
					$rootScope.problems.push(json[index]);
				}
			}
			localStorage.setItem('problemsToday',JSON.stringify($rootScope.problems));//set new data as present data 
		}
		else//else
		{
			$rootScope.problems=JSON.parse(localStorage.getItem('problemsToday'));//we are good to go
		}
		console.log($rootScope.problems);
	}
	if(localStorage.getItem('rollNo'))//user has logged in previously
		$location.path('/loggedIn');
	$scope.check=function(){
		console.log($scope.rollNo,$scope.password);
		if($scope.rollNo.length < 10)
		{
			alert('Roll No. entered is not valid');
		}
		else
		{
			var today=new Date();
			var dd=today.getDate();
			if(($scope.password == ($scope.passwordForContest)))
			{
				localStorage.setItem('rollNo',$scope.rollNo);
				$location.path('/loggedIn');
				//alert("password is invalid!");
			}
			else
			{
				alert("Not vaild credentials");
			}
		}
	}
});