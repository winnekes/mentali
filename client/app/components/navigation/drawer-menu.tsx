import { useUser } from "@auth0/nextjs-auth0";
import {
  Stack,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Drawer,
  Text,
  Link as ChakraLink,
  useBreakpointValue,
  Icon,
  HStack,
  Divider,
  Box,
  Center,
  Avatar,
  Button,
} from "@chakra-ui/react";
import { MutableRefObject } from "react";
import { MdBluetoothDisabled, MdBluetoothConnected } from "react-icons/md";
import { useBluetooth } from "../../hooks/use-bluetooth";
import { useTimeOfDay } from "../../hooks/use-time-of-day";
import { colors } from "../../styles/theme";
import { useProfileQuery } from "../../types/graphql";
import { ErrorAlert } from "../generic/error-alert";
import { Loading } from "../generic/loading";
import { authNavigationItems } from "./navigation";
import Link from "next/link";
import React from "react";

type Props = {
  finalFocusRef: MutableRefObject<null>;
  isOpen: boolean;
  onClose: () => void;
};

// todo show empty buddy
export const DrawerMenu = ({ finalFocusRef, isOpen, onClose }: Props) => {
  const { data, loading, error } = useProfileQuery();
  const bluetooth = useBluetooth();
  const drawerSize = useBreakpointValue({ base: "xs", lg: "md" });
  const { greeting } = useTimeOfDay();
  const { user } = useUser();

  const navigationItems = authNavigationItems;

  return (
    <Drawer
      motionPreset="none"
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      finalFocusRef={finalFocusRef}
      size={drawerSize}
    >
      <DrawerOverlay />
      <DrawerContent bg={colors.ui.background03} color="white">
        <DrawerHeader>
          {loading && <Loading />}
          {error && <ErrorAlert />}
          {data?.profile && (
            <>
              {greeting}, {data?.profile.nickname}
            </>
          )}
        </DrawerHeader>
        <DrawerBody>
          {data?.profile.pictureUrl && (
            <Center>
              <Avatar
                src={data?.profile.pictureUrl}
                name={`${user?.given_names} ${user?.family_names}`}
                size="xl"
                bg={colors.brand01}
              />
            </Center>
          )}
          <Stack p={4} spacing={7}>
            {navigationItems.map((navItem, index) => {
              return (
                <React.Fragment key={navItem.label}>
                  <Link href={navItem.href} passHref>
                    <ChakraLink fontSize="xl">
                      <HStack onClick={onClose}>
                        <Icon as={navItem.icon} />
                        <Text>{navItem.label}</Text>
                      </HStack>
                    </ChakraLink>
                  </Link>
                  {index < navigationItems.length - 1 && <Divider />}
                </React.Fragment>
              );
            })}
          </Stack>

          {data?.profile.settings.hasCompanion && (
            <Box position="absolute" bottom={0} pb={10} w="full">
              <Divider my={5} />
              <Text fontWeight="bold">
                Your companion{bluetooth.deviceName && <>, {bluetooth.deviceName} </>}
              </Text>
              <Text>
                <strong>Status</strong>: {bluetooth.state.connected ? "connected" : "disconnected"}
              </Text>

              {!bluetooth.state.connected ? (
                <Button
                  ml={0}
                  mt={2}
                  leftIcon={<MdBluetoothConnected />}
                  variant="secondary"
                  onClick={bluetooth.connect}
                >
                  Connect
                </Button>
              ) : (
                <Button
                  ml={0}
                  mt={2}
                  leftIcon={<MdBluetoothDisabled />}
                  variant="secondary"
                  onClick={bluetooth.disconnect}
                >
                  Disconnect
                </Button>
              )}
            </Box>
          )}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
