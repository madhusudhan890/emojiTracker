const Services = require("../services/service");

exports.signUp = async (req, res) => {
  try {
    const { userName, password, email } = req.body;
    const response = await Services.signUp(userName, password, email);
    res.send(response);
  } catch (error) {
    throw error;
  }
};

exports.login = async (req, res) => {
  try {
    const { password, email } = req.body;
    const response = await Services.login(password, email);
    res.send(response);
  } catch (error) {
    throw error;
  }
};

exports.getEmojiNotes = async (req, res) => {
  try {
    const { userCode } = req.payload;
    const response = await Services.getEmojiNotes(userCode);

    res.send(response);
  } catch (error) {
    throw error;
  }
};

exports.postEmojiNotes = async (req, res) => {
  try {
    const { userCode } = req.payload;
    const { note, emoji, emojiName, category } = req.body;
    const response = await Services.postEmojiNotes(
      userCode,
      note,
      emojiName,
      emoji,
      category
    );

    res.status(200).send(response);
  } catch (error) {
    throw error;
  }
};

exports.updateEmojiNotes = async (req, res) => {
  try {
    const { userCode } = req.payload;
    const { emojiCode, emoji, emojiName, note } = req.body;
    const response = await Services.updateEmojiNotes(
      emojiCode,
      note,
      emojiName,
      emoji
    );

    res.send(response);
  } catch (error) {
    throw error;
  }
};

exports.deleteEmojiNotes = async (req, res) => {
  try {
    const { userCode } = req.payload;
    const { emojiCode } = req.body;
    const response = await Services.deleteEmojiNotes(userCode, emojiCode);

    res.status(200).send(response);
  } catch (error) {
    throw error;
  }
};

exports.emojifeed = async (req, res) => {
  try {
    const limit = req.query.limit ? req.query.limit : 10;
    const page = req.query.page ? req.query.page : 1;
    const data = await Services.emojifeed(limit, page);
    res.send(data);
  } catch (error) {
    throw error;
  }
};

exports.shareEmojiNotes = async (req, res) => {
  try {
    const { userCode } = req.payload;
    const { startDate, endDate } = req.body;
    const response = await Services.shareEmojiNotes(
      startDate,
      endDate,
      userCode
    );

    res.send(response);
  } catch (error) {
    throw error;
  }
};

exports.readUrl = async (req, res) => {
  try {
    const { startDate, endDate, userCode } = req.payload;
    const response = await Services.readUrl(startDate, endDate, userCode);
    res.send(response);
  } catch (error) {
    throw error;
  }
};

exports.suggestEmoji = async (req, res) => {
  try {
    const { note } = req.body;
    const response = await Services.suggestEmoji(note);
    res.send(response);
  } catch (error) {
    throw error;
  }
};

exports.emojis = async (req, res) => {
  try {
    const { data } = req.body;
    const response = await Services.emojis(data);
    res.send(response);
  } catch (error) {
    throw error;
  }
};

exports.emojiSummery = async (req, res) => {
  try {
    const { userCode } = req.payload;
    const { date } = req.query;
    let data = await Services.emojiSummery(userCode, date);
    res.send(data);
  } catch (error) {
    throw error;
  }
};
