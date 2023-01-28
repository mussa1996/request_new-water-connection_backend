"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _express = _interopRequireDefault(require("express"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _dbconnection = _interopRequireDefault(require("./src/database/dbconnection"));
var _cors = _interopRequireDefault(require("cors"));
var _index = _interopRequireDefault(require("./src/routers/index"));
var _expressFileupload = _interopRequireDefault(require("express-fileupload"));
var app = (0, _express["default"])();
(0, _dbconnection["default"])();
var corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200
};
app.use(_bodyParser["default"].json());
app.use((0, _cors["default"])(corsOptions));
app.use(_bodyParser["default"].urlencoded({
  extended: false
}));
app.use((0, _expressFileupload["default"])({
  useTempFiles: true
}));
app.use('/api', _index["default"]);
app.get("/", function (req, res) {
  res.send("Wasac Project");
});
var PORT = process.env.PORT || 4500;
app.listen(PORT, function () {
  console.log("server up and running on " + PORT);
});
//# sourceMappingURL=app.js.map