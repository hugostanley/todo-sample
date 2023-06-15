/*
 * For environment variables do
 *
 * import.meta.env
 *
 */
export const globals = {
  BACKEND_BASE_URL: "http://localhost:4000",
  BE_ENDPOINTS: {},
  FE_ENDPOINTS: {
    LOGIN: "/login",
    REGISTER: "/register"
  },
  RESPONSE_MESSAGES: {
    AUTHENTICATION: ["Failed to authenticate", "Incorrect token given", "Authorization headers not found"]
  }

}
