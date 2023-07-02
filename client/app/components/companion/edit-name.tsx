import { EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Editable,
  EditableInput,
  EditablePreview,
  IconButton,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { useState } from "react";
import { useBluetooth } from "../../hooks/use-bluetooth";

export const EditName = () => {
  const bluetooth = useBluetooth();
  return (
    <Tooltip label="Click on the name to edit, hit enter to save">
      <Box textAlign="center">
        <Text>Say hello to</Text>{" "}
        <Editable
          color="white"
          defaultValue={bluetooth.deviceName}
          maxWidth="300px"
          fontSize="xl"
          fontWeight="bold"
          submitOnBlur
          onSubmit={async value => {
            await bluetooth.changeName(value);
          }}
        >
          <EditablePreview textAlign="center" />
          <EditableInput textAlign="center" />
        </Editable>
      </Box>
    </Tooltip>
  );
};
