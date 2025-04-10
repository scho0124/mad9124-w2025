require("dotenv").config();
const { ObjectId } = require("mongodb");
const Student = require("../models/Student");
const StudentService = require("./student");
const { NotFoundError } = require("../middleware/errors");
jest.mock("../models/student");
jest.mock("./images");
describe("StudentService", () => {
  describe("#getAll", () => {
    it("should return values from Student.find", async () => {
      //Arrange
      const EXPECTED = [
        {
          _id: new ObjectId(),
          firstName: "Ryan",
          lastName: "Schock",
          owner: {
            _id: new ObjectId(),
            name: "Ryan",
          },
          images: [],
        },
      ];
      Student.find.mockResolvedValue(EXPECTED);
      //Act
      const result = await StudentService.getAll();
      //Assert
      expect(result).toEqual(EXPECTED);
      expect(Student.find.mock.calls.length).toBe(1);
    });
  });
  describe("#getOne", () => {
    it("should return values from Student.findById", async () => {
      //Arrange

      const _id = new ObjectId();
      const EXPECTED = [
        {
          _id,
          firstName: "Ryan",
          lastName: "Schock",
          owner: {
            _id: new ObjectId(),
            name: "Ryan",
          },
          images: [],
        },
      ];
      Student.findById.mockResolvedValue(EXPECTED);
      //Act
      const result = await StudentService.getById(_id.toString());
      //Assert
      expect(result).toEqual(EXPECTED);
      expect(Student.findById.mock.calls.length).toBe(1);
      expect(Student.findById).toBeCalledWith(_id.toString());
    });
    it("should  throw error if not found", async () => {
      // Arrange
      const id = new ObjectId().toString();
      Student.findById.mockResolvedValue(null);
      // Act
      // Assert
      await expect(StudentService.getById(id)).rejects.toThrow(
        new NotFoundError(`student with id ${id} not found`)
      );
    });
  });
});
