const { userController: { getUsers, getUserById } } = require("../controller");
const { db } = require("../models");


// Mock the dependencies
jest.mock("../models");

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

    describe("getUsers", () => {
        it("should return users if found", async () => {
            const users = [{ id: 1, name: "test" }, { id: 2, name: "test2" }];
            db.user.findAll.mockResolvedValue(users);

            await getUsers(req, res);

            expect(db.user.findAll).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: "data fetched", status: 200, user: users });
        });

        it("should return an empty array if no users found", async () => {
            db.user.findAll.mockResolvedValue([]);

            await getUsers(req, res);

            expect(db.user.findAll).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: "data fetched", status: 200, user: [] });
        });
    });

    describe("getUserById", () => {
        it("should return user if found by id", async () => {
            req.body = { id: 1 };
            const user = [{ id: 1, name: "test",email:"kook@gmail.com" }];
            db.user.findOne.mockResolvedValue(user);

            await getUserById(req, res);

            expect(db.user.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: "data fetched", status: 200, user: user });
        });

        it("should return an empty array if no user found by id", async () => {
            req.body = { id: 1 };
            db.user.findOne.mockResolvedValue(null);

            await getUserById(req, res);

            expect(db.user.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: "data fetched", status: 200, user: [] });
        });
    });
});
