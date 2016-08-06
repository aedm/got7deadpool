import {Players} from '/src/collections/players.js';
import fbgraph from 'fbgraph';

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


Accounts.onLogin(function (attempt) {
  console.log("onlogin");
  let user = attempt.user;

  if (user.services.facebook) {
    let facebookId = user.services.facebook.id;

    fbgraph.setAccessToken(user.services.facebook.accessToken).get(facebookId,
        {fields: "friends,name"},
        Meteor.bindEnvironment((err, result) => {
          if (err) {
            console.error(`Facebook access error for userid:${user.services.facebook.id}:\n${err}`);
            return;
          }

          // Get user name
          let name = result.name;

          // Get user friends
          let friendIds = result.friends ? result.friends.data.map(x => x.id) : [];

          // Update user name and friends list
          Meteor.users.update(user._id, {
            $set: {
              "profile.name": name,
              "profile.friends": friendIds,
            }
          });
          Players.update(user._id, {
            $set: {"profile.name": name},
          });

          // Also update friends of this user
          Meteor.users.update({
            "services.facebook.id": {$in: friendIds},
            "profile.friends": {$ne: facebookId},
          }, {
            $addToSet: {"profile.friends": facebookId},
          });

          // Remove user from unfriended users' friend list
          Meteor.users.update({
            "services.facebook.id": {$nin: friendIds},
            "profile.friends": facebookId,
          }, {
            $pull: {"profile.friends": facebookId},
          });
        }));
  }
});