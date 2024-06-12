const express = require('express');
const mysql = require('mysql');
const session = require('express-session');
const app = express();
const path = require('path');
const port = 3000;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'oohboksoong2',
    database: 'todoDB',
    authSwitchHandler: function ({ pluginName, pluginData }, cb) {
        if (pluginName === 'caching_sha2_password') {
            cb(null, Buffer.from('oohboksoong2'));
        }
    }
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err.stack);
        return;
    }
    console.log('MySQL Connected...');
});

app.use(express.static(path.join(__dirname, 'file')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// 세션 설정
app.use(session({
    secret: 'your_secret_key', // 임의의 비밀 키로 변경
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // 개발 환경에서는 false로 설정, 프로덕션 환경에서는 true로 설정
}));

// 로그인 페이지 렌더링
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/file/html/todo-login.html'));
});

// 로그인 요청 처리
app.post('/login', (req, res) => {
    const { id, password } = req.body;
    const sql = 'SELECT * FROM todo_user WHERE id = ? AND password = ?';

    db.query(sql, [id, password], (err, results) => {
        if (err) {
            console.error('Error executing MySQL query:', err.stack);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
            return;
        }

        if (results.length > 0) {
            // 로그인 성공
            req.session.user = { id }; // 세션에 사용자 정보 저장
            console.log('Login successful:', results);
            res.json({ success: true, id }); // 성공 시 id 반환
        } else {
            // 로그인 실패
            console.log('Login failed: Invalid id or password');
            res.json({ success: false, message: '아이디와 비밀번호가 틀렸습니다.' });
        }
    });
});

// 회원가입
app.post('/user_create', (req, res) => {
    const { name, id, password } = req.body;
    const created = new Date(); // Get current timestamp
    const sql = 'INSERT INTO todo_user (name, id, password, created) VALUES (?, ?, ?, ?)';
    db.query(sql, [name, id, password, created], (err, result) => {
        if (err) {
            console.error('Error executing MySQL query:', err.stack);
            res.status(500).send('Error saving user');
            return;
        }
        console.log('User registration successful:', result);
        res.sendFile(__dirname + "/file/html/todo-login.html");
    });
});

// 사용자 정보를 반환하는 API
app.get('/user', (req, res) => {
    if (req.session.user) {
        res.json({ id: req.session.user.id });
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
});

app.get('/todo-login.html', function (req, res) {
    res.sendFile(__dirname + "/file/html/todo-login.html")
})

app.get('/todo-register.html', function (req, res) {
    res.sendFile(__dirname + "/file/html/todo-register.html")
})

app.get('/todo-addList.html', function (req, res) {
    res.sendFile(__dirname + "/file/html/todo-addList.html")
})

app.get('/todo-main.html', function (req, res) {
    res.sendFile(__dirname + "/file/html/todo-main.html")
})

app.get('/todo-calendar.html', function (req, res) {
    res.sendFile(__dirname + "/file/html/todo-calendar.html")
})

app.get('/todo-user.html', function (req, res) {
    res.sendFile(__dirname + "/file/html/todo-user.html")
})

// 서버 시작
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});