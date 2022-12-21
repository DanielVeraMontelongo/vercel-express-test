const connection = require("../database")

const postRegistro = (req,res)=>{
    //código 500 --> internal server error
    let respuesta = {error: true, codigo: 500, result : []}
    let sql = ""
    let params = [req.body.nombre, req.body.apellidos, req.body.correo, req.body.foto, req.body.password]

    sql = `INSERT INTO usuario (nombre, apellidos, correo, foto, password) 
            VALUES (?, ?, ?, ?, ?);`
    
    
    connection.query(sql,params, (err, result)=>{
        if(err){
            console.log(err);
            res.send(respuesta)
        } else{
            respuesta.error = false;
            respuesta.codigo = 201;
            respuesta.result = result;
            res.send(respuesta)
        }
    })
}

const postLogin = (req,res)=>{
    //código 500 --> internal server error
    let respuesta = {error: true, codigo: 500, result : [], mensaje: 'Datos incorrectos'}
    let sql = ""
    let params = [req.body.correo, req.body.password]

    sql = `SELECT id_usuario, nombre, apellidos, correo, foto FROM usuario 
            WHERE correo = ? AND password = ?;`

    
    connection.query(sql,params, (err, result)=>{
        if(err){
            console.log(err);
            res.send(respuesta)
        } else{
            respuesta.error = false;
            respuesta.codigo = result.length == 0? 204 : 200;
            respuesta.mensaje = result.length == 0? 'No hay datos': 'Datos correctos';
            respuesta.result = result;
            res.send(respuesta)
        }
    })
}


module.exports = {postRegistro, postLogin};