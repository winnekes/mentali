import { useUser } from "@auth0/nextjs-auth0";
import { Flex, IconButton, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { BiHomeAlt, BiMenu, BiPlus } from "react-icons/bi";
import { colors, spacing } from "../../styles/theme";
import { AddMoodModal } from "../mood/update-mood/add-mood-modal";
import { DrawerMenu } from "./drawer-menu";
import { PAGES } from "./navigation";

// TODO: hide navigation on scroll
export const MobileNavigation = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [showAddMoodModal, setShowAddMoodModal] = useState(false);
  const { user } = useUser();
  const router = useRouter();
  const btnRef = useRef(null);

  return (
    <>
      <Flex
        display={{ base: "flex", lg: "none" }}
        align="center"
        justify="space-between"
        px={spacing}
        py={4}
        width="100%"
        bg="gray.900"
        bottom={0}
        position="fixed"
        borderTopRadius="30px"
        boxShadow="0px 0px 20px 3px rgba(0,0,0,.1)"
        color="white"
      >
        <IconButton
          aria-label={"Go home"}
          icon={<BiHomeAlt />}
          variant="ghost"
          size="lg"
          borderRadius="100%"
          onClick={() => router.push(PAGES.oasis)}
        />
        {user && (
          <IconButton
            aria-label={"Record your mood"}
            icon={<BiPlus />}
            size="lg"
            borderRadius="100%"
            bg={colors.brand01}
            onClick={() => setShowAddMoodModal(true)}
          />
        )}
        <IconButton
          onClick={onOpen}
          icon={<BiMenu />}
          variant="ghost"
          aria-label="Toggle navigation"
          borderRadius="100%"
          size="lg"
        />
      </Flex>

      <DrawerMenu finalFocusRef={btnRef} isOpen={isOpen} onClose={onClose} />
      {showAddMoodModal && <AddMoodModal onClose={() => setShowAddMoodModal(false)} />}
    </>
  );
};
