export enum HeightSearchBar {
  small = 50,
  medium = 60,
  large = 90,
}
export type SearchBarProps = { maxWidth?: number; exploreBtn?: boolean } & (
  | {
      height: 90 | 60;
      options: string[];
    }
  | {
      height: 50;
      options?: undefined;
    }
);
