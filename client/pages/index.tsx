import { useUser } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { ComingSoonFeatures } from "../app/components/landing/coming-soon-features";
import { Features } from "../app/components/landing/features";
import { Hero } from "../app/components/landing/hero";
import { PAGES } from "../app/components/navigation/navigation";
import { PageWrapper } from "../app/components/generic/page-wrapper";

export default function Home() {
  const { user, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      router.push(PAGES.oasis);
    }
  }, [user, isLoading]);

  if (user) {
    return null;
  }
  return (
    <PageWrapper hideNavigation showFooter fullWidth>
      <Hero />
      <Features />
      <ComingSoonFeatures />
    </PageWrapper>
  );
}
