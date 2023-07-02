import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tag,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import React, { forwardRef, FunctionComponent, useEffect, useRef, useCallback } from "react";
import { AiFillHeart } from "react-icons/ai";
import { colors } from "../../../styles/theme";
import { MoodsQuery } from "../../../types/graphql";
import { emotions } from "../../../types/mood";
import { Panel } from "../../generic/panel";
import { Subheading } from "../../generic/text/subheading";
import { DateTime as time } from "luxon";

type Props = {
  mood: MoodsQuery["moods"][number];
  onClose: () => void;
};

export const ShareMoodModal: FunctionComponent<Props> = ({ mood, onClose }) => {
  const componentRef = useRef<HTMLDivElement>(null);
  const EI = useRef<any | undefined>();

  useEffect(() => {
    if (typeof window !== undefined) {
      import("html-to-image").then(module => (EI.current = module));
    }
  }, []);

  const onButtonClick = useCallback(async () => {
    if (componentRef?.current === null) {
      return;
    }
    EI?.current
      .toPng(componentRef?.current, { cacheBust: true, style: { fontFamily: "Nunito" } })
      .then((dataUrl: any) => {
        const link = document.createElement("a");
        link.download = "sturmglas.png";
        link.href = dataUrl;
        link.click();
      });
  }, [componentRef]);

  return (
    <Modal onClose={onClose} isOpen isCentered size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Preview</ModalHeader>

        <ModalBody as={Flex} direction="column" justifyContent="center">
          <ComponentToPrint mood={mood} ref={componentRef} />
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose} variant="secondary">
            Cancel
          </Button>

          <Button onClick={onButtonClick} variant="primary">
            Download as image (png)
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

// eslint-disable-next-line react/display-name
const ComponentToPrint = forwardRef<HTMLDivElement, { mood: MoodsQuery["moods"][number] }>(
  (props, ref) => {
    return (
      <div ref={ref}>
        <Box
          bg="red"
          bgGradient={`radial(${colors.ui.background01}, ${colors.ui.background02})`}
          color="gray.200"
          backgroundAttachment="fixed"
          textAlign="center"
          borderRadius="25px"
        >
          <Image
            src={emotions[props.mood.emotion].imageUrl}
            height="300px"
            width="300px"
            priority={true}
            quality={100}
            alt="Image of emotional cloud"
          />
          <Panel>
            <Subheading fontSize="xs" color="gray.500">
              {time.fromISO(props.mood.date).toLocaleString(time.DATETIME_SHORT)}
            </Subheading>
            <Flex mb={4} spacing={4} justifyContent="center" flexWrap="wrap">
              {props.mood.tags?.map(tag => (
                <Tag key={tag.name} bg="gray.700" color="gray.500" mr={1} mb={1}>
                  {tag.name}
                </Tag>
              ))}
            </Flex>
            <Heading as="h3" size="lg" mb={2}>
              I feel{" "}
              <span style={{ color: emotions[props.mood.emotion].color }}>
                {props.mood.emotion.toLowerCase()}
              </span>{" "}
              right now
            </Heading>
            <Text whiteSpace="pre-wrap">{props.mood.description}</Text>
            <Flex justifyContent="flex-end" w="full" mt={5} fontSize="sm">
              <HStack>
                <Text>made with</Text> <Icon as={AiFillHeart} color="red" /> <Text>by</Text>{" "}
                <strong>sturmglas.com</strong>
              </HStack>
            </Flex>
          </Panel>
        </Box>
      </div>
    );
  }
);
