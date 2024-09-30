import type { CheckoutInput, GetBillingPortalInput } from "../lib/schema";
import type { User } from "@turbostarter/auth";

export interface WebhookCallbacks {
  onCheckoutSessionCompleted?: (sessionId: string) => Promise<void> | void;
  onSubscriptionCreated?: (subscriptionId: string) => Promise<void> | void;
  onSubscriptionUpdated?: (subscriptionId: string) => Promise<void> | void;
  onSubscriptionDeleted?: (subscriptionId: string) => Promise<void> | void;
}

export interface BillingProviderStrategy {
  webhookHandler: (
    req: Request,
    callbacks?: WebhookCallbacks,
  ) => Promise<Response>;
  checkout: (
    input: CheckoutInput & { user: User },
  ) => Promise<{ url: string | null }>;
  getBillingPortal: (
    input: GetBillingPortalInput & { user: User },
  ) => Promise<{ url: string }>;
}
