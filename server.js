require('dotenv').config();

const express = require("express");
const mysql = require("mysql2");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.static(__dirname));

const db = mysql.createConnection({
	host: "172.24.112.1",
	user: "eventuser",
	password: process.env.DB_PASSWORD,
	database: "5c8_db"
});

db.connect((err) => {
	if(err) {
		console.error("MySQL connection failed:", err);
		return;
	}
	console.log("MySQL connected successfully");
});

app.get("/", (req,res) =>{
	res.sendFile(path.join(__dirname, "register.html"));
});

app.post("/register", (req,res) => {
	const {
		first_name,
		last_name,
		email,
		phone,
		gender,
		dob,
		roll_num,
		event_name
	} = req.body;

	const sql = `INSERT INTO users(first_name, last_name, email, phone, gender, dob, roll_num, event_name) values(?, ?, ?, ?, ?, ?, ?, ?)`;

	const values = [
		first_name,
		last_name,
		email,
		phone,
		gender,
		dob,
		roll_num,
		event_name
	];

	db.query(sql, values, (err, result) => {
		if(err) {
			console.error(err);
			return res.status(500).json({
				message: "Registration failed"
			});
		}

		res.json({
			message: "Registration successful"
		});
	});

});

app.listen(3000, () => {
	console.log("Server running on port 3000");
});

