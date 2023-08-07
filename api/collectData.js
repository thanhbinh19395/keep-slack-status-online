const {
  recordScrapeDuration,
} = require("./collectData/utils/recordScrapeDuration");
const { launchBrowser } = require("./collectData/utils/launchBrowser");
const { loginToSlack } = require("./collectData/utils/loginToSlack");
const { gotoWorkspace } = require("./collectData/utils/gotoWorkspace");
const {
  throwErrorIfNoConversationOrChannel,
} = require("./collectData/utils/scrape/parseNames");
const {
  scrapeConversations,
  scrapeChannels,
} = require("./collectData/utils/scrape");
const { closeBrowser } = require("./collectData/utils/closeBrowser");

const { gotoChannel } = require("./collectData/utils/scrape/gotoChannel");

const sleep = async (ms) => {
  // eslint-disable-next-line no-undef
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const main = async () => {
  recordScrapeDuration();
  const { page, browser } = await launchBrowser();

  await loginToSlack(page);
  await gotoWorkspace(page);
  // await // throwErrorIfNoConversationOrChannel()
  // await scrapeConversations(page)
  // await scrapeChannels(page)
  // eslint-disable-next-line no-constant-condition
  while (true) {
    await sleep(2000);
    await gotoChannel(page, "DM", "Slackbot");
    await sleep(2000);
    await gotoChannel(page, "DM", "Dustin Ho");
  }
};

export default async function handler(req, res) {
  const { name = "World" } = req.query;
  await main();

  return res.json({
    message: `Hello ${name}!`,
  });
}
