import {Players} from '/src/collections/players.js';

Accounts.onCreateUser(function (options, user) {
  // Create a player object when registering
  let player = {
    _id: user._id,
    profile: {
      name: options.username,
      photo: "nope",
    },
    registrationTime: new Date(),
    votes: [],
    scores: [],
  };
  Players.insert(player);
  return user;
});