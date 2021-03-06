angular.module('goApp')
  .controller('UsersIndexController', UsersIndexController)
  .controller('UsersNewController', UsersNewController)
  .controller('UsersShowController', UsersShowController)
  .controller('UsersEditController', UsersEditController);


//INDEX
UsersIndexController.$inject = ['User'];
function UsersIndexController(User) {
  const usersIndex = this;
  usersIndex.all = User.query();
}

//CREATE
UsersNewController.$inject = ['User', '$state'];
function UsersNewController(User, $state) {
  const usersNew = this;
  usersNew.user = {};

  function create() {
    User.save(usersNew.user, () => {
      $state.go('userIndex');
    });
  }
  usersNew.create = create;
}

//SHOW & DELETE
UsersShowController.$inject = ['User', '$state', '$auth', '$sce'];
function UsersShowController(User, $state, $auth, $sce) {
  const usersShow = this;

  User.get($state.params).$promise.then((data) => {
    usersShow.user = data;

    usersShow.authUser = $auth.getPayload();
    if (usersShow.authUser) {
      usersShow.authUser = usersShow.authUser._id;
    }

    console.log(usersShow.user);
    usersShow.video = $sce.trustAsHtml(usersShow.user.video);

    usersShow.incrementLikes = userLikes;
    usersShow.isLoggedIn = $auth.isAuthenticated;
    usersShow.delete = deleteUser;
  }

  );

  function userLikes() {
    const userIdIndex = usersShow.user.likes.indexOf(usersShow.authUser);

    if (!usersShow.user.likes.includes(usersShow.authUser) && !!usersShow.authUser) {
      usersShow.user.likes.push(usersShow.authUser);
    } else if (usersShow.user.likes.includes(usersShow.authUser) && !!usersShow.authUser) {
      usersShow.user.likes.splice(userIdIndex, 1);
    }

    usersShow.user.$update();
  }

  // function userChallenges () {
  //   usersShow.users.activeChallenges.data.push(usersShow.authUser);
  //   usersShow.users.activeChallenges.userId.push(usersShow.authUser);
  //   usersShow.users.$update((data) => {
  //     console.log(data);
  //   });
  // }
  //
  // usersShow.userChallenges = userChallenges;

  // usersShow.user = User.get($state.params);
  function deleteUser() {
    usersShow.user.$remove(() => {
      $state.go('usersIndex');
    });
  }
}

//EDIT
UsersEditController.$inject = ['User', '$state', '$auth', 'user'];
function UsersEditController(User, $state, $auth, user) {
  const usersEdit = this;

  usersEdit.authUser = $auth.getPayload();
  if (usersEdit.authUser) {
    usersEdit.authUser = usersEdit.authUser._id;
  }

  User.get({ id: usersEdit.authUser }).$promise.then((data) => {
    usersEdit.user = data;
  });


  function update() {

    usersEdit.user.$update((data) => {
      $state.go('usersShow', { id: usersEdit.authUser });
      user.account = data;
    });
  }

  usersEdit.update = update;
}
