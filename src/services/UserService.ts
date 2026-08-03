import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export default {
  getUsers(perPage: number, page: number) {
    return apiClient.get('/users?_limit=' + perPage + '&_page=' + page)
  },
  getUser(id: number) {
    return apiClient.get('/users/' + id)
  },
}