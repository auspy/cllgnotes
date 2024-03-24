export enum HeightSearchBar {
  small = 50,
  medium = 60,
  large = 90,
}
export type SearchBarProps = {
  maxWidth?: number;
  exploreBtn?: boolean;
  placeholder?: string;
  height: 90 | 60 | 50 | 40;
  options?: string[];
};
