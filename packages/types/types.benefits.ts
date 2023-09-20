export type BenefitItemProps = {
  title: string;
  desc: string;
  isRight?: boolean;
  style?: React.CSSProperties;
};

export type BenefitsProps = {
  data: BenefitItemProps[];
};
