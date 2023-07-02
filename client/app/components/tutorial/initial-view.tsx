import { VStack, Text, Box, Heading } from "@chakra-ui/react";
import Image from "next/image";

export const InitialView = () => {
  return (
    <VStack>
      <Box height="200px" width="150px" position="relative" mb={2}>
        <Image
          src="/mentali.png"
          layout="fill"
          objectFit="contain"
          quality={100}
          alt="Brand image"
        />
      </Box>
      <Heading fontSize="2xl">Thank you for joining sturmglas.</Heading>
      <Text fontSize="lg">Before you can start we need to finish setting up your profile.</Text>
    </VStack>
  );
};
``;
