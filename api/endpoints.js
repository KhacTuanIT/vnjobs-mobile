const DOMAIN = 'http://api.vnjobs.tk';
// const DOMAIN = 'http://localhost:8000' // Localhost Only | NOT USING FOR PRODUCTION !!
const VERSION_API = '/api/v1/';
const API = DOMAIN+VERSION_API;

export const LOGIN = API+'auth/login';
export const REGISTER = API+'auth/register';
export const CHECK_VALID_TOKEN = API+'is-valid-token';
export const GET_USER = API+'user';
