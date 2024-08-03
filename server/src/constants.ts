export const DB_NAME: string = 'crypto'

export const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Library API",
      version: '1.0.0',
    },
  },
  apis: ['./routes/*.ts'],
};


