import { Box, Heading, Text } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import ReactWordcloud from "react-wordcloud";
import { StatisticsQuery } from "../../types/graphql";

const options = {
  rotations: 0,
  rotationAngles: [-180, 0] as [number, number],
  fontFamily: "Nunito Sans",
  fontSizes: [30, 50] as [number, number],
};

type Props = {
  tagUsageCounts: StatisticsQuery["statistics"]["tagUsageCounts"];
};
export const WordCloud: FunctionComponent<Props> = ({ tagUsageCounts }) => {
  const data = tagUsageCounts.map(tagCount => ({
    text: tagCount.tag,
    value: tagCount.count,
  }));

  return (
    <Box width="full">
      <Heading as="h3" size="lg">
        Your personal label word cloud
      </Heading>
      <Text mb={12}>The bigger the label, the more often you have used it to label a mood!</Text>
      <ReactWordcloud options={options} words={[...data]} />
    </Box>
  );
};
