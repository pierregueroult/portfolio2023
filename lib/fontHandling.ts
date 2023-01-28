import { Roboto, Lalezar } from "@next/font/google";

export const textFont = Roboto({
  weight: "500",
  subsets: ["latin"],
  variable: "--textFont",
});

export const titleFont = Lalezar({
  weight: "400",
  subsets: ["latin"],
  variable: "--titleFont",
});
