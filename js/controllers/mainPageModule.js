angular.module('mainPageModule',[]).controller('mainPageController',function($sce,$http,$scope,$location,$timeout,$rootScope){
	$scope.timeRemaining=89;
	$scope.secondRemaining=60;
	$scope.tickInterval=1000;//1 Second
	//console.log($rootScope.problems);
	$scope.toTrustedHTML = function( html ){
    	return $sce.trustAsHtml( html );
	}
	var tick=function(){
		$scope.secondRemaining--;
		//console.log($scope.timeRemaining);
		if($scope.secondRemaining==0)
		{
			$scope.timeRemaining--;
			if(!$scope.timeRemaining)
			{
				$localStorage.removeItem('password');
				localStorage.removeItem('rollNo');
				$location.path('/');
			}
			else{
				$scope.secondRemaining=60;
				$timeout(tick,$scope.tickInterval);	
			}
		}
		else
			$timeout(tick,$scope.tickInterval);
	}
	$timeout(tick,$scope.tickInterval);
});