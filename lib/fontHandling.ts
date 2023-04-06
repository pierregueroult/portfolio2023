//  ! This file is used to import fonts from Google Fonts and local fonts

// ? import modules
import { Montserrat, Archivo_Black, Noto_Color_Emoji } from "@next/font/google";
import localFont from "@next/font/local";

// ? text font is Roboto
export const textFont = Montserrat({
  // weight: "500",
  subsets: ["latin"],
  variable: "--textFont",
});

// ? title font is Lalezar
export const titleFont = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--titleFont",
});

// ? code font is Monocraft
export const codeFont = localFont({
  src: "../src/font/Monocraft.ttf",
  variable: "--codeFont",
});

export const emojiFont = Noto_Color_Emoji({
  weight: "400",
  subsets: ["emoji"],
  variable: "--emojiFont",
});
