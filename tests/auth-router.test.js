const request = require("supertest");

const server = require("../api/server");
const db = require("../database/dbConfig");

describe("Auth Router Tests", () => {
    beforeEach(async () => {
        await db('users').truncate();
    });

    describe("POST /register", () => {
        it("returns 201 status code", async () => {
            const user = {
                username: "test",
                password: "test"
            };

            const res = await request(server)
                .post("/api/auth/register")
                .send(user)
            await expect(res.status).toBe(201);
        });

        it("returns the created user from database", async () => {
            const user = {
                username: "test",
                password: "test"
            }

            const [ id ] = await db('users')
                .insert(user);
            
            const newUser = await db('users').where({ id }).first();
            await expect(newUser.username).toBe("test");
            await expect(newUser.id).toBeDefined();
        });
    });

    describe("POST /login", () => {
        it("returns 201 status code", async () => {

        });
    });

});