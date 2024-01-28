const streamers = require("../data/streamers.json");

module.exports = (req, res, next) => {
  const streamer = streamers.find((id) => id.userID == "u-2");

  req.user = streamer;
  next();
};
