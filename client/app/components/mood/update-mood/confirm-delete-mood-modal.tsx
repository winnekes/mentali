import {
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { Button, AlertDialog } from "@chakra-ui/react";
import { FunctionComponent, useRef } from "react";
import { LatestMoodDocument, MoodsDocument, useDeleteMoodMutation } from "../../../types/graphql";

type Props = {
  moodId: number;
  onClose: () => void;
};

export const ConfirmDeleteMoodModal: FunctionComponent<Props> = ({
  moodId,

  onClose,
}) => {
  const leastDestructiveRef = useRef<HTMLButtonElement>(null);
  const [mutate, { loading }] = useDeleteMoodMutation({
    refetchQueries: [LatestMoodDocument, MoodsDocument],
  });

  const deleteMood = async () => {
    try {
      await mutate({
        variables: {
          data: { id: moodId },
        },
      });

      onClose();
    } catch (e) {
      console.log(e);
    }
  };

  // TODO: find better icon assets
  return (
    <AlertDialog isOpen leastDestructiveRef={leastDestructiveRef} onClose={onClose} isCentered>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete the mood record
          </AlertDialogHeader>

          <AlertDialogBody>Are you sure? You can't undo this action afterwards.</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={leastDestructiveRef} onClick={onClose} variant="secondary">
              Cancel
            </Button>
            <Button variant="primary" onClick={deleteMood} ml={3} isLoading={loading}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
