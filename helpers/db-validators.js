const Role = require('../models/modeloRol');
const Usuario = require('../models/modeloUsuario');

const  existeRol = async( role='' ) => {
    const existeRol = await Role.findOne( {rol : role} );
    if( !existeRol ){
        throw new Error(`El rol ${ role } no está registrado en la BD`);
    }
}

const existeCorreo = async( mail = '' ) =>{
    const existeEmail = await Usuario.findOne( { correo : mail } );
    if( existeEmail ){
        throw new Error( `El correo ${mail} ya se encuentra registrado` );
    }
}

const existeUsuarioId = async( id ) =>{
    const existeUsuario = await Usuario.findById( id ) ;
    if( !existeUsuario ){
        throw new Error( `El id ${id} no existe` );
    }
}

module.exports={
    existeRol,
    existeCorreo,
    existeUsuarioId
}