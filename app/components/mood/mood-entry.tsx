import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Box, HStack, IconButton, Tag, Text } from "@chakra-ui/react";
import { DateTime as time } from "luxon";
import { FunctionComponent, useState } from "react";
import { MoodsQuery } from "../../types/graphql";
import { emotions } from "../../types/mood";
import { Subheading } from "../generic/text/subheading";
import { AddMoodModal } from "./update-mood/add-mood-modal";
import { ConfirmDeleteMoodModal } from "./confirm-delete-mood-modal";
import { EditMoodModal } from "./update-mood/edit-mood-modal";

type Props = {
  mood: MoodsQuery["moods"][number];
};

export const MoodEntry: FunctionComponent<Props> = ({ mood }) => {
  const [showInteractionMenu, setShowInteractionMenu] = useState(false);
  const [selectedEditMoodId, setSelectedEditMoodId] = useState<number | null>(null);
  const [selectedDeleteMoodId, setSelectedDeleteEditMoodId] = useState<number | null>(null);

  return (
    <>
      <HStack align="flex-start" justify="flex-start" spacing={6}>
        <Box
          minHeight="20px"
          alignSelf="stretch"
          alignContent="center"
          w="1px"
          minWidth="1px"
          bg="gray.700"
        />
        <Box
          paddingBottom={20}
          onMouseEnter={() => setShowInteractionMenu(true)}
          onMouseLeave={() => setShowInteractionMenu(false)}
        >
          <HStack alignItems="center" spacing={4}>
            <Subheading fontSize="sm" color="gray.600">
              {time.fromISO(mood.date).toLocaleString(time.DATETIME_SHORT)}
            </Subheading>

            <HStack spacing={2} visibility={showInteractionMenu ? "visible" : "hidden"}>
              <IconButton
                icon={<EditIcon />}
                color="gray.500"
                aria-label=""
                onClick={() => setSelectedEditMoodId(mood.id)}
                variant="ghost"
                size="sm"
              />
              <IconButton
                icon={<DeleteIcon />}
                color="gray.500"
                aria-label=""
                variant="ghost"
                size="sm"
                onClick={() => setSelectedDeleteEditMoodId(mood.id)}
              />
            </HStack>
          </HStack>
          <Text fontWeight="bold" textTransform="capitalize" color={emotions[mood.emotion].color}>
            {emotions[mood.emotion].name}
          </Text>
          <Text> {mood.description}</Text>
          <HStack spacing={3} mt={6}>
            {mood.tags?.map(tag => (
              <Tag bg="gray.700" color="gray.500">
                {tag.name}
              </Tag>
            ))}
          </HStack>
        </Box>
      </HStack>

      {selectedEditMoodId && (
        <EditMoodModal mood={mood} onClose={() => setSelectedEditMoodId(null)} />
      )}
      {selectedDeleteMoodId && (
        <ConfirmDeleteMoodModal
          moodId={mood.id}
          onClose={() => setSelectedDeleteEditMoodId(null)}
        />
      )}
    </>
  );
};
