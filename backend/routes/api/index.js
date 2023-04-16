const router = require("express").Router();

const {
  setTokenCookie,
  restoreUser,
  requireAuth,
} = require("../../utils/auth.js");
const currentRouter = require("./current.js");
const usersRouter = require("./users.js");

router.use(restoreUser);

router.use("/current", currentRouter);

router.use("/users", usersRouter);

router.post("/test", (req, res) => {
  res.json({ requestBody: req.body });
});

module.exports = router;
