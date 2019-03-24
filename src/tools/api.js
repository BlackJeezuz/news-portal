import axios from 'axios'

const api = axios.create({
  baseURL: 'https://mateacademy-react-server.herokuapp.com/api/v1'
})

export default api
