const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/validation");
const connection = require("../model/connectionRequest");

router.post("/request/send/:status/:userId", auth, async (req, res) => {
  try {
    const fromUserId = req.user._id;
    const toUserId = req.params.userId;
    const status = req.params.status;

    const connectionReqData = new connection({
      fromUserId,
      toUserId,
      status,
    });

    const connectionReq = await connectionReqData.save();

    res.status(200).send(connectionReq);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
