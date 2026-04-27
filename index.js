const express = require('express')
const app = express()
const fs = require('fs')

// Lectura de datos con filtrado
Datos = (JSON.parse(fs.readFileSync("trabajadores.json", "utf8")))
Datos.forEach(dato => {
    console.log(`${dato.rut} - ${dato.Nombre}`)    
})

// Uso de EXPRESS y NODE
app.listen(3000, console.log('Servidor iniciado'))
app.use(express.json())

app.get("/trabajadores", (req, res) => {
    datos = JSON.parse(fs.readFileSync('trabajadores.json'))
    res.json(datos)
    res.send('Mostrando datos de trabajadores')
})

app.get("/productos/:id", (req, res) => {
const { id } = req.params
const data = JSON.parse(fs.readFileSync("trabajadores.json")) 
const trabajador = data.find (p => p.id == id);
res.json(trabajador)
});

app.post("/trabajadores", (req, res) =>{
    dato = req.body
    datos = JSON.parse(fs.readFileSync("trabajadores.json"))
    datos.push(dato)
    fs.writeFileSync("trabajadores.json", JSON.stringify(datos))
    res.send('Se ha agregado un nuevo trabajador al registro')
})

app.put("/trabajadores/:rut", (req, res) =>{
    const { rut } = req.params
    dato = req.body
    datos = JSON.parse(fs.readFileSync('trabajadores.json'))
    index = datos.findIndex(t => t.rut == rut)
    datos[index] = dato
    fs.writeFileSync('trabajadores.json', JSON.stringify(datos))
    res.send(`Se ha actualizado el trabajador con el rut ${rut}`)
})

app.delete("/trabajadores/:rut", (req, res) =>{
    const {rut} = req.params
    datos = JSON.parse(fs.readFileSync('trabajadores.json'))
    index = datos.findIndex(t => t.rut == rut)
    datos.splice(index, 1)
    fs.writeFileSync('trabajadores.json', JSON.stringify(datos))
    res.send('Se elimino un trabajador del registro')
})
