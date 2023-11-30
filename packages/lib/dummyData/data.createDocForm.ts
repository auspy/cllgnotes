export const dummyDepartments = [
  "Engineering",
  "Law",
  "Hotel Management",
  "Management",
  "Science & Humanities",
  "Finance & Commerce",
];

export const dummyCourses = {
  Engineering: {
    "Chemical Engineering": {
      "1": {
        Chemistry: {
          code: "CHY101",
          units: {
            "unit name": [
              "Atomic Structure",
              "Chemical Bonding",
              "Periodic Properties",
              "Chemical Equilibrium",
              "Acids and Bases",
              "Chemical Kinetics",
              "Electrochemistry",
              "Nuclear Chemistry",
            ],
            unit2: ["Atomic Structure", "Chemical Bonding"],
          },
        },
      },
    },
    "Civil Engineering": {},
    "Biomedical Engineering": {},
    "Computer Science & Engineering": {
      "4": {
        "Theory of Computation": {
          code: "21CS2004/CS2004",
          units: {},
        },
        "Analysis and Design of Algorithms": {
          code: "21CS2008",
          units: {},
        },
      },
      "6": {
        Microservices: {
          code: "CCM3008",
          units: {},
        },
        "Neural Network and Fuzzy Logic": {
          code: "CS3030",
          units: {},
        },
        "Artificial Intelligence": {
          code: "CCM3002",
          units: {},
        },
      },
    },
    "Electrical & Electronics Engineering": {},
    "Electronics & Communication Engineering": {},
    "Mechanical Engineering": {},
  },
  // "Law":{},
  // "Hotel Management":{},
  // "Management":{},
  // "Science & Humanities":{},
  // "Finance & Commerce":{},
};
// type universityType = "SRM University" | "VIT University" | "Anna University";
// type courseType = "B.Tech" | "B.E" | "B.Sc" | "B.A" | "B.Com";
// const dummyData = {
//   department: {
//     course: {
//       year: {
//         university: {},
//       },
//     },
//   },
// };
