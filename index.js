import slack from "@slack/bolt";
import "dotenv/config";
import { logErrorToChannel, logReviewerToChannel } from "./logger";
import { getRandomUser } from "./listMethods";

const { App } = slack;
const { SLACK_TOKEN, SLACK_SIGNING_SECRET, SLACK_APP_TOKEN } = process.env;

const app = new App({
  token: SLACK_TOKEN,
  signingSecret: SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: SLACK_APP_TOKEN,
});

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
