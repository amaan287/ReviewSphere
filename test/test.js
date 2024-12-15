const axios = require('axios');
const BACKEND_URL = "http://localhost:3000";

describe('Authentication', () => {
    test('User is able to signup', async () => {
        const name = "John Doe";
        const email = `john.doe.${Math.floor(Math.random() * 100000)}@example.com`;
        const password = "12345678";
        const response = await axios.post(`${BACKEND_URL}/api/v1/auth/register`, { name, email, password });
        expect(response.status).toBe(200);
    });
    test("user is able to signin", async () => {
        const name = "user2";
        const email = `john.doe.${Math.floor(Math.random() * 100000)}@example.com`;
        const password = "12345678";
        await axios.post(`${BACKEND_URL}/api/v1/auth/register`, { name, email, password });
        const response = await axios.post(`${BACKEND_URL}/api/v1/auth/signin`, { email, password });
        expect(response.status).toBe(200);
    })
});