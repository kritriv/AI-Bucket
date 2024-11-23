require('dotenv').config();
const express = require('express');
const { expressLoggerMiddleware, logger } = require('../../utils/logger');
const { handleApiResponse } = require('../../modules/responseHandler');
const AppRoutes = require('../../routers/appRoute');
const AuthRoutes = require('../../routers/auth');
const { enableCors, enableHelmet } = require('./middleware');
const API_Prefix = process.env.API_Prefix || '/api';
const PORT = process.env.PORT || 3000;


// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('../../swagger-output.json');


const configureServer = (server) => {
    server.get('/', (req, res) => {
        res.send('AI Bucket Backend');
    });

    // enableCors(server);
    // enableHelmet(server);

    server.use(express.json());
    server.use(express.urlencoded({ extended: true }));
    server.use(expressLoggerMiddleware);

    server.use(`${API_Prefix}/`, AppRoutes);
    server.use(`${API_Prefix}/`, AuthRoutes);
    // server.use(`${API_Prefix}/api-docs`, swaggerUi.serve, swaggerUi.setup(swaggerDocument));


    // Error handling middleware
    server.use((err, req, res, next) => {
        logger.error(err.stack);
        if (res.headersSent) {
            return next(err);
        }
        handleApiResponse(res, 500, 'Internal Server Error');
    });
};

const HTTPServer = (HOST, PORT) => {
    const server = express();
    configureServer(server);

    const serverInstance = server.listen(PORT, HOST, () => {
        logger.info(`Server started at http://${HOST}:${PORT}`);
    });

    process.on('SIGINT', () => {
        serverInstance.close(() => {
            logger.info('Server closed');
            process.exit(0);
        });
    });
};

module.exports = { HTTPServer };
