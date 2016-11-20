angular.module('goApp')
  .controller('ChallengesIndexController', ChallengesIndexController)
  .controller('ChallengesNewController', ChallengesNewController)
  .controller('ChallengesShowController', ChallengesShowController)
  .controller('ChallengesEditController', ChallengesEditController);

ChallengesIndexController.$inject = ['Challenge'];
function ChallengesIndexController(Challenge) {
  const challengesIndex = this;
  challengesIndex.all = Challenge.query();
  // console.log('In the challenge index controller');
}


ChallengesNewController.$inject = ['Challenge', '$state'];
function ChallengesNewController(Challenge, $state) {
  const challengesNew = this;

  challengesNew.challenge = {};

  function create() {
    Challenge.save(challengesNew.challenge, () => {
      $state.go('challengesIndex');
    });
  }

  challengesNew.create = create;
}

//SHOW
ChallengesShowController.$inject = ['Challenge', 'User', '$state', '$auth'];
function ChallengesShowController(Challenge, User, $state, $auth) {

  const challengesShow = this;
  challengesShow.authUser = $auth.getPayload();
  if (challengesShow.authUser) {
    challengesShow.authUser = challengesShow.authUser._id;
    User.get({id: challengesShow.authUser}, (data)=> {
      challengesShow.userProfile = data;
    });
  }

  challengesShow.challenge = Challenge.get($state.params);
  function deleteChallenge() {
    challengesShow.challenge.$remove(() => {
      $state.go('challengesIndex');
    });
  }

  function challengeLike() {
    const userIdIndex = challengesShow.challenge.like.indexOf(challengesShow.authUser);

    if (!challengesShow.challenge.like.includes(challengesShow.authUser) && !!challengesShow.authUser) {
      challengesShow.challenge.like.push(challengesShow.authUser);
      challengesShow.challenge.$update();
    } else if (challengesShow.challenge.like.includes(challengesShow.authUser) && !!challengesShow.authUser) {
      challengesShow.challenge.like.splice(userIdIndex, 1);
      challengesShow.challenge.$update();
    }
  }

  function participate() {
    // Add User Id to challenge model
    challengesShow.challenge.participants.data.push(challengesShow.authUser);
    challengesShow.challenge.participants.userId.push(challengesShow.authUser);

    challengesShow.challenge.$update((data) => {
      console.log(data);
      console.log(challengesShow.challenge.participants.userId);
    });

    // Add Challenge Id to user Model
    challengesShow.userProfile.activeChallenges.push(challengesShow.challenge._id);

    // Update both
    challengesShow.challenge.$update();
    challengesShow.userProfile.$update();

  }

  function Unparticipate() {
    const indexId = challengesShow.challenge.participants.userId.indexOf(challengesShow.authUser);
    challengesShow.challenge.participants.userId.splice(indexId, 1);
    console.log(challengesShow.challenge.participants.userId);
  }

  challengesShow.Unparticipate = Unparticipate;
  challengesShow.participate = participate;
  challengesShow.incrementLikes = challengeLike;
  challengesShow.isLoggedIn = $auth.isAuthenticated;
  challengesShow.delete = deleteChallenge;
}

ChallengesEditController.$inject = ['Challenge', '$state'];
function ChallengesEditController(Challenge, $state) {
  const challengesEdit = this;

  challengesEdit.challenge = Challenge.get($state.params);

  function update() {
    challengesEdit.challenge.$update(() => {
      $state.go('challengesShow', $state.params);
    });
  }

  this.update = update;
}
