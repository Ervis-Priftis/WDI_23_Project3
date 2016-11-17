"use strict";function Router(e,l){e.state("challengesIndex",{url:"/challenges",templateUrl:"/templates/challengesIndex.html",controller:"ChallengesIndexController as challengesIndex"}).state("challengesNew",{url:"/challenges/new",templateUrl:"/templates/challengesNew.html",controller:"ChallengesNewController as challengesNew"}).state("challengesShow",{url:"/challenges/:id",templateUrl:"/templates/challengesShow.html",controller:"ChallengesShowController as challengesShow"}).state("challengesEdit",{url:"/challenges/:id/edit",templateUrl:"/templates/challengesEdit.html",controller:"ChallengesEditController as challengesEdit"}).state("register",{url:"/register",templateUrl:"/templates/register.html",controller:"RegisterController as register"}).state("login",{url:"/login",templateUrl:"/templates/login.html",controller:"LoginController as login"}).state("home",{url:"/",templateUrl:"/templates/home.html"}).state("usersIndex",{url:"/challengers",templateUrl:"/templates/usersIndex.html",controller:"UsersIndexController as usersIndex"}).state("usersEdit",{url:"/challenger/:id/edit",templateUrl:"/templates/usersEdit.html",controller:"UsersEditController as usersEdit"}).state("usersShow",{url:"/challengers/:id",templateUrl:"/templates/usersShow.html",controller:"UsersShowController as usersShow"}),l.otherwise("/challenges")}function Auth(e){e.loginUrl="/login",e.signupUrl="/register",e.tokenPrefix=""}function RegisterController(e,l){function t(){e.signup(r.user).then(function(){l.go("login")})}var r=this;r.user={},r.submit=t}function LoginController(e,l){function t(){e.login(r.credentials).then(function(){l.go("home")})}var r=this;r.credentials={},r.submit=t}function Challenge(e){return new e("/challenges/:id",{id:"@_id"},{update:{method:"PUT"}})}function ChallengesIndexController(e){var l=this;l.all=e.query()}function ChallengesNewController(e,l){function t(){e.save(r.challenge,function(){l.go("challengesIndex")})}var r=this;r.challenge={},r.create=t}function ChallengesShowController(e,l,t){function r(){o.challenge.$remove(function(){l.go("challengesIndex")})}function n(){console.log(o.challenge.like),o.challenge.like++,o.challenge.$update()}var o=this;o.challenge=e.get(l.params),o.incrementLikes=n,o.isLoggedIn=t.isAuthenticated,o.delete=r}function ChallengesEditController(e,l){function t(){r.challenge.$update(function(){l.go("challengesShow",l.params)})}var r=this;r.challenge=e.get(l.params),this.update=t}function MainController(e,l){function t(){e.logout().then(function(){l.go("home")})}var r=this;r.isLoggedIn=e.isAuthenticated,r.logout=t,r.message=null}function UsersIndexController(e){var l=this;l.all=e.query()}function UsersNewController(e,l){function t(){e.save(r.user,function(){l.go("userIndex")})}var r=this;r.user={},r.create=t}function UsersShowController(e,l,t){function r(){n.user.$remove(function(){l.go("usersIndex")})}var n=this;n.user=e.get(l.params),n.isLoggedIn=t.isAuthenticated,n.delete=r}function UsersEditController(e,l){function t(){r.user.$update(function(){l.go("usersShow",l.params)})}var r=this;r.user=e.get(l.params),this.update=t}function User(e){return new e("/users/:id",{id:"@_id"},{update:{method:"PUT"}})}angular.module("goApp",["ngResource","ui.router","satellizer"]).config(Router).config(Auth),Router.$inject=["$stateProvider","$urlRouterProvider"],Auth.$inject=["$authProvider"],angular.module("goApp").controller("RegisterController",RegisterController).controller("LoginController",LoginController),RegisterController.$inject=["$auth","$state"],LoginController.$inject=["$auth","$state"],angular.module("goApp").factory("Challenge",Challenge),Challenge.$inject=["$resource"],angular.module("goApp").controller("ChallengesIndexController",ChallengesIndexController).controller("ChallengesNewController",ChallengesNewController).controller("ChallengesShowController",ChallengesShowController).controller("ChallengesEditController",ChallengesEditController),ChallengesIndexController.$inject=["Challenge"],ChallengesNewController.$inject=["Challenge","$state"],ChallengesShowController.$inject=["Challenge","$state","$auth"],ChallengesEditController.$inject=["Challenge","$state"],angular.module("goApp").controller("MainController",MainController),MainController.$inject=["$auth","$state"],angular.module("goApp").controller("UsersIndexController",UsersIndexController).controller("UsersNewController",UsersNewController).controller("UsersShowController",UsersShowController).controller("UsersEditController",UsersEditController),UsersIndexController.$inject=["User"],UsersNewController.$inject=["User","$state"],UsersShowController.$inject=["User","$state","$auth"],UsersEditController.$inject=["User","$state"],angular.module("goApp").factory("User",User),User.$inject=["$resource"];
//# sourceMappingURL=app.js.map
