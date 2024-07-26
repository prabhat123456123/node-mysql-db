const { authController: { signupHandler, loginHandler } } = require("../controller");
const { db } = require("../models");
const { bcryptServices: { hashPassword, comparePassword }, jwtServices: { signToken } } = require("../services");

// Mock the dependencies
jest.mock("../models");
jest.mock("../services", () => ({
    bcryptServices: {
        hashPassword: jest.fn(),
        comparePassword: jest.fn()
    },
    jwtServices: {
        signToken: jest.fn()
    }
}));

describe("User Handlers", () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: {}
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
            send: jest.fn().mockReturnThis()
        };
    });

    describe("signupHandler", () => {
        it("should return 409 if user already exists", async () => {
            req.body = { name: "test", email: "test@example.com", password: "password" };
            db.user.findOne.mockResolvedValue({ email: "test@example.com" });

            await signupHandler(req, res);

            expect(res.status).toHaveBeenCalledWith(409);
            expect(res.json).toHaveBeenCalledWith({ message: "user already registered", status: 409 });
        });

        it("should create a new user and return 201 status", async () => {
            req.body = { name: "test", email: "test@example.com", password: "password" };
            db.user.findOne.mockResolvedValue(null);
            hashPassword.mockResolvedValue("hashedPassword");
            db.user.create.mockResolvedValue({
                 name: "test",
                email: "test@example.com",
                password: "hashedPassword"
            });

            await signupHandler(req, res);

            expect(hashPassword).toHaveBeenCalledWith("password");
            expect(res.send).toHaveBeenCalledWith({ message: "user registered", status: 201 });
        });
    });

    describe("loginHandler", () => {
        it("should return 400 if user is not registered", async () => {
            req.body = { email: "test@example.com", password: "password" };
            db.user.findOne.mockResolvedValue(null);

            await loginHandler(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: "user not registered", status: 400 });
        });

        it("should return 400 if password does not match", async () => {
            req.body = { email: "test@example.com", password: "password" };
            db.user.findOne.mockResolvedValue({ email: "test@example.com", password: "hashedPassword" });
            comparePassword.mockResolvedValue(false);

            await loginHandler(req, res);

            expect(comparePassword).toHaveBeenCalledWith("password", "hashedPassword");
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: "invalid credential", status: 400 });
        });

        it("should return 200 and a token if login is successful", async () => {
            req.body = { email: "test@example.com", password: "password" };
            db.user.findOne.mockResolvedValue({ id: 1, email: "test@example.com", password: "hashedPassword", role: "user" });
            comparePassword.mockResolvedValue(true);
            signToken.mockResolvedValue("token");

            await loginHandler(req, res);

            expect(comparePassword).toHaveBeenCalledWith("password", "hashedPassword");
            expect(signToken).toHaveBeenCalledWith(1, "user");
            expect(res.send).toHaveBeenCalledWith({ message: "user logged in", status: 200, token: "token" });
        });
    });
});
