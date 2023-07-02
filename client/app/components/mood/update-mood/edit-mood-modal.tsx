import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalFooter,
  Flex,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FunctionComponent, useState } from "react";
import { useBluetooth } from "../../../hooks/use-bluetooth";
import {
  Emotion,
  LatestMoodDocument,
  MoodsDocument,
  MoodsQuery,
  TagsDocument,
  useAddMoodMutation,
  useEditMoodMutationMutation,
  useTagsQuery,
} from "../../../types/graphql";
import { emotions } from "../../../types/mood";
import { ErrorAlert } from "../../generic/error-alert";
import { Loading } from "../../generic/loading";

import { SetEmotionView } from "./set-emotion-view";
import { SetMoodContext } from "./set-mood-context";
type Props = {
  mood: MoodsQuery["moods"][number];
  onClose: () => void;
};
export type TagInput = { name: string };

export const EditMoodModal: FunctionComponent<Props> = ({ mood, onClose }) => {
  const { data, error, loading } = useTagsQuery();
  const bluetooth = useBluetooth();
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion | null>(mood.emotion);
  const [note, setNote] = useState(mood.description);
  const [selectedTags, setSelectedTags] = useState<TagInput[]>(
    mood.tags?.map(tag => ({ name: tag.name })) ?? []
  );
  const [formStep, setFormStep] = useState(1);

  const [mutate] = useEditMoodMutationMutation({
    refetchQueries: [LatestMoodDocument, MoodsDocument, TagsDocument],
  });

  const editMood = async () => {
    if (selectedEmotion) {
      try {
        await mutate({
          variables: {
            data: {
              id: mood.id,
              emotion: selectedEmotion,
              description: note,
              tags: selectedTags,
            },
          },
        });

        await bluetooth.changeFace(emotions[selectedEmotion].faceInHex);
        onClose();
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <Modal onClose={onClose} isOpen isCentered size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit a previous record</ModalHeader>

        <ModalBody as={Flex} direction="column" justifyContent="center">
          {loading && <Loading />}
          {error && <ErrorAlert />}
          {data && (
            <>
              {formStep === 1 ? (
                <SetEmotionView selectedEmotion={selectedEmotion} setEmotion={setSelectedEmotion} />
              ) : (
                <SetMoodContext
                  note={note}
                  setNote={setNote}
                  selectedTags={selectedTags}
                  setSelectedTags={setSelectedTags}
                  tags={data.tags}
                />
              )}
            </>
          )}
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose} variant="secondary">
            Cancel
          </Button>
          {formStep > 1 ? (
            <Button onClick={editMood} variant="primary">
              Record
            </Button>
          ) : (
            <Button onClick={() => setFormStep(2)} variant="primary" disabled={!selectedEmotion}>
              Continue
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
