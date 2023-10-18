const { query, body, check, validationResult } = require("express-validator");

exports.signUp = [
  check("userName").notEmpty().withMessage("userName required"),
  check("email").notEmpty().withMessage("Email is required"),
  check("password").notEmpty().withMessage("password is required"),
];

exports.login = [
  check("email").notEmpty().withMessage("Email is required"),
  check("password").notEmpty().withMessage("password is required"),
];

exports.postEmojiNotes = [
  check("emoji").notEmpty().withMessage("Emoji is required"),
  check("note").notEmpty().withMessage("note is required"),
  check("category").notEmpty().withMessage("Emoji category is required"),
  check("emojiName").notEmpty().withMessage("EmojiName is required"),
];

exports.updateEmojiNotes = [
  check("emoji").notEmpty().withMessage("Emoji is required"),
  check("note").notEmpty().withMessage("note is required"),
  check("category").notEmpty().withMessage("Emoji category is required"),
  check("emojiName").notEmpty().withMessage("EmojiName is required"),
  check("emojiCode").notEmpty().withMessage("EmojiCode is required"),
];

exports.deleteEmojiNotes = [
  check("emojiCode").notEmpty().withMessage("EmojiCode is required"),
];
exports.shareUrl = [
  check("startDate").notEmpty().withMessage("startDate is required"),
  check("endDate").notEmpty().withMessage("EndDate is required"),
];

exports.moodSummery = [
  query("date").notEmpty().withMessage("Date is required"),
];
exports.validator = (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.send(errors);
    } else {
      next();
    }
  } catch (error) {}
};
