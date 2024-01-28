const express = require("express");
const cors = require("cors");
const requireLogin = require("../middleware/streamMiddleware");

const router = express.Router();

const streamers = require("../data/streamers.json");
let highestPoint = 0;

router.get("/streamers", requireLogin, (req, res) => {
  streamers.sort((a, b) => b.score - a.score);
  res.json(streamers);
});

router.post("/update-scores", (req, res) => {
  if (streamers[0].score >= highestPoint && highestPoint != 0) {
    return res.json({ success: true, streamers });
  }

  streamers[Math.floor(Math.random() * streamers.length)].score += 10000;
  res.json({ success: true, streamers });
});

router.post("/login", (req, res) => {
  const { id, name } = req.body;
  if (name == "admin") {
    return res.status(200).json({
      success: "success",
      role: "admin",
    });
  }
  console.log(id);
  const streamer = streamers.find((userid) => userid.userID == String(id));
  if (Object.keys(streamer || {}).length > 0) {
    return res.status(200).json({
      success: "success",
      role: "user",
    });
  } else {
    return res.status(401).json({
      error: "You must be logged in",
    });
  }
});

router.post("/set-highest-point", (req, res) => {
  const { point } = req.body;
  console.log(point);
  highestPoint = point;
  res.json({ success: true });
});

const updateScore = () => {
  if (streamers[0].score < highestPoint || highestPoint == 0) {
    streamers[Math.floor(Math.random() * streamers.length)].score += 10000;
  }
  console.log(streamers);
};

setInterval(() => {
  updateScore();
}, 2000);

router.post("/update-scores", (req, res) => {
  res.json({ success: true, streamers });
});

module.exports = router;
