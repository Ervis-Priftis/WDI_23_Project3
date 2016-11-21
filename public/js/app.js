"use strict";function Router(e,l){e.state("challengesIndex",{url:"/challenges",templateUrl:"/templates/challengesIndex.html",controller:"ChallengesIndexController as challengesIndex"}).state("challengesNew",{url:"/challenges/new",templateUrl:"/templates/challengesNew.html",controller:"ChallengesNewController as challengesNew"}).state("challengesShow",{url:"/challenges/:id",templateUrl:"/templates/challengesShow.html",controller:"ChallengesShowController as challengesShow"}).state("challengesEdit",{url:"/challenges/:id/edit",templateUrl:"/templates/challengesEdit.html",controller:"ChallengesEditController as challengesEdit"}).state("register",{url:"/register",templateUrl:"/templates/register.html",controller:"RegisterController as register"}).state("registerInterim",{url:"/registerInterim",templateUrl:"/templates/registerInterim.html"}).state("confirm",{url:"/confirm/:confirmationCode",templateUrl:"/templates/confirm.html",controller:"ConfirmController as confirm"}).state("login",{url:"/login",templateUrl:"/templates/login.html",controller:"LoginController as login"}).state("home",{url:"/",templateUrl:"/templates/home.html"}).state("usersIndex",{url:"/challengers",templateUrl:"/templates/usersIndex.html",controller:"UsersIndexController as usersIndex"}).state("usersEdit",{url:"/challengers/:id/edit",templateUrl:"/templates/usersEdit.html",controller:"UsersEditController as usersEdit"}).state("usersShow",{url:"/challengers/:id",templateUrl:"/templates/usersShow.html",controller:"UsersShowController as usersShow"}),l.otherwise("/challenges")}function Auth(e){e.loginUrl="/login",e.signupUrl="/register",e.tokenPrefix=""}function RegisterController(e,l){function t(){e.signup(r.user).then(function(){l.go("registerInterim")})}var r=this;r.user={},r.submit=t}function ConfirmController(e,l){e({method:"POST",url:"/confirm/"+l.params.confirmationCode})}function LoginController(e,l,t,r){function n(){o.isLoggedIn=!0,console.log(o.isLoggedIn),e.login(o.credentials).then(function(){o.currentUser=e.getPayload(),o.currentUser&&t.get({id:o.currentUser._id},function(e){r.account=e,console.log(r.currentUser)}),l.go("home")})}var o=this;o.credentials={},o.submit=n}function Challenge(e){return new e("/challenges/:id",{id:"@_id"},{update:{method:"PUT"}})}function ChallengesIndexController(e){var l=this;l.all=e.query()}function ChallengesNewController(e,l){function t(){e.save(r.challenge,function(){l.go("challengesIndex")})}var r=this;r.challenge={},r.create=t}function ChallengesShowController(e,l,t,r){function n(){u.challenge.$remove(function(){t.go("challengesIndex")})}function o(){var e=u.challenge.like.indexOf(u.authUser);!u.challenge.like.includes(u.authUser)&&u.authUser?(u.challenge.like.push(u.authUser),u.challenge.$update()):u.challenge.like.includes(u.authUser)&&u.authUser&&(u.challenge.like.splice(e,1),u.challenge.$update())}function s(){u.challenge.participants.data.push(u.authUser),u.challenge.participants.userId.push(u.authUser),u.challenge.$update(function(e){console.log(e)}),u.userProfile.activeChallenges.push(u.challenge._id),u.challenge.$update(),u.userProfile.$update()}function a(){var e=u.challenge.participants.userId.indexOf(u.authUser);u.challenge.participants.userId.splice(e,1),console.log(u.challenge.participants.userId)}function i(){console.log("In toggle pop up"),u.popUpActive=!0}var u=this;u.authUser=r.getPayload(),u.authUser&&(u.authUser=u.authUser._id,l.get({id:u.authUser},function(e){u.userProfile=e})),e.get(t.params).$promise.then(function(e){u.challenge=e}),u.togglePopUp=i,u.Unparticipate=a,u.participate=s,u.incrementLikes=o,u.isLoggedIn=r.isAuthenticated,u.delete=n}function ChallengesEditController(e,l){function t(){r.challenge.$update(function(){l.go("challengesShow",l.params)})}var r=this;r.challenge=e.get(l.params),this.update=t}function currentUser(e,l){var t=this,r=l.getPayload();r&&e.get({id:r._id},function(e){t.account=e})}function googleMap(e,l){return{restrict:"E",replace:!0,template:'<div class="google-map">Google Map HERE</div>',scope:{challenge:"="},link:function(l,t){l.$watch("challenge",function(){if(l.challenge){var r=new e.google.maps.Map(t[0],{center:l.challenge.location,zoom:12});new e.google.maps.Marker({position:l.challenge.location,map:r,animation:e.google.maps.Animation.DROP})}})}}}function MainController(e){function l(){console.log("in toggle menu"),t.menuActive=!t.menuActive,console.log(t.menuActive)}var t=this;t.isLoggedIn=e.isAuthenticated,t.currentUser=e.getPayload(),t.toggleMenu=l}function ProfileController(e,l,t,r){function n(){e.logout().then(function(){o.account=null,l.go("home")})}var o=this;o.isLoggedIn=e.isAuthenticated,e.getPayload()&&(o.currentUserId=e.getPayload()._id),o.currentUser=r,o.isLoggedIn()&&t.get({id:o.currentUserId},function(e){r.account=e}),o.logout=n,o.message=null}function User(e){return new e("/users/:id",{id:"@_id"},{update:{method:"PUT"}})}function user(){var e=this;e.account={}}function UsersIndexController(e){var l=this;l.all=e.query()}function UsersNewController(e,l){function t(){e.save(r.user,function(){l.go("userIndex")})}var r=this;r.user={},r.create=t}function UsersShowController(e,l,t){function r(){var e=o.user.likes.indexOf(o.authUser);!o.user.likes.includes(o.authUser)&&o.authUser?(o.user.likes.push(o.authUser),o.user.$update()):o.user.likes.includes(o.authUser)&&o.authUser&&(o.user.likes.splice(e,1),o.user.$update())}function n(){o.user.$remove(function(){l.go("usersIndex")})}var o=this;e.get(l.params,function(e){o.user=e,o.authUser=t.getPayload(),o.authUser&&(o.authUser=o.authUser._id),o.incrementLikes=r,o.isLoggedIn=t.isAuthenticated,o.delete=n})}function UsersEditController(e,l,t){function r(){n.user.$update(function(e){console.log(e.bio),l.go("usersShow",{id:n.authUser})})}var n=this;n.authUser=t.getPayload(),n.authUser&&(n.authUser=n.authUser._id),e.get({id:n.authUser},function(e){n.user=e,console.log(n.user)}),n.update=r}angular.module("goApp",["ngResource","ui.router","satellizer"]).config(Router).config(Auth),Router.$inject=["$stateProvider","$urlRouterProvider"],Auth.$inject=["$authProvider"],angular.module("goApp").controller("RegisterController",RegisterController).controller("ConfirmController",ConfirmController).controller("LoginController",LoginController),RegisterController.$inject=["$auth","$state"],ConfirmController.$inject=["$http","$state"],LoginController.$inject=["$auth","$state","User","user"],angular.module("goApp").factory("Challenge",Challenge),Challenge.$inject=["$resource"],angular.module("goApp").controller("ChallengesIndexController",ChallengesIndexController).controller("ChallengesNewController",ChallengesNewController).controller("ChallengesShowController",ChallengesShowController).controller("ChallengesEditController",ChallengesEditController),ChallengesIndexController.$inject=["Challenge"],ChallengesNewController.$inject=["Challenge","$state"],ChallengesShowController.$inject=["Challenge","User","$state","$auth"],ChallengesEditController.$inject=["Challenge","$state"],angular.module("goApp").service("currentUser",currentUser),currentUser.$inject=["User","$auth"],angular.module("goApp").directive("googleMap",googleMap),googleMap.$inject=["$window","Challenge"],angular.module("goApp").controller("MainController",MainController),MainController.$inject=["$auth"],angular.module("goApp").controller("ProfileController",ProfileController),ProfileController.$inject=["$auth","$state","User","user"],angular.module("goApp").factory("User",User),User.$inject=["$resource"],angular.module("goApp").service("user",user),angular.module("goApp").controller("UsersIndexController",UsersIndexController).controller("UsersNewController",UsersNewController).controller("UsersShowController",UsersShowController).controller("UsersEditController",UsersEditController),UsersIndexController.$inject=["User"],UsersNewController.$inject=["User","$state"],UsersShowController.$inject=["User","$state","$auth"],UsersEditController.$inject=["User","$state","$auth"];
//# sourceMappingURL=app.js.map
