const students = require("./students.json");

students.forEach((student) => {
  console.log(`Hello ${student.firstName} ${student.lastName}`);
});

const filteredStudents = students.filter(
  (student) => student.lastName[0].toLowerCase() === "d"
);
console.log(
  `Count of last names starting with D is ${filteredStudents.length}`
);

const studentEmails = students.map((student) =>
  `${student.firstName}${student.lastName}@algonquinlive.com`.toLowerCase()
);

console.log(studentEmails);
