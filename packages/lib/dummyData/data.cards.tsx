import { CardProps } from "@cllgnotes/types";

export const dummyCardsData: (data?: Partial<CardProps>) => CardProps[] = (
  data
) => [
  {
    img: {
      src: "https://picsum.photos/300/200",
      alt: "Card img",
      fill: true,
    },
    department: "engineering".toUpperCase(),
    course: "b.tech".toUpperCase(),
    semester: 2,
    subject: "DSA",
    topic: "Dynamic Programming",
    univ: "IIT Delhi",
    ...(data || {}),
  },
  {
    img: {
      src: "https://picsum.photos/300/200",
      alt: "Card img",
      fill: true,
    },
    department: "engineering".toUpperCase(),
    course: "b.tech".toUpperCase(),
    semester: 2,
    subject: "DSA",
    topic: "Dynamic Programming",
    univ: "IIT Delhi",
    ...(data || {}),
  },
  {
    img: {
      src: "https://picsum.photos/300/200",
      alt: "Card img",
      fill: true,
    },
    department: "engineering".toUpperCase(),
    course: "b.tech".toUpperCase(),
    semester: 2,
    subject: "DSA",
    topic: "Dynamic Programming",
    univ: "IIT Delhi",
    ...(data || {}),
  },
  {
    img: {
      src: "https://picsum.photos/300/200",
      alt: "Card img",
      fill: true,
    },
    department: "engineering".toUpperCase(),
    course: "b.tech".toUpperCase(),
    semester: 2,
    subject: "DSA",
    topic: "Dynamic Programming",
    univ: "IIT Delhi",
    ...(data || {}),
  },
  {
    img: {
      src: "https://picsum.photos/300/200",
      alt: "Card img",
      fill: true,
    },
    department: "engineering".toUpperCase(),
    course: "b.tech".toUpperCase(),
    semester: 2,
    subject: "DSA",
    topic: "Dynamic Programming",
    univ: "IIT Delhi",
    ...(data || {}),
  },
  {
    img: {
      src: "https://picsum.photos/300/200",
      alt: "Card img",
      fill: true,
    },
    department: "engineering".toUpperCase(),
    course: "b.tech".toUpperCase(),
    semester: 2,
    subject: "DSA",
    topic: "Dynamic Programming",
    univ: "IIT Delhi",
    ...(data || {}),
  },
  {
    img: {
      src: "https://picsum.photos/300/200",
      alt: "Card img",
      fill: true,
    },
    department: "engineering".toUpperCase(),
    course: "b.tech".toUpperCase(),
    semester: 2,
    subject: "DSA",
    topic: "Dynamic Programming",
    univ: "IIT Delhi",
    ...(data || {}),
  },
];
