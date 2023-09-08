export type ImgProps = {
  src: string;
  alt: string;
  style?: React.CSSProperties;
  priority?: boolean;
} & (
  | { fill: true; width?: undefined; height?: undefined }
  | { fill?: false | undefined; width: number; height: number }
);
