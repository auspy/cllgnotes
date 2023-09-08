export type BenefitItemProps = {
  title: string;
  desc: string;
  isRight?: boolean;
};

export type BenefitsProps = {
  data: BenefitItemProps[];
};
