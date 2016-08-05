import {Players} from '/src/collections/players.js';

Accounts.onCreateUser(function (options, user) {
  console.log("oncreaet");
  let profile = {
    name: null,
    photo: null,
  };

  if (user.services.facebook) {
    // Use the user's Facebook name and photo
    profile.name = user.services.facebook.name;
    profile.photo = `https://graph.facebook.com/${user.services.facebook.id}/picture?type=square`;
  } else {
    profile.name = options.username;
  }

  // Create a player object when registering
  let player = {
    _id: user._id,
    profile,
    registrationTime: new Date(),
    votes: [],
    scores: [],
  };
  Players.insert(player);

  // Store profile in user object, too
  user.profile = profile;

  return user;
});


Accounts.onLogin(function(attempt) {
  console.log("onlogin");

  if (attempt.type === "facebook") {
    let user = attempt.user;

  }
});