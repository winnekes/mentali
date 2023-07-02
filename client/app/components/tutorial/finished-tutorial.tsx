import { VStack, Text, Box, Heading } from "@chakra-ui/react";
import Image from "next/image";

export const FinishedTutorial = () => {
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
      <Heading fontSize="2xl">Congratulations!</Heading>
      <Text fontSize="lg">
        It's now time add your first mood. Record how you're feeling right now!
      </Text>
    </VStack>
  );
};
