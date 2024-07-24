// Clase 7 - Express avanzado

// Temas
// Codigos de estado HTTP
// ¿Qué es una API?
// API Rest
// Metodos de la petición
// Postman
// Practicas

const express = require('express')
const app = express();
const PUERTO = 8080;

// Middleware
app.use(express.json());
//Permite que el servidor interprete el formato JSON


// Datos

const clientes = [
    {id:"1", nombre: "Jorge", Apellido:"Cafrune"},
    {id:"2", nombre: "Roberto", Apellido:"Leto"},
    {id:"3", nombre: "Edivaldo", Apellido:"Pininho Soares"}
];

// Metodo GET: Permite obtener recursos

app.get("/clientes", (req, res)=>{
    res.send(clientes);
});

// Metodo GET con id

app.get("/clientes/:id", (req,res) =>{
    let {id} = req.params;
    let clienteBuscado = clientes.find(cliente => cliente.id === id);

    if(clienteBuscado) {
        return res.send(clienteBuscado)
    } else {
        return res.send(`El id ${id} no corresponde a ningún cliente`)
    }
});

//Metodo DELETE

app.delete("/clientes/:id",(req,res)=>{
    const {id} = req.params
    let clienteIndex = clientes.findIndex(cliente => cliente.id === id);

    if(clienteIndex){
        clientes.splice(clienteIndex,1);
        console.log(clientes);

        res.send('cliente eliminado en base al estatuto de conchola');
    } else {
        res.send('no hay un cliente con ese ID')
    }
})


// Metodo post

app.post("/clientes", (req,res)=>{
    const clienteNuevo = req.body;
    clientes.push(clienteNuevo);
    console.log(clientes)
    res.send('Cliente creado')
})

// Metodo PUT

app.put("/clientes/:id",(req,res)=>{
    const {id} = req.params;
    const {nombre, Apellido} = req.body;

    let clienteIndex = clientes.findIndex(cliente => cliente.id === id)

    if (clienteIndex != -1) {
        clientes[clienteIndex].nombre = nombre;
        clientes[clienteIndex].Apellido = Apellido;
        console.log(clientes);
        console.log('deja e jode con la publicida')

        res.send('Cliente actualizado');
    } else {
        res.status(404).send({status:'error',mensaje:'cliente no encontrado'});
    }
})

// Listener
app.listen(PUERTO, ()=>{
    console.log(`Escuchando en el http://localhost:${PUERTO}`)
})