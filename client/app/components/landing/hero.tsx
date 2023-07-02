import {
  Button,
  Box,
  Container,
  Heading,
  Link,
  Stack,
  Text,
  HStack,
  SimpleGrid,
  VStack,
  Flex,
  useBreakpointValue,
  ResponsiveValue,
} from "@chakra-ui/react";
import Image from "next/image";

export const Hero = () => {
  const textAlign = useBreakpointValue({ base: "center", lg: "left" }) || "left";

  return (
    <Flex
      direction={["column", null, null, null, "row"]}
      spacingX="40px"
      spacingY="20px"
      minHeight="100vh" // @ts-ignore
      textAlign={textAlign}
      alignItems="center"
      mb={10}
    >
      <VStack flex={[null, null, null, null, 2]}>
        <Heading fontWeight={600} fontSize={{ base: "5xl", lg: "7xl" }} lineHeight="110%" mb={10}>
          Don't weather your{" "}
          <Text as="span" color="purple.400">
            emotions alone
          </Text>
        </Heading>
        <Text fontSize={{ base: "xl", md: "2xl" }}>
          Emotions and feelings are never easy. Sometimes it seems impossible to put into words
          what&apos;s going on in your mind.
          <br />
          <Text as="span" color="purple.400" fontWeight="bold">
            sturmglas
          </Text>{" "}
          helps you track your emotions, and soon,{" "}
          <Text as="span" color="purple.400" fontWeight="bold">
            predict it
          </Text>
        </Text>
        <Box py={10}>
          <Button
            size="lg"
            as={Link}
            href="/api/auth/login"
            rounded="full"
            px={6}
            variant="primary"
          >
            Get started
          </Button>
          <Button
            as={Link}
            href="/api/auth/login"
            rounded="full"
            size="lg"
            px={6}
            variant="secondary"
          >
            Login
          </Button>
        </Box>
      </VStack>

      <Box height="400px" w="full" position="relative" flex="1">
        <Image
          src="/mentali.png"
          layout="fill"
          objectFit="contain"
          quality={100}
          alt="Brand image"
        />
      </Box>
    </Flex>
  );
};
