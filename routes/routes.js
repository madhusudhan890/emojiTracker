const { Router } = require("express");
const Controller = require("../controllers/controller");
const authentication = require("../authentication/authentication");
const route = Router();

route.post("/signup", Controller.signUp);

route.post("/login", Controller.login);

route.get("/emojinotes", authentication.verifyToken, Controller.getEmojiNotes);

route.post(
  "/emojinotes",
  authentication.verifyToken,
  Controller.postEmojiNotes
);

route.put(
  "/emojinotes",
  authentication.verifyToken,
  Controller.updateEmojiNotes
);

route.delete(
  "/emojinotes",
  authentication.verifyToken,
  Controller.deleteEmojiNotes
);

route.get("/emojifeed", authentication.verifyToken, Controller.emojifeed);

route.get("/summary", authentication.verifyToken, Controller.emojiSummery);

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

route.post("/emojis", Controller.emojis);

module.exports = route;
