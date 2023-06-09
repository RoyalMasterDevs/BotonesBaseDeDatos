import express from 'express' //ECMAScript modules
import mysql from 'mysql'
import usuarioRoutes from './usuarioRoutes.js'

//Crea la app
const app = express()
//Crea las Conexiones
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "nodemysql",
})
//Conecta a BD
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("conexion lista")
})

//Crear la BD

app.get("/armateunadb", (req, res) => {
    let sql = "CREATE DATABASE nodemysql";
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send("Me arme la base de datos");
    });
})

//Crear la tabla en la DB
app.get("/armateuntable", (req, res) => {
    let sql = "CREATE TABLE posts (id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY (id))";
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send("Me arme una table llamada posts");
    });
})

//Insertar un registro en la tabla post
app.get("/insertnuevoenpost", (req, res) => {
    let post = { title: "prueba", body: "roger and over" };
    let sql = "INSERT INTO posts SET ?";
    let query = db.query(sql, post, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send("Me arme un nuevo registro");
    });
})
//Insertar un registro 2 en la tabla post
app.get("/insertnuevoenpost2", (req, res) => {
    let post = { title: "test2", body: "secuencia 2" };
    let sql = "INSERT INTO posts SET ?";
    let query = db.query(sql, post, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send("Otro registro mas a la tabla");
    });
})

//SELECCIONAR POSTS
app.get("/traetetodoslosposts", (req, res) => {
    let sql = "SELECT * FROM posts";
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send("Me traje todos los posts");
    });
});

//SELECCIONA 1 POST
app.get("/traete1Post/:id", (req, res) => {
    let sql = `SELECT * FROM nodemysql.posts WHERE id= ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send("Me traje 1 Post");
    });
});

//ACTUALIZA POST
app.get("/cambiaEstePost/:id", (req, res) => {
    let newTitle = "Cambio de titulo desde NODEJS";
    let sql = `UPDATE posts SET title= '${newTitle}' WHERE id=${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send("Cambie este Post");
    });
});

//BORRA POST
app.get("/borraEstePost/:id", (req, res) => {
    let sql = `DELETE FROM posts WHERE id=${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send("POST BORRADO");
    });
});
//Routing
app.use('/', usuarioRoutes);

//Define un puerto y arranca el proyecto
const port = 3000;

app.listen(port, () => {
    console.log(`El Servidor esta funcionando en el puerto ${port}`)
});
