const express = require('express');

const mysql=require("mysql");
const app = express()
app.use("/css", express.static(__dirname + "/css"));
app.use("/js", express.static(__dirname + "/js"));
app.use("/img", express.static(__dirname + "/img"));

let conexion=mysql.createConnection({
    host:"localhost",
    database:"portafolio",
    user:"root",
    password:""
})
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/index.html");
})

app.post("/validar", function(req, res){
  const datos =req.body;
  console.log(datos);
  let nombre=datos.nombre;
  let email=datos.email;
  let mensaje=datos.mensaje;


  let registrar="INSERT INTO informacion (nombre, email, mensaje) VALUES ('"+nombre+"','"+email+"','"+mensaje+"')";
  conexion.query(registrar, function(error){
    if (error) {
      throw error;
    }else{
      //console.log("Datos enviados corectamente");
      res.send(`
        <script>
          alert("Datos enviados correctamente");
          window.location.href="/";
        </script>
        `);
    }
  });
});

app.listen(3000, () => {
  console.log("Servidor creado en Localhost");
})