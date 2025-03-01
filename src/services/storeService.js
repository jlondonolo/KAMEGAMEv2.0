import axios from 'axios';

const API_URL = 'http://localhost:5000/api/store';

export const getCards = async () => {
    try {
        const response = await axios.get(`${API_URL}/cards`);
        return response.data;
    } catch (error) {
        console.error('Error fetching cards:', error);
    }
};

export const buyCard = async (userId, cardId) => {
    try {
        const response = await axios.post(`${API_URL}/buy`, { userId, cardId });
        return response.data;
    } catch (error) {
        console.error('Error buying card:', error);
    }
};
