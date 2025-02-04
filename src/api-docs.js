import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            version: "1.0.0",
            title: "Docu API",
            description: "API Documentation for use",
        },
        servers: [
            {
                url: "http://localhost:3001",
                description: "Local development server",
                schemas: ["https", "http"]
            },
        ],
    },
    apis: ["src/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
export default swaggerSpec;
