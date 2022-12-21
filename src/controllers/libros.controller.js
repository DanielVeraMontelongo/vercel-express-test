const connection = require("../database")

const getLibro = (req,res)=>{
    //código 500 --> internal server error
    let respuesta = {error: true, codigo: 500, result : []}
    let sql = ""
    let params = [req.query.id_usuario]
    if(req.query.id_libro){
        params.push(req.query.id_libro)
        sql = `SELECT * FROM libro WHERE id_usuario = ? AND id_libro = ?`
    }
    else{
        sql = `SELECT * FROM libro WHERE id_usuario = ?`
    }

    connection.query(sql,params, (err, result)=>{
        if(err){
            console.log(err);
            res.send(err)
        } else{
            respuesta.error = false;
            respuesta.codigo = result.length==0? 204 : 201;
            respuesta.result = result;
            respuesta.params = params;
            respuesta.sql = sql;
            res.send(respuesta)
        }
    })
}

const postLibro = (req,res)=>{
    //código 500 --> internal server error
    let respuesta = {error: true, codigo: 500, result : [], mensaje: 'Datos incorrectos'}
    let sql = ""
    let params = [req.body.id_usuario, req.body.titulo,req.body.tipo,req.body.autor, req.body.precio, req.body.foto]

    sql = `INSERT INTO libro (id_usuario, titulo, tipo, autor, precio, foto) VALUES (?,?,?,?,?,?);`

    
    connection.query(sql,params, (err, result)=>{
        if(err){
            console.log(err);
            res.send(respuesta)
        } else{
            respuesta.error = false;
            respuesta.codigo = 201;
            respuesta.mensaje = 'Datos correctos';
            respuesta.result = result;
            res.send(respuesta)
        }
    })
}

const putLibro = (req,res)=>{
    //Código 304 --> not modified
    let respuesta = {error: true, codigo: 304, result : []}
    let sql = ""

    let titulo  = req.body.titulo   ?  req.body.titulo : null;
    let tipo    = req.body.tipo     ?   req.body.tipo  : null;
    let autor   = req.body.autor    ?  req.body.autor  : null;
    let precio  = req.body.precio   ? req.body.precio  : null;
    let foto    = req.body.foto     ?   req.body.foto  : null;
    let id_libro = req.body.id_libro;
    let params  = [titulo,tipo,autor,precio,foto,id_libro]

    sql =  `UPDATE libro 
            SET titulo = COALESCE(?,titulo), 
            tipo = COALESCE(?,tipo), 
            autor = COALESCE(?,autor), 
            precio = COALESCE(?,precio),
            foto = COALESCE(?,foto) 
            WHERE id_libro = ?;`

    connection.query(sql, params,(err, result)=>{
        if(err){
            console.log(err);
            res.send(respuesta)
        } else{
            respuesta.error = false;
            respuesta.codigo = 200;
            respuesta.result = result;
            res.send(respuesta)
        }
    })
}

const deleteLibro = (req,res)=>{
    //Código 304 --> not modified
    let respuesta = {error: true, codigo: 500, result : []}
    let sql = ""

    let id_libro = req.body.id_libro;    

    let params = [id_libro]

    sql =  `DELETE FROM libro WHERE id_libro = ?;`

    connection.query(sql, params,(err, result)=>{
        if(err){
            console.log(err);
            res.send(respuesta)
        } else{
            respuesta.error = false;
            respuesta.codigo = 200;
            respuesta.result = result;
            res.send(respuesta)
        }
    })
}


module.exports = {postLibro, getLibro, putLibro, deleteLibro};