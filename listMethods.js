/**
 * Select a random user from the array of users
 * @param {Array} users - array of the user from the slack channel
 * @returns {String} - return the random user selected
 */
exports.getRandomUser = (users) => {
  const list = [];
  users.forEach((user) => {
    if (!user.is_bot && user.name !== "slackbot") {
      // Only for real user. Slackbot is marked as non-bot
      list.push(user.name);
    }
  });
  return list[Math.floor(Math.random() * list.length)];
};
