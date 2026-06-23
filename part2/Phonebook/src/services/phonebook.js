import axios from "axios";
const URL = '/api/persons/';

const getAll = () => {
  return axios.get(URL).then(response => response.data);
}

const create = (newObject) => {
  return axios.post(URL, newObject).then(response => response.data);
}

const update = (id, newObject) => {
  return axios.put(`${URL}${id}`, newObject).then(response => response.data);
}

const remove = (id) => {
  return axios.delete(`${URL}${id}`).then(response => response.data);
}

export default {
  getAll,
  create,
  update,
  remove
}