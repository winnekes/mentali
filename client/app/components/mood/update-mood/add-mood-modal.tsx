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
  TagsDocument,
  useAddMoodMutation,
  useTagsQuery,
} from "../../../types/graphql";
import { emotions } from "../../../types/mood";
import { ErrorAlert } from "../../generic/error-alert";
import { Loading } from "../../generic/loading";

import { SetEmotionView } from "./set-emotion-view";
import { SetMoodContext } from "./set-mood-context";
type Props = {
  onClose: () => void;
};
export type TagInput = { name: string };

export const AddMoodModal: FunctionComponent<Props> = ({ onClose }) => {
  const { data, error, loading } = useTagsQuery();

  const bluetooth = useBluetooth();
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion | null>(null);
  const [note, setNote] = useState("");
  const [selectedTags, setSelectedTags] = useState<TagInput[]>([]);
  const [formStep, setFormStep] = useState(1);

  const [mutate] = useAddMoodMutation({
    refetchQueries: [LatestMoodDocument, MoodsDocument, TagsDocument],
  });

  const addMood = async () => {
    if (selectedEmotion) {
      try {
        await mutate({
          variables: {
            data: {
              emotion: selectedEmotion,
              date: new Date(),
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
        <ModalHeader>{formStep === 1 ? "How are you?" : "Give a bit of context"}</ModalHeader>

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
            <Button onClick={addMood} variant="primary">
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
