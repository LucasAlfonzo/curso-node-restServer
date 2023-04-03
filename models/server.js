const express = require('express');
const cors = require('cors');
const app = require('express');
const { application } = require('express');
const { dbConnection } = require('../database/config');

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        //CONECCION A LA BASE DE DATOS
        this.conectarDB();

        //MIDDLEWARES
        this.middlewares();

        //RUTAS DE MI APLICACION
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){

        

        //CORS
        this.app.use( cors() );

        //LECTURA Y PARSEO DEL BODY
        this.app.use( express.json() );


        //Directorio Publico
        this.app.use( express.static('Public') );
    }

    routes(){
        //ENDPOINTS
        this.app.use('/api/usuarios' , require('../routes/usuarios') );
    }

    listen(){
        this.app.listen( this.port , () => {
            console.log('Servidor corriendo en el puerto: ', this.port);
        });
    }





}




module.exports = Server;