import slack from "@slack/bolt";
import "dotenv/config";

const { App } = slack;
const { SLACK_TOKEN, SLACK_SIGNING_SECRET, SLACK_APP_TOKEN } = process.env;

const app = new App({
  token: SLACK_TOKEN,
  signingSecret: SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: SLACK_APP_TOKEN,
});

const logReviewerToChannel = (say, reviewer) => {
  say(
    `Congratulations *${reviewer}*, you have been choosen to review the task !`
  );
};

const logErrorToChannel = (say, errorMessage) => {
  say(errorMessage);
};

const getRandomUser = (users) => {
  const list = [];
  users.forEach((user) => {
    if (!user.is_bot && user.name !== "slackbot") {
      // Only for real user. Slackbot is marked as non-bot
      list.push(user.name);
    }
  });
  return list[Math.floor(Math.random() * list.length)];
};

app.command("/reviewer", async ({ say }) => {
  try {
    const { members } = await app.client.users.list();
    return logReviewerToChannel(say, getRandomUser(members));
  } catch (error) {
    logErrorToChannel(
      "There have been an issue... we were not able to find a reviewer"
    );
  }
});

app.start(3000);
