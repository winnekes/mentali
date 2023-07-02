import { Box, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import { Dispatch, FunctionComponent, SetStateAction } from "react";
import { Emotion } from "../../../types/graphql";
import { EmotionDescription, emotions } from "../../../types/mood";

type Props = {
  selectedEmotion: Emotion | null;
  setEmotion: Dispatch<SetStateAction<Emotion | null>>;
};

const emotionsArray: EmotionDescription[] = Object.values(emotions);

export const SetEmotionView: FunctionComponent<Props> = ({ selectedEmotion, setEmotion }) => {
  return (
    <>
      <Text mb={12}>Select the emotion that matches best your current feeling.</Text>
      <SimpleGrid columns={2} spacing={10} textAlign="center">
        {emotionsArray.map(emotion => (
          <VStack key={emotion.name}>
            <Box
              boxSize="75px"
              bg={selectedEmotion === emotion.name.toUpperCase() ? "gray.700" : "transparent"}
              p={2}
              borderRadius="25px"
              onClick={() => {
                // @ts-ignore
                setEmotion(Emotion[emotion.name]);
              }}
            >
              <Image
                src={emotion.imageUrl}
                height="75px"
                width="75px"
                priority
                quality={100}
                alt="Image of emotional cloud"
              />
            </Box>

            <Text>{emotion.name}</Text>
          </VStack>
        ))}
      </SimpleGrid>
    </>
  );
};
