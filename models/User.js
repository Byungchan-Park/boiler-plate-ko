const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true, // 스페이스를 없애주는 역할
    unique: 1,
  },
  password: {
    type: String,
    minlength: 5,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  // 토큰 이용해서 유효성 관리
  tokenExp: {
    type: Number,
  },
  // 토큰 유효 기간
});

const User = mongoose.model("User", userSchema);
// 스키마를 모델로 감싸준다.

module.exports = { User };
// 다른 곳에서도 쓸 수 있도록 하기 위해
