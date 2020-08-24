const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

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

userSchema.pre("save", function (next) {
  //index.js 의 save를 하기 전에, function을 하면서 암호화 시킨다.
  var user = this;
  // this는 이때 위의 userSchema를 가리킨다.

  if (user.isModified("password")) {
    // 비밀번호가 변경되었을 경우에만 비밀번호를 암호화시킨다.
    // ---- 비밀번호 암호화 과정 ----
    bcrypt.genSalt(saltRounds, function (err, salt) {
      //이때 salt를 이용해서 비밀번호를 암호화한다. 그 전에 salt를 먼저생성해야함.
      //saltround는 salt가 몇글자인지임
      //genSalt: salt를 만든다.
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        // 내가 입력한 비밀번호를 해쉬된 비밀번호로 바꿔준다.
        next();
        // 비밀번호 암호화 이후 그 다음 단계(Mongo DB에 유저 데이터를 저장)로 넘어간다.
      });
      // user.password : 내가 입력한 비밀번호
    });
  } else {
    next();
  }
});
// user 정보를 저장하기 전에 무언가를 한다.

const User = mongoose.model("User", userSchema);
// 스키마를 모델로 감싸준다.

module.exports = { User };
// 다른 곳에서도 쓸 수 있도록 하기 위해
