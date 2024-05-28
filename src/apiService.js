import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:5238/api', // Your API base URL
    headers: {
        'Content-Type': 'application/json',
    },
});

export default {
    
    getOilTanks() {
        return apiClient.get('/OilTank');
    },
    
    getOilTank(id) {
        return apiClient.get(`/OilTank/${id}`);
    },
    
    createOilTank(data) {
        return apiClient.post('/OilTank', data);
    },
   
    updateOilTank(id, data) {
        return apiClient.put(`/OilTank/${id}`, data);
    },
   
    deleteOilTank(id) {
        return apiClient.delete(`/OilTank/${id}`);
    },
};