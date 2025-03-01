import axios from 'axios';

const API_URL = 'http://localhost:5000/api/duel';

export const startDuel = async (userId, cardId) => {
    try {
        const response = await axios.post(`${API_URL}/start`, { userId, cardId });
        return response.data;
    } catch (error) {
        console.error('Error starting duel:', error);
    }
};
