const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "crud_contact",
});
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get", (req, res) => {
  const sqlGet = "Select * from  contact_db";
  db.query(sqlGet, (error, result) => {
    res.send(result);
  });
});
app.post("/api/post", (req, res) => {
  const { name, email, contact } = req.body;
  const sqlInsert = "Insert INTO contact_db(name,email,contact) Values(?,?,?)";
  db.query(sqlInsert, [name, email, contact], (error, result) => {
    if (error) {
      console.log(error);
    }
  });
});
app.delete("/api/remove/:id", (req, res) => {
  const { id } = req.params;
  const sqlRemove = "Delete From  contact_db where id = ?";
  db.query(sqlRemove, id, (error, result) => {
    if (error) {
      console.log(error);
    }
  });
});
app.get("/api/get/:id", (req, res) => {
  const { id } = req.params;
  const sqlGet = "Select * from  contact_db where id = ?";
  db.query(sqlGet, id, (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
  });
});
app.put("/api/update/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, contact } = req.body;
  const sqlupdate =
    "UPDATE contact_db  SET name = ?,email = ?, contact = ? where id = ?";
  db.query(sqlupdate, [name, email, contact, id], (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
  });
});
app.get("/", (req, res) => {
  // const sqlInsert =
  //   "Insert INTO contact_db(name,email,contact) Values('sai ','saitej@gmail.com',9553655056)";
  // db.query(sqlInsert, (error, result) => {
  //   console.log("error", error);
  //   console.log("result", result);
  //   res.send("Hello Express");
  // });
});
app.listen(5000, () => {
  console.log("Server running ...");
});
