const { request, response } = require('express');


const esAdminRol = ( req = request , res = response , next ) => {
    if( !req.usuario ){
        return res.status(500).json({
            msg : 'Usuario no encontrado'
        });
    }
    const { rol , nombre } = req.usuario;
    if( req.usuario.rol !== 'ADMIN_ROLE' ){
        return res.status(401).json({
            msg : `${req.usuario.nombre} no tiene el Rol de Administrador`
        });
    }
    next();
}


const tieneRol = ( ...roles ) =>{
    return ( req = request , res = response , next) =>{
        if( !req.usuario ){
            return res.status(500).json({
                msg : 'Se requiere verificar el rol sin validar el token primero'
            });
        }

        if( !roles.includes( req.usuario.rol ) ){
            return res.status(401).json({
                msg : `El servicio requiere uno de estos roles: ${roles}`
            });
        }

        next();
    }
}

module.exports={
    esAdminRol,
    tieneRol
}