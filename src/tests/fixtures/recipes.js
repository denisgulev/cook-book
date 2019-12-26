import moment from "moment";

export default [
  {
    id: "1",
    title: "Ricetta in selector test",
    description: "How to do in selector test",
    note: "",
    createdAt: 0
  },
  {
    id: "2",
    title: "Ricetta in selector test",
    description: "RENT",
    note: "",
    createdAt: moment(0)
      .subtract(4, "days")
      .valueOf()
  },
  {
    id: "3",
    title: "Prova",
    description: "PC",
    note: "",
    createdAt: moment(0)
      .add(4, "days")
      .valueOf()
  }
];
