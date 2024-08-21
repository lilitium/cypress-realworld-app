import axios from 'axios';

export async function fetchDataFromDatabase(entity: string) {
    const response = await axios.get(`http://localhost:3001/testData/${entity}`);
    return response.data.results;
};