const { error } = require("console");
const sequelize = require("../config/databaseConfig");
const { Sequelize, DataTypes } = require("sequelize");
const { v4: uuidV4 } = require("uuid");
const user = sequelize.define("user", {
  userCode: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: () => {
      return uuidV4();
    },
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const emojiNotes = sequelize.define("emojiNotes", {
  emojiCode: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: () => {
      return uuidV4();
    },
  },
  emoji: {
    type: DataTypes.STRING,
  },
  emojiName: {
    type: DataTypes.STRING,
    // allowNull: false
  },
  note: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  userCode: {
    type: DataTypes.UUID,
    references: {
      model: "users",
      key: "userCode",
    },
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

const suggestEmojis = sequelize.define("suggestemoji", {
  suggestEmojiCode: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: () => {
      return uuidV4();
    },
  },
  emoji: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  emojiName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const emojiStatistics = sequelize.define("emojiStatastics", {
  emoji: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  emojiName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userCode: {
    type: DataTypes.UUID,
    references: {
      model: "users",
      key: "userCode",
    },
  },
});

sequelize
  .sync()
  .then(() => {
    console.log("Tables created");
  })
  .catch((error) => {
    throw error;
  });

module.exports = { user, emojiNotes, suggestEmojis };
