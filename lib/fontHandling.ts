//  ! This file is used to import fonts from Google Fonts and local fonts

// ? import modules
import { Roboto, Lalezar } from "@next/font/google";
import localFont from "@next/font/local";

// ? text font is Roboto
export const textFont = Roboto({
  weight: "500",
  subsets: ["latin"],
  variable: "--textFont",
});

// ? title font is Lalezar
export const titleFont = Lalezar({
  weight: "400",
  subsets: ["latin"],
  variable: "--titleFont",
});

// ? code font is Monocraft
export const codeFont = localFont({
  src: "../src/font/Monocraft.ttf",
  variable: "--codeFont",
});
