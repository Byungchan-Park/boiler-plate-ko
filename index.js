const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
// bodyParser가 client로부터 오는 정보를 받아준다.

const config = require("./config/key");

const { User } = require("./models/User");

// body-parser의 옵션 설정
app.use(bodyParser.urlencoded({ extended: true }));
// application/x-www-form-urlencoded 이렇게 된 데이터를 분석해서 가져올 수 있게 해준다.
app.use(bodyParser.json());
// application/json 이렇게 된 데이터를 분석해서 가져올 수 있게 해준다.

const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB connected!!!"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World! 새해 복 많이 받으세요!!!");
});

app.post("/register", (req, res) => {
  // 회원가입할 때 필요한 정보들을 client에서 가져오면
  // 그것들을 데이터 베이스에 넣어준다.
  const user = new User(req.body);
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      // status : 200은 성공 상태이다.
      success: true,
    });
    // 만약에 성공을 하면 success : true가 뜨게 해줘라.
  });
  // user 정보가 Mongo DB에 저장된다.
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
