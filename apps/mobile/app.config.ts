import type { ConfigContext, ExpoConfig } from "expo/config";

const APP_NAME = "TurboStarter";
const SLUG = "turbostarter";

const SPLASH = {
  image: "./assets/images/splash/light.png",
  resizeMode: "cover",
  backgroundColor: "#ffffff",
  dark: {
    image: "./assets/images/splash/dark.png",
    resizeMode: "cover",
    backgroundColor: "#0D121C",
  },
} as const;

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: APP_NAME,
  slug: SLUG,
  scheme: SLUG,
  version: "0.1.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  userInterfaceStyle: "automatic",
  assetBundlePatterns: ["**/*"],
  sdkVersion: "51.0.0",
  platforms: ["ios", "android"],
  updates: {
    fallbackToCacheTimeout: 0,
  },
  ios: {
    bundleIdentifier: "your.bundle.identifier",
    supportsTablet: false,
    splash: SPLASH,
  },
  android: {
    package: "your.bundle.identifier",
    splash: SPLASH,
  },
  extra: {
    eas: {
      projectId: "a7958179-7450-4e6f-8791-da222215909e",
    },
  },
  experiments: {
    tsconfigPaths: true,
    typedRoutes: true,
  },
  plugins: ["expo-router"],
});
