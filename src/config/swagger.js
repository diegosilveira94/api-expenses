export default {
  openapi: "3.0.0",
  info: {
    title: "Personal Expenses",
    version: "1.0.0",
  },
  servers: [{ url: "http://localhost:3000/api" }],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [{ bearerAuth: [] }],
  paths: {
    "auth/login": {
      post: {
        summary: "Login",
        security: [],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: { type: "string" },
                  password: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          200: { descripton: "Token JWT" },
          401: { description: "Invalid" },
        },
      },
    },
    "/expenses": {
      get: {
        summary: "List the authenticated user's expenses (supports filters)",
        responses: { 200: { description: "List of expenses" } },
      },
    },
  },
};
