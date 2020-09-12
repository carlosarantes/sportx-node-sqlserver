const express  = require('express');
const cors     = require('cors');

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const app = express();

const swaggerOptions = {
    swaggerDefinition : {
        info: {
            title : "SportX",
            version: "2.0.0",
            description: "Sport store",
            contact: {
                name : "Carlos Augusto",
                email: "carl.systemsbr@gmail.com"
            },
            servers: [ "http://localhost:3000" ]
        },
        securityDefinitions : {
            tokenauth:{
                type: "apiKey",
                name: "Authorization",
                in: "header"
            }
        }
    },
    apis : [ "./src/routes.js", "./src/definitions.js" ]
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Iniciaando o app
app.use(express.json());

// Habilitando o CORS
app.use(cors());
app.use('/api', require('./src/routes'));

app.listen(3333);