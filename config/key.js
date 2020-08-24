if (process.env.NODE_ENV === "production") {
  module.exports = require("./prod");
} else {
  module.exports = require("./dev");
}
// mongoURI를 가져올 때  개발 모드일 때와 배포 모드일 때를 각각 분기처리해야 함.
