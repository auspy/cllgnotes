import { CardProps } from "@cllgnotes/types";
import { defaultImg } from "../constants";

export const dummyCardsData: (
  data?: Partial<CardProps>
) => Partial<CardProps>[] = (data) => [
  {
    img: defaultImg,
    department: "engineering".toUpperCase(),
    course: "b.tech".toUpperCase(),
    year: 2,
    semester: 3,
    _id: "123",
    subject: "DSA",
    univ: "IIT Delhi",
    ...(data || {}),
  },
  {
    img: defaultImg,
    department: "engineering".toUpperCase(),
    course: "b.tech".toUpperCase(),
    year: 2,
    subject: "DSA",
    univ: "IIT Delhi",
    ...(data || {}),
  },
  {
    img: defaultImg,
    department: "engineering".toUpperCase(),
    course: "b.tech".toUpperCase(),
    year: 2,
    subject: "DSA",
    univ: "IIT Delhi",
    ...(data || {}),
  },
  {
    img: defaultImg,
    department: "engineering".toUpperCase(),
    course: "b.tech".toUpperCase(),
    year: 2,
    subject: "DSA",
    univ: "IIT Delhi",
    ...(data || {}),
  },
  {
    img: defaultImg,
    department: "engineering".toUpperCase(),
    course: "b.tech".toUpperCase(),
    year: 2,
    subject: "DSA",
    univ: "IIT Delhi",
    ...(data || {}),
  },
  {
    img: defaultImg,
    department: "engineering".toUpperCase(),
    course: "b.tech".toUpperCase(),
    year: 2,
    subject: "DSA",
    univ: "IIT Delhi",
    ...(data || {}),
  },
  {
    img: defaultImg,
    department: "engineering".toUpperCase(),
    course: "b.tech".toUpperCase(),
    year: 2,
    subject: "DSA",
    univ: "IIT Delhi",
    ...(data || {}),
  },
];
