import { Box, Text } from "@chakra-ui/react";
import { DateTime as time } from "luxon/src/datetime";
import { FunctionComponent } from "react";
import { MoodsQuery } from "../../types/graphql";
import { MoodEntry } from "./mood-entry";

type Props = {
  month: { name: string; moods: MoodsQuery["moods"] };
  year: { name: number };
};

export const MonthSection: FunctionComponent<Props> = ({ month, year }) => {
  return (
    <Box marginBottom="4rem">
      <Text fontSize="xl" mb={10}>
        {month.name}, {year.name}
      </Text>

      {month.moods.map((mood, index) => (
        <MoodEntry key={mood.id} mood={mood} />
      ))}
    </Box>
  );
};
