const {
  recordScrapeDuration,
} = require("../utils/collectData/utils/recordScrapeDuration");
const { launchBrowser } = require("../utils/collectData/utils/launchBrowser");
const { loginToSlack } = require("../utils/collectData/utils/loginToSlack");
const { gotoWorkspace } = require("../utils/collectData/utils/gotoWorkspace");
const {
  throwErrorIfNoConversationOrChannel,
} = require("../utils/collectData/utils/scrape/parseNames");
const {
  scrapeConversations,
  scrapeChannels,
} = require("../utils/collectData/utils/scrape");
const { closeBrowser } = require("../utils/collectData/utils/closeBrowser");

const {
  gotoChannel,
} = require("../utils/collectData/utils/scrape/gotoChannel");

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

 async function handler(req, res) {
   const { name = "World" } = req.query;
   await main();

   return res.json({
     message: `Hello ${name}!`,
   });
 }

 module.exports = handler;
