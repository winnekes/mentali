import {
  Flex,
  Heading,
  Icon,
  Image,
  SimpleGrid,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { ReactElement } from "react";

export const Features = () => {
  const isMobile = useBreakpointValue({ base: true, lg: false });
  return (
    <>
      <Heading as="h2" textAlign="center" mb={100}>
        Features
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} mb="100px">
        <Stack spacing={4} order={isMobile ? 1 : 0} justifyContent="center">
          <Text
            textTransform="uppercase"
            color="purple.400"
            fontWeight={600}
            fontSize="sm"
            p={2}
            alignSelf="flex-start"
            rounded="md"
          >
            Companion
          </Text>
          <Heading>Say Hi to your new friend!</Heading>
          <Text fontSize="lg">
            Sometimes you just want to curl up with a book, or stare out of a window and be alone in
            your thoughts. Your companion is a personalized device that's connected to you and your
            moods. Look at it as a reflection of yourself and as a way to communicate with the
            outside world without words. Your <strong>Companion</strong> comes in various forms and
            colors!
          </Text>
        </Stack>
        <Flex justify="center">
          <Image src="/landing/companion_cloud.jpg" alt=" " borderRadius="25px" />
        </Flex>
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} my="100px">
        <Flex justify="center">
          <Image src="/landing/timeline.png" alt=" " borderRadius="25px" />
        </Flex>
        <Stack spacing={4} justifyContent="center">
          <Text
            textTransform="uppercase"
            color="purple.400"
            fontWeight={600}
            fontSize="sm"
            p={2}
            alignSelf="flex-start"
            rounded="md"
          >
            Oasis
          </Text>
          <Heading>Take a moment to meditate on your thoughts</Heading>
          <Text fontSize="lg">
            Life gets hectic and crowded, and it's hard to catch a break. The <strong>Oasis</strong>{" "}
            is a place of solace - to sit down, take a deep breath, think and note down your current
            mood before you are called to action again.
          </Text>
        </Stack>
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} mb="100px">
        <Stack spacing={4} order={isMobile ? 1 : 0} justifyContent="center">
          <Text
            textTransform="uppercase"
            color="purple.400"
            fontWeight={600}
            fontSize="sm"
            p={2}
            alignSelf="flex-start"
            rounded="md"
          >
            Weathervane
          </Text>
          <Heading>Reflect on your mental health</Heading>
          <Text fontSize="lg">
            It's not easy to remember feelings and tracking what's been bothering you when you're
            caught up in the middle of it. It's best to reflect when you're calm, and take positive
            action instead of a rushed reaction. The <strong>Weathervane</strong> shows you how
            you've been doing and what makes you happy and what gets you down.
          </Text>
        </Stack>
        <Flex justify="center">
          <Image src="/landing/insights.png" alt=" " borderRadius="25px" />
        </Flex>
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} my="100px">
        <Flex justify="center">
          <Image src="/landing/share-mood.png" alt=" " borderRadius="25px" />
        </Flex>
        <Stack spacing={4} justifyContent="center">
          <Text
            textTransform="uppercase"
            color="purple.400"
            fontWeight={600}
            fontSize="sm"
            p={2}
            alignSelf="flex-start"
            rounded="md"
          >
            Share
          </Text>
          <Heading>Spread the love ❤️</Heading>
          <Text fontSize="lg">
            Feeling proud? Excited? Loved? Let the world know!{" "}
            <strong>Share the moment with your loved ones!</strong>
          </Text>
        </Stack>
      </SimpleGrid>
    </>
  );
};

interface FeatureProps {
  text: string;
  icon?: ReactElement;
}

const Feature = ({ text, icon }: FeatureProps) => {
  return (
    <Stack direction="row" align="center">
      <Flex w={8} h={8} align="center" justify="center" rounded="full" bg="white">
        {icon}
      </Flex>
      <Text fontWeight={600}>{text}</Text>
    </Stack>
  );
};
