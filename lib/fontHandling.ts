import { Roboto, Lalezar } from "@next/font/google";
import localFont from "@next/font/local";

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

export const codeFont = localFont({
  src: "../src/font/Monocraft.ttf",
  variable: "--codeFont",
});
