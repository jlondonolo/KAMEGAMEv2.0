import axios from 'axios';

const API_URL = 'http://localhost:5000/api/inventory';

export const getInventory = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching inventory:', error);
    }
};

export const removeFromInventory = async (userId, cardId) => {
    try {
        const response = await axios.delete(`${API_URL}/${userId}/${cardId}`);
        return response.data;
    } catch (error) {
        console.error('Error removing card from inventory:', error);
    }
};
