const DOMAIN = 'http://api.vnjobs.tk';
// const DOMAIN = 'http://127.0.0.1:8000' // Localhost Only | NOT USING FOR PRODUCTION !!
const VERSION_API = '/api/v1/';
const API = DOMAIN+VERSION_API;

export const LOGIN = API+'auth/login';
export const REGISTER = API+'auth/register';
export const CHECK_VALID_TOKEN = API+'is-valid-token';
export const USER = API+'user';

/**
 * Home page
 */
export const LIST_ORGANIZATION = API + '/organizations'
export const LIST_RECRUITMENT_NEWS = API + '/recruitment-news'
export const LIST_MAJOR = API + '/majors'