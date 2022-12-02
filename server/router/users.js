const express = require("express");
const {
  update,
  deleteUser,
  getUser,
  getUsers,
} = require("../controllers/users");
const verifyToken = require("../verifyToken");

const router = express.Router();

router.put("/updateAccount/:id", verifyToken, update);
router.delete("/:id", verifyToken, deleteUser);
router.get("/:id", verifyToken, getUser);
router.get("/", verifyToken, getUsers);

module.exports = router;
