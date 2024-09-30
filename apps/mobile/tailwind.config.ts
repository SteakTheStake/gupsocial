import type { Config } from "tailwindcss";
// @ts-expect-error - no types
import nativewind from "nativewind/preset";
import { hairlineWidth } from "nativewind/theme";

import baseConfig from "@turbostarter/tailwind-config/mobile";

export default {
  // We need to append the path to the UI packages to the content array so that
  // those classes are included correctly.
  darkMode: "class",
  content: [
    ...baseConfig.content,
    "../../packages/ui/{shared,mobile}/src/**/*.{ts,tsx}",
  ],
  presets: [baseConfig, nativewind],
  theme: {
    extend: {
      fontFamily: {
        sans: ["DMSans_400Regular"],
        "sans-medium": ["DMSans_500Medium"],
        "sans-bold": ["DMSans_700Bold"],
        "sans-italic": ["DMSans_400Regular_Italic"],
        mono: ["DMMono_400Regular"],
      },
      borderWidth: {
        hairline: hairlineWidth(),
      },
    },
  },
} satisfies Config;
