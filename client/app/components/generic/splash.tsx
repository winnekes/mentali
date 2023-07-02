import { Box, Center, Container, Text } from "@chakra-ui/react";
import Image from "next/image";

export const Splash = () => {
  return (
    <Center height="90vh" width="100%">
      <Container maxWidth="container.xl" height="50%" position="relative">
        <Image
          src="/mentali.png"
          layout="fill"
          objectFit="contain"
          quality={100}
          alt="Brand image"
        />
      </Container>
    </Center>
  );
};
