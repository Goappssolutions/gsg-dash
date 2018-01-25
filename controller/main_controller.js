/*****************************************************************************************************************/
/*****************************************************************************************************************/
/*****************************************************************************************************************/
app.controller("Main_Controller", function($scope, $state, $rootScope,$interval, $window, $uibModal,NgTableParams, $localStorage, Util, ApiCall) {

  var setInterval;
  // $scope.refresh = function(){
  //   $interval.cancel(setInterval);
  //   setInterval = $interval(function(){
  //     if($state.current.name == "dashboard"){
  //       $state.reload();
  //     }
  //   },20000);
  // };

//   $scope.refresh = function(){
//   var setInterval;
//     if(angular.isDefined(setInterval)){
//      return;
//     }
//     else {
//       setInterval = $interval(function(){
//         if($state.current.name == "dashboard"){
//           $window.location.reload();
//         }
// //         else {
// //           $scope.closeInterval();
// //         }
//       },120000);
//     }
//   };
  
 
//   $scope.closeInterval = function(){
//   if (angular.isDefined(setInterval)) {
//             $interval.cancel(setInterval);
//             setInterval = undefined;
//           }
//   };
    
  $scope.active_tab = 'lists';
  var colors = ['#34dcd6', '#7c12ca', '#efe239', '#34bb25', '#34bb25', '#34dcd6', '#7c12ca', '#efe239', '#bb25a7', '#34bb25'];
  $scope.tabChange = function(tab) {
    $scope.active_tab = tab;
  }
  $scope.signOut = function() {
    $localStorage.token = null;
    $rootScope.isLoggedin = false;
    $state.go('login');
  }
  $scope.getBgColor = function(index) {
    return (colors[index] ? colors[index] : colors[0]);
  }
  // function to get ticket counts
  $scope.getOrdersCount = function() {
    // service to get ticket count.

    ApiCall.getOrdersCount(function(response) {
      console.log(response.data);
      $scope.counts = response.data;
    }, function(error) {
      console.log(error);
    });
  };
  // function to get user count
  $scope.getUserCount = function(){
    // service to get user count
    ApiCall.getUserCount(function(response){
      console.log(response.data);
      $scope.userCount = response.data;
    }, function(error){
      console.log(error);
    });

  };

  // function to open chnage password modal
  $scope.changePasswordModal = function(){
    var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'view/modals/changePassword.html',
        controller: 'changePasswordController',
        size: 'md',
        resolve: {
          
        }
    });

  };

});
  // controllerfor change password modal
app.controller('changePasswordController', function($scope,$localStorage,$uibModalInstance,ApiCall, Util){
  $scope.password ={};
  $scope.checkPassword = function(before,after){
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>" + before,after);
    $scope.showPasswordMisMatch = false;
    if(before !== after){
    $scope.showPasswordMisMatch = true;
    }
    return $scope.showPasswordMisMatch;
};

  $scope.change = function(){
    $scope.password.userId = $localStorage.loggedin_user.userId;
    ApiCall.changePassword($scope.password , function(response){
      $localStorage.loggedin_user = response.data;
      $uibModalInstance.close();
      Util.alertMessage('success','Password Changed successfully..');
    }, function(error){

      Util.alertMessage('danger','Error in password change');
      $uibModalInstance.close();
    });
   
  };
  $scope.cancel = function(){
    $uibModalInstance.dismiss('cancel');
  };

});
app.controller('DatePickerCtrl', ['$scope', function($scope) {
  // $scope.task = {};
  // $scope.ClosingDateLimit  = function(){
  //   $scope.startDates = $scope.task.startDate;
  //   console.log($scope.startDates);
  // }
  $scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.clear = function() {
    $scope.dt = null;
  };

  // Disable weekend selection
  /*
   $scope.disabled = function(date, mode) {
   return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
   };*/

  $scope.toggleMin = function() {
    // $scope.minDate = $scope.task.startDate;
    $scope.minDate = new Date();
    $scope.maxDate = new Date();
    $scope.dateMin = null || new Date();
  };
  $scope.toggleMin();

  $scope.open1 = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.mode = 'month';

  $scope.initDate = new Date();
  $scope.formats = ['MM-dd-yyyy', 'dd-MMM-yyyy', 'dd-MMMM-yyyy', 'yyyy-MM-dd', 'dd/MM/yyyy', 'yyyy-MMM', 'shortDate'];
  $scope.format = $scope.formats[4];
  $scope.format1 = $scope.formats[5];

}]);
