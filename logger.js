/**
 * Log the choosen reviewer to the Channel
 * @param {Function} say - slack function to display text in channel
 * @param {String} reviewer - name of the choosen reviewer
 */
exports.logReviewerToChannel = (say, reviewer) => {
  say(
    `Congratulations *${reviewer}*, you have been choosen to review the task !`
  );
};

/**
 * Log an error message to the user
 * @param {Function} say - slack function to display text in channel
 * @param {String} errorMessage - error message to display
 */
exports.logErrorToChannel = (say, errorMessage) => {
  say(errorMessage);
};
