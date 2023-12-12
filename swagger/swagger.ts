const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "ArtistGrow API Documentation",
      version: "1.0.0",
      description: "API documentation for ArtistGrow application",
      license: {
        name: "Licensed Under MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Jeanne d'Arc NYIRAMWIZA",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
  },
  apis: ["./src/controllers/*.ts"],
};

export default swaggerOptions;
