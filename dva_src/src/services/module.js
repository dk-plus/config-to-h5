import queryString from 'query-string';
import { request, postData, putData, deleteData } from '../utils/request';

// 查询
export function getList(args) {
  let query = queryString.stringify(args);
  query = query ? `?${query}` : '';
  return request(`/module/${query}`);
}

// 查询id
export function getDetail(id) {
  return request(`/module/${id}`);
}

// 创建
export function create(args) {
  return postData('/module', args);
}

// 更新
export function update(id, args) {
  return putData(`/module/${id}`, args);
}

// 删除
export function deleteActivityModule(id) {
  return deleteData(`/module/${id}`);
}