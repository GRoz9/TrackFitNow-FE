/**
 * An array of routes that are accessible to public
 * These routes don't require authentication
 * @type {string[]}
 */
export const publicRoutes = ["/"];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /dashboard
 * @type {string[]}
 */
export const authRoutes = ["/auth/register", "/auth/login"];

/**
 * An array of protected routes that require authentication
 * @type {string[]}
 */
export const protectedRoutes = ["/dashboard"];

/**
 * An array of restricted routes that should not be accessible once logged in
 * @type {string[]}
 */
export const restrictedRoutes = ["/auth/profile-setup"];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/dashboard";
