import { ImgProps } from "./types.img";

export type TestiUser = {
  img: ImgProps;
  name: string;
  username: string;
  onCard?: boolean;
};
export type TestiItemProps = {
  user: TestiUser;
  text: string;
};
export type TestiCardProps = TestiItemProps & {
  date: string;
  likes: number;
  reposts: number;
};
export type TestimonialProps = {
  data: TestiItemProps[];
};

export type TestimonialCardsProps = {
  data: TestiCardProps[];
};
