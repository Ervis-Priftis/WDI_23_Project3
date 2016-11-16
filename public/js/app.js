"use strict";function Router(e,l){e.state("challengesIndex",{url:"/challenges",templateUrl:"/templates/challengesIndex.html",controller:"ChallengesIndexController as challengesIndex"}).state("challengesNew",{url:"/challenges/new",templateUrl:"/templates/challengesNew.html",controller:"ChallengesNewController as challengesNew"}).state("challengesShow",{url:"/challenges/:id",templateUrl:"/templates/challengesShow.html",controller:"ChallengesShowController as challengesShow"}).state("challengesEdit",{url:"/challenges/:id/edit",templateUrl:"/templates/challengesEdit.html",controller:"ChallengesEditController as challengesEdit"}).state("register",{url:"/register",templateUrl:"/templates/register.html",controller:"RegisterController as register"}).state("login",{url:"/login",templateUrl:"/templates/login.html",controller:"LoginController as login"}),l.otherwise("/challenges")}function Auth(e){e.loginUrl="/login",e.signupUrl="/register",e.tokenPrefix=""}function RegisterController(e,l){function n(){e.signup(t.user).then(function(){l.go("login")})}var t=this;t.user={},t.submit=n}function LoginController(e,l){function n(){e.login(t.credentials).then(function(){l.go("challengesIndex")})}var t=this;t.credentials={},t.submit=n}function Challenge(e){return new e("/challenges/:id",{id:"@_id"},{update:{method:"PUT"}})}function ChallengesIndexController(e){var l=this;l.all=e.query()}function ChallengesNewController(e,l){function n(){e.save(t.challenge,function(){l.go("challengesIndex")})}var t=this;t.challenge={},t.create=n}function ChallengesShowController(e,l,n){function t(){r.challenge.$remove(function(){l.go("challengesIndex")})}var r=this;r.challenge=e.get(l.params),r.isLoggedIn=n.isAuthenticated,r.delete=t}function ChallengesEditController(e,l){function n(){t.challenge.$update(function(){l.go("challengesShow",l.params)})}var t=this;t.challenge=e.get(l.params),this.update=n}function User(e){return new e("/users/:id",{id:"@_id"},{update:{method:"PUT"}})}angular.module("goApp",["ngResource","ui.router","satellizer"]).config(Router).config(Auth),Router.$inject=["$stateProvider","$urlRouterProvider"],Auth.$inject=["$authProvider"],angular.module("goApp").controller("RegisterController",RegisterController).controller("LoginController",LoginController),RegisterController.$inject=["$auth","$state"],LoginController.$inject=["$auth","$state"],angular.module("goApp").factory("Challenge",Challenge),Challenge.$inject=["$resource"],angular.module("goApp").controller("ChallengesIndexController",ChallengesIndexController).controller("ChallengesNewController",ChallengesNewController).controller("ChallengesShowController",ChallengesShowController).controller("ChallengesEditController",ChallengesEditController),ChallengesIndexController.$inject=["Challenge"],ChallengesNewController.$inject=["Challenge","$state"],ChallengesShowController.$inject=["Challenge","$state","$auth"],ChallengesEditController.$inject=["Challenge","$state"],angular.module("goApp").factory("User",User),User.$inject=["$resource"];
//# sourceMappingURL=app.js.map
