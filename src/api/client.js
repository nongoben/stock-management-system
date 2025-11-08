import ky from "ky";

// Create a Ky instance with default configuration
const apiClient = ky.create({
  prefixUrl: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api",
  timeout: 30000, // 30 seconds
  retry: {
    limit: 2,
    methods: ["get", "put", "head", "delete", "options", "trace"],
    statusCodes: [408, 413, 429, 500, 502, 503, 504],
  },
  hooks: {
    beforeRequest: [
      (request) => {
        // Add authorization token if available
        const token = localStorage.getItem("auth_token");
        if (token) {
          request.headers.set("Authorization", `Bearer ${token}`);
        }

        // Add any other default headers
        request.headers.set("Content-Type", "application/json");
      },
    ],
    afterResponse: [
      async (request, options, response) => {
        // Handle successful responses
        if (response.ok) {
          return response;
        }

        // Handle errors
        if (response.status === 401) {
          // Handle unauthorized - clear token and redirect to login
          localStorage.removeItem("auth_token");
          // window.location.href = '/login';
        }

        return response;
      },
    ],
    beforeError: [
      (error) => {
        const { response } = error;
        if (response && response.body) {
          // Enhance error with response data
          error.message = `${response.status} - ${response.statusText}`;
        }
        return error;
      },
    ],
  },
});

export default apiClient;
