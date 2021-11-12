const express = require("express");
const router = express.Router();
const pool = require("../db");
const verifyToken = require("../middleware/verifyToken");

// display username of logged in user on the dashboard screen
router.get("/dashboard", verifyToken, async (req, res) => {
  try {
    const profile = await pool.query(
      "SELECT * from job_seeker WHERE user_id = $1",
      [req.user]
    );
    const values = Object.values(profile.rows);
    return res.json(values);
    // console.log(values[0].username);
  } catch (err) {
    // console.error(err.message);
    return res.status(500).json({ message: err.message });
  }
});

// retrieve all users
router.get("/users", async (req, res) => {
  try {
    await pool.query("Select * from job_seeker", (err, result) => {
      if (result) {
        return res.json({
          status: 200,
          message: "Candidates Retrieved!",
          data: result.rows,
        });
      }
    });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
  pool.end;
});

// retrieve a user
router.get("/:user_id", async (req, res) => {
  const { user_id } = req.params;
  try {
    const profile = await pool.query(
      "select * from job_seeker WHERE user_id = $1",
      [user_id]
    );
    //   res.json(profile.rows);
    const values = Object.values(profile.rows);
    return res.json(values);
    // console.log(values[0].username);
  } catch (err) {
    console.error(err.message);
  }
});

// update a user's profile
router.patch("/dashboard/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    const { username, email, password, age, degree, experience, location } =
      req.body;

    await pool.query(
      "update job_seeker set username = $1, email = $2, password = $3, age = $4, degree = $5, experience = $6, location = $7 where user_id = $8",
      [username, email, password, age, degree, experience, location, user_id],
      (err, result) => {
        if (result) {
          return res.json({
            status: 200,
            message: "Profile Updated!",
            data: result.rows,
          });
          // console.log(result.rows);
        } else {
          return res.json(err.message);
        }
      }
    );
  } catch {
    return res.status(404).json({ error: "Profile does not exist!" });
  }
  pool.end;
});

// delete a user's profile
router.delete("/dashboard/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    await pool.query(
      `delete from job_seeker where user_id = $1`,
      [user_id],
      (err, result) => {
        if (result) {
          return res.json({
            status: 200,
            message: "Profile Deleted!",
            data: result.rows,
          });
        } else {
          return res.status(404).json({ error: "Profile doesn't exist!" });
        }
      }
    );
  } catch {
    return res.status(404).json({ error: err.message });
  }
  pool.end;
});

module.exports = router;
