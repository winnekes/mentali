import { Icon, useDisclosure, Flex, IconButton, Image, HStack, Text, Link } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useRef } from "react";
import { BiMenu } from "react-icons/bi";
import { spacing } from "../../styles/theme";
import { DrawerMenu } from "./drawer-menu";

export const DesktopNavigation = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const btnRef = useRef(null);

  return (
    <>
      <Flex justify="space-between" align="center" py={spacing} color="white">
        <Link onClick={() => router.push("/")}>
          <HStack>
            <Image src="/logo.png" boxSize="34px" alt="Emotional cloud" />
            <Text fontWeight="bold" fontFamily="heading">
              sturmglas.
            </Text>
          </HStack>
        </Link>

        <IconButton
          icon={<Icon as={BiMenu} boxSize="32px" />}
          aria-label={"Open menu"}
          variant="ghost"
          onClick={onOpen}
        />
      </Flex>

      <DrawerMenu finalFocusRef={btnRef} isOpen={isOpen} onClose={onClose} />
    </>
  );
};
