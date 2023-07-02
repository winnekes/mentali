import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Dispatch, FunctionComponent, SetStateAction, useState } from "react";
import { MoodsQuery, useUpdateUserProfileMutation } from "../../types/graphql";
import { FinishedTutorial } from "./finished-tutorial";
import { GetDeviceSettings } from "./get-device-settings";
import { GetUserDetails } from "./get-user-details";
import { InitialView } from "./initial-view";

type Props = {
  profile: MoodsQuery["profile"];
  setShowAddFirstMood: Dispatch<SetStateAction<boolean>>;
  refetchData: () => void;
};

export const TutorialManager: FunctionComponent<Props> = ({
  profile,
  setShowAddFirstMood,
  refetchData,
}) => {
  const modalSize = useBreakpointValue({ base: "full", lg: "md" });
  const [formStep, setFormStep] = useState(0);
  const [nickname, setNickname] = useState("");
  const [hasCompanion, setHasCompanion] = useState(false);
  const [hasGoogleFitness, setHasGoogleFitness] = useState(false);

  const [mutate] = useUpdateUserProfileMutation();

  const handleStepChange = (direction: "prev" | "next") => {
    const nextStep = formStep + (direction === "next" ? 1 : -1);
    if (steps[nextStep]) {
      setFormStep(nextStep);
    }
  };

  const updateProfile = async () => {
    try {
      await mutate({
        variables: {
          data: {
            nickname,
            settings: { hasCompanion, hasGoogleFitness, hasFinishedTutorial: true },
          },
        },
      });
      handleStepChange("next");
    } catch (e) {
      console.log(e);
    }
  };

  const steps = [
    { title: "", content: <InitialView /> },
    {
      title: "",
      content: <GetUserDetails nickname={nickname} setNickname={setNickname} />,
    },
    {
      title: "",
      content: (
        <GetDeviceSettings
          profile={profile}
          hasCompanion={hasCompanion}
          setHasCompanion={setHasCompanion}
          hasGoogleFitness={hasGoogleFitness}
          setHasGoogleFitness={setHasGoogleFitness}
        />
      ),
    },
    {
      title: "",
      content: <FinishedTutorial />,
    },
  ];

  return (
    <Modal
      onClose={() => {}}
      isOpen
      isCentered
      size="xl"
      closeOnOverlayClick={false}
      closeOnEsc={false}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{steps[formStep].title}</ModalHeader>

        <ModalBody as={Flex} direction="column" justifyContent="center">
          {steps[formStep].content}
        </ModalBody>
        <ModalFooter>
          {formStep > 0 && formStep < steps.length - 1 && (
            <Button onClick={() => handleStepChange("prev")} variant="secondary">
              Go back
            </Button>
          )}
          {formStep < steps.length - 2 && (
            <Button onClick={() => handleStepChange("next")} variant="primary">
              Continue
            </Button>
          )}

          {formStep === steps.length - 2 && (
            <Button onClick={updateProfile} variant="primary">
              Save your settings
            </Button>
          )}

          {formStep === steps.length - 1 && (
            <Button
              onClick={async () => {
                setShowAddFirstMood(true);
                await refetchData();
              }}
              variant="primary"
            >
              Let's get started
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
