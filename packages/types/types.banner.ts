export enum BannerFontSizeEnum {
  h1e = "h1e",
  h2e = "h2e",
  h3e = "h3e",
}
type BannerFontSize = "h1e" | "h2e" | "h3e";
export type BannerProps =
  | {
      text: string;
      textType: BannerFontSize;
      item?: undefined;
    }
  | {
      item: React.ReactNode;
      text?: undefined;
      textType?: undefined;
    };
