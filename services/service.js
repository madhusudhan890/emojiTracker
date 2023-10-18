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
        message: "user signup successfull",
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
        message: "User logged successfully",
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

exports.getEmojiNotes = async (
  userCode,
  sort,
  limit,
  page,
  filter,
  firstDate,
  secondDate
) => {
  try {
    let order = sort ? sort : "DESC";
    const data = await emojiNotes.findAll({
      where: {
        userCode,
        isActive: true,
        // category: filter,
        ...(firstDate && secondDate
          ? {
              createdAt: {
                [Op.and]: {
                  [Op.gte]: firstDate,
                  [Op.lte]: secondDate,
                },
              },
            }
          : null),
      },
      attributes: ["emoji", "emojiName", "emojiCode", "note"],
      order: [["createdAt", order]],
      ...(limit && page
        ? { offset: parseInt(page), limit: parseInt(limit) }
        : null),
    });
    return {
      statusCode: 200,
      message: "Users emoji notes fetched successfully",
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
        data: [],
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
        message: "successfully updated",
        data: [],
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
        message: "successfully deleted",
        data: [],
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
      message: "Fetching feed successfully",
      data: data,
    };
  } catch (error) {
    throw error;
  }
};

exports.shareEmojiNotes = async (startDate, endDate, userCode) => {
  try {
    var { shareUrl } = await user.findOne({
      where: { userCode: userCode },
      attributes: ["shareUrl"],
    });
    if (!shareUrl) {
      return {
        statusCode: 403,
        message: "Sharing content is forbidden",
        data: [],
      };
    }
    const sd = new Date(startDate);
    const ed = new Date(endDate);
    const tokenUrl = await authentication.urlToken(sd, ed, userCode);
    return {
      statusCode: 200,
      message: "Url shared successfully",
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
      message: "Emojis successfully fetched",
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
      data: [],
    };
  } catch (error) {
    throw error;
  }
};

exports.suggestEmoji = async (note) => {
  try {
    note = note.split(" ");
    let noteModified = note.map((note) => note.toLowerCase());
    let category;

    for (let i = 0; i < noteModified.length; i++) {
      if (["happy", "joy", "excited", "smile"].includes(noteModified[i])) {
        category = "happy";
        break;
      } else if (
        ["sad", "unhappy", "dull", "pineapple"].includes(noteModified[i])
      ) {
        category = "sad";
        break;
      } else if (
        ["laugh", "laughing", "smile", "smiling"].includes(noteModified[i])
      ) {
        category = "Laugh";
        break;
      } else if (
        ["sleep", "tired", "sleepy", "sleeping"].includes(noteModified[i])
      ) {
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
      message: "Emojis successfully fetched",
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
    const moods = await emojiNotes.findAll({
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

    var emojiFrequencies = {};
    const notes = [];
    moods.forEach((mood) => {
      // Extract emojis from the mood text (assuming mood contains emojis)
      const emojis = mood.emoji.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]|\w/g);
      if (emojis) {
        emojis.forEach((emoji) => {
          if (Object.prototype.hasOwnProperty.call(emojiFrequencies, emoji)) {
            emojiFrequencies[emoji]++;
          } else {
            emojiFrequencies[emoji] = 1;
          }
        });
      }

      if (mood.note) {
        notes.push({
          note: mood.note,
          emoji: mood.emoji,
        });
      }
    });
    return {
      statusCode: 200,
      message: "Monthly summery report fetched successfully",
      data: {
        frequently_used_emojis: emojiFrequencies,
        notes: notes,
      },
    };
  } catch (error) {
    throw error;
  }
};

exports.isShare = async (isShare, userCode) => {
  try {
    let res = await user.update({ isShare }, { where: { userCode: userCode } });
    return {
      statusCode: 200,
      message: "Successfully updated",
      data: [],
    };
  } catch (error) {
    throw error;
  }
};
