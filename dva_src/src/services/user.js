import { postData } from '../utils/request';

export function register(args) {
  return postData('/register', args);
}

export function login(args) {
  return postData('/login', args);
}

export function logout(args) {
  return postData('/logout', args);
}