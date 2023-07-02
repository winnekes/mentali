import { Center, Spinner } from "@chakra-ui/react";

export const Loading = () => {
  return (
    <Center p={20}>
      <Spinner speed="1s" size="xl" />
    </Center>
  );
};
