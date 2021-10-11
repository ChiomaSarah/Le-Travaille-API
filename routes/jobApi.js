const express = require("express");
const router = express.Router();
const Parser = require("rss-parser");
const verifyToken = require("../middleware/verifyToken");

const parser = new Parser({
  customFields: {
    item: [
      "id",
      "position",
      "company",
      "contract",
      "experience",
      "location",
      "expiryDate",
    ],
  },
});

router.get("/jobs", verifyToken, async (req, res) => {
  try {
    parser.parseURL(
      "https://www.myjobmag.com/aggregate_feed.xml",
      function (err, feed) {
        res.json(feed);
      }
    );
  } catch (err) {
    console.error(err.message);
    res.json({ message: err.message });
  }
});

module.exports = router;
