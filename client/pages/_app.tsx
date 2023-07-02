import "../app/styles/globals.scss";
import { UserProvider } from "@auth0/nextjs-auth0";
import type { AppProps } from "next/app";
import { FunctionComponent, useEffect, useState } from "react";
import { Splash } from "../app/components/generic/splash";
import { MetaHead } from "../app/components/meta-head";
import { BluetoothContextProvider } from "../app/hooks/use-bluetooth";
import { theme } from "../app/styles/theme";
import { ChakraProvider, Progress, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";
import { createNetworkStatusNotifier } from "react-apollo-network-status";
import { Chart } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
Chart.register(ChartDataLabels);

const { link, useApolloNetworkStatus } = createNetworkStatusNotifier();

const client = new ApolloClient({
  uri: "/api/graphql",
  cache: new InMemoryCache(),
  link: link.concat(createHttpLink({ uri: "/api/graphql" })),
});

const ApolloApp: FunctionComponent = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const toast = useToast();
  const toastId = "global-state";
  const [showSplash, setShowSplash] = useState(true);

  const status = useApolloNetworkStatus();

  useEffect(() => {
    !toast.isActive(toastId) &&
      (status.queryError || status.mutationError) &&
      toast({
        title: "Something went wrong",
        description: "Please try again or let the team know if the error persists.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    if (status.numPendingMutations > 0 || status.numPendingQueries > 0) {
      setIsLoading(true);
    }
    if (!status.numPendingMutations && !status.numPendingQueries) {
      setIsLoading(false);
    }

    const handleRouteChangeStart = () => {
      setIsLoading(true);
    };

    const handleRouteChangeComplete = () => {
      setIsLoading(false);
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, [status]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  if (showSplash) {
    return <Splash />;
  }
  return (
    <ApolloProvider client={client}>
      <Progress isIndeterminate={isLoading} colorScheme="purple" bg="transparent" />
      {children}
    </ApolloProvider>
  );
};

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <MetaHead />
      <UserProvider>
        <BluetoothContextProvider>
          <ChakraProvider theme={theme}>
            <ApolloApp>
              <Component {...pageProps} />
            </ApolloApp>
          </ChakraProvider>
        </BluetoothContextProvider>
      </UserProvider>
    </>
  );
};

export default MyApp;
