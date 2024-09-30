import { RootProvider } from "fumadocs-ui/provider";
import { memo } from "react";

import { TRPCReactProvider } from "~/lib/api/react";

import { ThemeProvider } from "./theme";

interface ProvidersProps {
  readonly children: React.ReactNode;
}

export const Providers = memo<ProvidersProps>(({ children }) => {
  return (
    <TRPCReactProvider>
      <RootProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </RootProvider>
    </TRPCReactProvider>
  );
});

Providers.displayName = "Providers";
