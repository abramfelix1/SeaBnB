const router = require("express").Router();

const {
  setTokenCookie,
  restoreUser,
  requireAuth,
} = require("../../utils/auth.js");
const currentRouter = require("./current.js");
const usersRouter = require("./users.js");
const spotsRouter = require("./spots.js");

router.use(restoreUser);

router.use("/current", currentRouter);

router.use("/users", usersRouter);

router.use("/spots", spotsRouter);

router.post("/test", (req, res) => {
  res.json({ requestBody: req.body });
});

module.exports = router;
