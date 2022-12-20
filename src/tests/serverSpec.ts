import supertest from "supertest";
import app from "../server";

const request = supertest(app);

describe ('Test endpoint server',()=>{
    it('Get the / endpoint', async()=>{
        const response = await request.get('/');
        expect(response.status).toBe(200);
    })
})