import { Pricing } from "~/components/pricing/pricing";
import { api } from "~/lib/api/server";
import { getMetadata } from "~/lib/metadata";

export const metadata = getMetadata({
  title: "Pricing",
});

const PricingPage = async () => {
  const user = await api.user.get();
  const customer = user ? await api.billing.getCustomer() : null;

  return <Pricing user={user} customer={customer} />;
};

export default PricingPage;
