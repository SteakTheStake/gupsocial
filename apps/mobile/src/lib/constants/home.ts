import { pathsConfig } from "~/config/paths";

export const HOME_LINKS = [
  {
    title: "Auth",
    description:
      "Authenticate users to your app. Social logins, magic link, email/password and many more.",
    href: pathsConfig.tabs.auth.login,
  },
  {
    title: "AI",
    description:
      "Integrate AI into your app. Image recognition, chatbots, and more.",
    href: pathsConfig.tabs.ai,
  },
  {
    title: "Billing",
    description:
      "Receive payments from your users using configured providers - Stripe or LemonSqueezy.",
    href: pathsConfig.tabs.billing,
  },
  {
    title: "Docs",
    description: `Learn how to use TurboStarter. From installation to deployment.`,
    href: "https://turbostarter.dev/docs/mobile",
  },
] as const;
