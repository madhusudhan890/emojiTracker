const { Router } = require("express");
const Controller = require("../controllers/controller");
const authentication = require("../authentication/authentication");
const Validation = require("../validator/validator");
const route = Router();

route.post(
  "/signup",
  Validation.signUp,
  Validation.validator,
  Controller.signUp
);

route.post("/login", Validation.login, Validation.validator, Controller.login);

route.get("/emojinotes", authentication.verifyToken, Controller.getEmojiNotes);

route.post(
  "/emojinotes",
  authentication.verifyToken,
  Validation.postEmojiNotes,
  Validation.validator,
  Controller.postEmojiNotes
);

route.put(
  "/emojinotes",
  authentication.verifyToken,
  Validation.updateEmojiNotes,
  Validation.validator,
  Controller.updateEmojiNotes
);

route.delete(
  "/emojinotes",
  authentication.verifyToken,
  Validation.deleteEmojiNotes,
  Validation.validator,
  Controller.deleteEmojiNotes
);

route.get("/emojifeed", authentication.verifyToken, Controller.emojifeed);

route.get(
  "/mood-summary",
  Validation.moodSummery,
  Validation.validator,
  authentication.verifyToken,
  Controller.emojiSummery
);

route.post(
  "/shareemojinotes",
  authentication.verifyToken,
  Controller.shareEmojiNotes
);

route.get("/readurl", authentication.urlVerifyToken, Controller.readUrl);

route.post(
  "/suggestemoji",
  authentication.verifyToken,
  Controller.suggestEmoji
);

route.post("isshare", authentication.verifyToken, Controller.isShare);

route.post("/emojis", Controller.emojis);

route.post(
  "/emoji-statistics",
  authentication.verifyToken,
  Validation.shareUrl,
  Validation.validator,
  Controller.emojiStatistics
);

module.exports = route;
