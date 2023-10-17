const sequelize = require("../config/databaseConfig");
const { user, emojiNotes, suggestEmojis } = require("../Models/models");
const authentication = require("../authentication/authentication");
const { Op } = require("sequelize");
exports.signUp = async (userName, password, email) => {
  try {
    const data = await user.create({ userName, email, password });
    if (data.dataValues) {
      const token = await authentication.createToken(data.dataValues);
      return {
        statusCode: 200,
        data: {
          userCode: data.dataValues.userCode,
          token: token,
          userName: data.dataValues.userName,
        },
      };
    }
    // return data.dataValues;
  } catch (error) {
    throw error;
  }
};

exports.login = async (password, email) => {
  try {
    const data = await user.findOne({ where: { email, password } });
    if (data === null) {
      return {
        statusCode: 300,
        message: "User not found",
      };
    } else {
      const token = await authentication.createToken(data.dataValues);
      return {
        statusCode: 200,
        data: {
          userCode: data.dataValues.userCode,
          token: token,
          userName: data.dataValues.userName,
        },
      };
    }
  } catch (error) {
    throw error;
  }
};

exports.getEmojiNotes = async (userCode) => {
  try {
    const data = await emojiNotes.findAll({
      where: { userCode, isActive: true },
      attributes: ["emoji", "emojiName", "emojiCode", "note"],
      order: [["createdAt", "DESC"]],
      //   offset: ,
      //   limit:
    });
    return {
      statusCode: 200,
      data: data,
    };
  } catch (error) {
    throw error;
  }
};

exports.postEmojiNotes = async (userCode, note, emojiName, emoji, category) => {
  try {
    const data = await emojiNotes.create({
      userCode,
      note,
      emojiName,
      emoji,
      category,
    });
    if (data.dataValues) {
      return {
        statusCode: 200,
        message: "Notes successfully saved",
      };
    }
  } catch (error) {
    throw error;
  }
};

exports.updateEmojiNotes = async (emojiCode, note, emojiName, emoji) => {
  try {
    const data = await emojiNotes.update(
      { note, emojiName, emoji },
      { where: { emojiCode: emojiCode, isActive: true } }
    );
    if (data) {
      return {
        statusCode: 200,
        data: "successfully updated",
      };
    }
  } catch (error) {
    throw error;
  }
};

exports.deleteEmojiNotes = async (userCode, emojiCode) => {
  try {
    const data = await emojiNotes.update(
      { isActive: false },
      { where: { emojiCode } }
    );
    if (data) {
      return {
        statusCode: 200,
        data: "successfully deleted",
      };
    }
  } catch (error) {
    throw error;
  }
};

exports.emojifeed = async (limit, page) => {
  try {
    const data = await emojiNotes.findAll({
      where: { isActive: true },
      attributes: ["emoji", "emojiName", "emojiCode", "note"],
      order: [["createdAt", "DESC"]],
      limit: parseInt(limit),
      offset: parseInt(page),
    });
    return {
      statusCode: 200,
      data: data,
    };
  } catch (error) {
    throw error;
  }
};

exports.shareEmojiNotes = async (startDate, endDate, userCode) => {
  try {
    const sd = new Date(startDate);
    const ed = new Date(endDate);
    const tokenUrl = await authentication.urlToken(sd, ed, userCode);
    return {
      statusCode: 200,
      data: {
        url: `http://localhost:3000/v1/api/readurl?token=${tokenUrl}`,
      },
    };
    // console.log(data);
  } catch (error) {
    throw error;
  }
};

exports.readUrl = async (startDate, endDate, userCode) => {
  try {
    console.log(startDate, endDate, userCode);
    const data = await emojiNotes.findAll({
      where: {
        userCode: userCode,
        createdAt: {
          [Op.and]: {
            [Op.gte]: startDate,
            [Op.lte]: endDate,
          },
        },
      },
      attributes: ["emoji", "emojiName", "emojiCode", "note"],
      order: [["createdAt", "DESC"]],
    });
    return {
      statusCode: 200,
      data: data,
    };
  } catch (error) {
    throw error;
  }
};

exports.emojis = async (data) => {
  try {
    const response = await suggestEmojis.bulkCreate(data);
    return {
      statusCode: "200",
      message: "Inserted successfullly",
    };
  } catch (error) {
    throw error;
  }
};

exports.suggestEmoji = async (note) => {
  try {
    note = note.split(" ");

    let category;

    for (let i = 0; i < note.length; i++) {
      if (["happy", "joy", "excited", "smile"].includes(note[i])) {
        category = "happy";
        break;
      } else if (["sad", "unhappy", "dull", "pineapple"].includes(note[i])) {
        category = "sad";
        break;
      } else if (["laugh", "laughing", "smile", "smiling"].includes(note[i])) {
        category = "Laugh";
        break;
      } else if (["sleep", "tired", "sleepy", "sleeping"].includes(note[i])) {
        category = "Sleep";
        break;
      }
    }
    let data = await suggestEmojis.findAll({
      where: { category: category },
      attributes: ["emoji", "emojiName"],
    });
    return {
      statusCode: 200,
      data: data,
    };
  } catch (error) {
    throw error;
  }
};

exports.emojiSummery = async (userCode, date) => {
  try {
    let startDate = new Date(date);
    let endDate = new Date(
      startDate.getFullYear(),
      startDate.getMonth() + 1,
      1
    );
    const data = await emojiNotes.findAll({
      where: {
        userCode: userCode,
        createdAt: {
          [Op.and]: {
            [Op.gte]: startDate,
            [Op.lte]: endDate,
          },
        },
      },
    });
  } catch (error) {
    throw error;
  }
};
