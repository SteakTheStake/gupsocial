import { BuiltWith } from "@turbostarter/ui-web/built-with";

import { TurboLink } from "~/components/common/turbo-link";
import { appConfig } from "~/config/app";
import { pathsConfig } from "~/config/paths";

export const Footer = () => {
  return (
    <footer className="flex w-full flex-col items-center justify-center gap-3 sm:flex-row-reverse sm:justify-between">
      <BuiltWith />

      <div className="flex flex-col items-center gap-0.5 sm:items-start">
        <p className="text-center text-muted-foreground sm:text-left">
          &copy; {new Date().getFullYear()} {appConfig.name}. All rights
          reserved.
        </p>

        <div className="flex gap-2 text-sm text-muted-foreground">
          <TurboLink
            href={pathsConfig.marketing.legal.privacy}
            className="transition-colors hover:text-foreground"
          >
            Privacy policy
          </TurboLink>
          <span>•</span>
          <TurboLink
            href={pathsConfig.marketing.legal.terms}
            className="transition-colors hover:text-foreground"
          >
            Terms and Conditions
          </TurboLink>
        </div>
      </div>
    </footer>
  );
};
