var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session'); // req 객체 안에 req.session 객체를 만듦.
var flash = require('connect-flash'); // req 객체 안에 req.flash 메서드를 추가함. 일회성 메세지를 다루는 middleware
var sassMiddleware = require('node-sass-middleware');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//모든 쿠키는 'secret code'라는 문자열로 서명됨. client-side에서의 인위적 수정 방지
app.use(cookieParser('secret code'));
app.use(session({
  resave: false, //세션의 수정 여부와 관계 없이, 항상 세션을 다시 저장하는 옵션
  saveUninitialized: false, //세션이 비어있더라도 저장하는 옵션 (방문자 추적용)

  // 쿠키를 안전하게 전송하기 위한 비밀 키(cookie parser의 secret과 같게 설정해야 함)
  secret: 'secret code', 
  cookie: { //세션 쿠키 옵션. 세션을 메모리가 아닌 DB에 저장할 경우 store 옵션 추가 필요. Redis?
    httpOnly: true, //클라이언트에서 쿠키를 확인하지 못하도록
    secure: false, //https가 아닌 환경에서도 사용할 수 있도록
  },
}));
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));
app.use(express.static(path.join(__dirname, 'node_modules/jquery/dist')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
