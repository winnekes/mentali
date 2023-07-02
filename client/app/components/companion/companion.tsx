import { VStack, Text, Box } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { useBluetooth } from "../../hooks/use-bluetooth";
import { MoodsQuery } from "../../types/graphql";
import { emotions } from "../../types/mood";
import Image from "next/image";
import { useEffect } from "react";
import { Subheading } from "../generic/text/subheading";
import { EditName } from "./edit-name";
import { DateTime as time } from "luxon";

type Props = {
  latestMood?: MoodsQuery["latestMood"];
};

export const Companion: FunctionComponent<Props> = ({ latestMood }) => {
  const bluetooth = useBluetooth();

  useEffect(() => {
    if (latestMood) {
      if (bluetooth.state.connected) {
        bluetooth.changeFace(emotions[latestMood.emotion].faceInHex);
      }
    }
  }, [latestMood, bluetooth.state.connected]);

  return (
    <VStack>
      {latestMood ? (
        <>
          {bluetooth.state.connected && bluetooth.deviceName && <EditName />}
          <Image
            src={emotions[latestMood.emotion].imageUrl}
            height={"300px"}
            width={"300px"}
            priority={true}
            quality={100}
          />

          <Box px={[10, 20]} textAlign="center">
            <Subheading fontSize="sm" color="gray.500">
              {time.fromISO(latestMood.date).toLocaleString(time.DATETIME_SHORT)}
            </Subheading>
            <Text noOfLines={1} whiteSpace="pre-wrap">
              {latestMood.description}
            </Text>
          </Box>
        </>
      ) : (
        <Image
          src="/logo.png"
          height={"300px"}
          width={"300px"}
          priority={true}
          quality={100}
          alt="Image of emotional cloud"
        />
      )}
    </VStack>
  );
};
