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
  getPostsByUser(userId: number) {
    return apiClient.get('/posts?userId=' + userId)
  },
}