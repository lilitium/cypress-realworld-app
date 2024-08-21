import axios from 'axios';

export async function seedData() {
    const response = await axios.post(`http://localhost:3001/testData/seed`);
    return response.data;
};