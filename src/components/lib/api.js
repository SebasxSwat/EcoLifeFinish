import axios from 'axios';

const API_URL = 'http://127.0.0.1:8080/';

export async function postData(endpoint, data) {
  try {
    const response = await axios.post(`${API_URL}${endpoint}`, data);
    return response.data;
  } catch (error) {
    console.error('Error en la solicitud:', error);
    return { success: false, message: error.response?.data?.message || 'Error desconocido' };
  }
}


export async function fetchData(url) {
  try {
    const response = await axios.get(`http://127.0.0.1:8080/${url}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return { success: false, message: 'Error fetching data' };
  }
}

export async function updateUser(id, data) {
  try {
    const response = await axios.put(`${API_URL}/user/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    return { success: false, message: error.response?.data?.message || 'Error desconocido' };
  }
}



