export type ImgProps = {
  src: string;
  alt: string;
  style?: React.CSSProperties;
  priority?: boolean;
} & (
  | { fill: boolean; width?: number; height?: number }
  | { fill?: boolean; width: number; height: number }
);
