import moment from "moment";

// mock recipes
export default [
  {
    id: "1",
    title: "Prima",
    description: "How to do",
    createdAt: 0
  },
  {
    id: "2",
    title: "Seconda",
    description: "How to do cseonc",
    createdAt: moment(0)
      .subtract(4, "days")
      .valueOf()
  },
  {
    id: "3",
    title: "Terza",
    description: "How to do trhid",
    createdAt: moment(0)
      .add(4, "days")
      .valueOf()
  },
  {
    id: "4",
    title: "Quarta",
    description: "How to do fuor",
    createdAt: moment(0)
      .add(2, "months")
      .valueOf()
  }
];
