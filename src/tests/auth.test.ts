import supertest from "supertest";
import App from "../app";
import prisma from "../prisma";
const app = new App().app;

describe("TEST AUTH", () => {
    beforeEach(() => {
        // Menyiapkan program yang ingin dijalankan terlebih dahulu sebelum running test
    });

    beforeAll(async () => {
        // Menyiapkan program yang sekali dijalankan sebelum semua test dijalankan
        await prisma.$connect();
    });

    afterEach(() => {

    });

    afterAll(async () => {
        await prisma.$disconnect();
    });

    it("POST /auth/regis", async () => {
        const regisResult = await supertest(app).post("/auth/regis").send({
            username: "lisobeg151",
            email: "lisobeg151@wentcity.com",
            password: "lisobeg151"
        })

        expect(regisResult.status).toBe(201);
        expect(regisResult.body.success).toBeTruthy();
    });
});