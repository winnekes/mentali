import { Box, Button } from "@chakra-ui/react";
import { FunctionComponent, useState } from "react";
import { colors, spacing } from "../../styles/theme";
import { SplitMoods } from "../../types/mood";
import { PanelTitle } from "../generic/text/titles";
import { AddMoodModal } from "./update-mood/add-mood-modal";
import { MonthSection } from "./mood-month-section";

// todo mental weather
type Props = {
  moods: SplitMoods;
};

export const MoodsTimeline: FunctionComponent<Props> = ({ moods }) => {
  const [showAddMoodModal, setShowAddMoodModal] = useState(false);

  return (
    <>
      <PanelTitle>Your mood timeline</PanelTitle>

      <Button
        display={{ base: "none", lg: "block" }}
        mb={spacing}
        w="100%"
        onClick={() => setShowAddMoodModal(true)}
        variant="primary"
      >
        How are you feeling today? Record your mood
      </Button>

      {moods.map(year => (
        <Box key={year.name}>
          {year.months.map(month => {
            return <MonthSection key={month.name} month={month} year={year} />;
          })}
        </Box>
      ))}

      {showAddMoodModal && <AddMoodModal onClose={() => setShowAddMoodModal(false)} />}
    </>
  );
};
