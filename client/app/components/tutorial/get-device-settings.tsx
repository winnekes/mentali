import { Alert, AlertIcon } from "@chakra-ui/alert";
import {
  Box,
  VStack,
  Flex,
  Switch,
  Text,
  useBreakpointValue,
  IconButton,
  Button,
} from "@chakra-ui/react";
import { Dispatch, FunctionComponent, SetStateAction } from "react";
import { BiBluetooth } from "react-icons/bi";
import { useBluetooth } from "../../hooks/use-bluetooth";
import { MoodsQuery } from "../../types/graphql";
import { FitnessLogin } from "../fitness-login";

type Props = {
  profile: MoodsQuery["profile"];
  hasCompanion: boolean;
  setHasCompanion: Dispatch<SetStateAction<boolean>>;
  hasGoogleFitness: boolean;
  setHasGoogleFitness: Dispatch<SetStateAction<boolean>>;
};

export const GetDeviceSettings: FunctionComponent<Props> = ({
  profile,
  hasCompanion,
  setHasCompanion,
  hasGoogleFitness,
  setHasGoogleFitness,
}) => {
  const bluetooth = useBluetooth();

  return (
    <>
      <Flex justify="space-between" align="flex-start" w="full">
        <Box mr={10}>
          <Text fontSize="lg">
            Do you have a <strong>Companion</strong>?
          </Text>
          <Text>You will need to enable Bluetooth and have your companion close.</Text>
        </Box>

        <Switch
          id="hasCompanion"
          isChecked={hasCompanion}
          colorScheme="purple"
          size="lg"
          onChange={e => setHasCompanion(e.target.checked)}
        />
      </Flex>

      <Box visibility={hasCompanion ? "visible" : "hidden"} mt={2}>
        {!bluetooth.state.connected ? (
          <Button
            leftIcon={<BiBluetooth />}
            mb={2}
            w="full"
            aria-label=""
            onClick={() => bluetooth.connect()}
            variant="primary"
          >
            Pair your companion now
          </Button>
        ) : (
          <Alert status="success" variant="solid">
            <AlertIcon />
            Successfully paired.
          </Alert>
        )}
      </Box>

      <Flex justify="space-between" align="flex-start" my={2} w="full">
        <Box mr={10}>
          <Text fontSize="lg">
            Do you have a <strong>Google Fitness</strong> account?
          </Text>
          <Text>We will access your heart rate, step and sleep data. </Text>
        </Box>

        <Switch
          id="hasGoogleFitness"
          isChecked={hasGoogleFitness}
          colorScheme="purple"
          size="lg"
          onChange={e => setHasGoogleFitness(e.target.checked)}
        />
      </Flex>
      <Box visibility={hasGoogleFitness ? "visible" : "hidden"} mt={2} ml={0}>
        {!profile.refreshToken ? (
          <FitnessLogin />
        ) : (
          <Alert status="success" variant="solid">
            <AlertIcon />
            Thank you for granting access.
          </Alert>
        )}
      </Box>
    </>
  );
};
