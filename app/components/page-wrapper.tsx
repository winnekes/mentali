import { FunctionComponent } from "react";
import { Box, Container, Heading, useMediaQuery } from "@chakra-ui/react";
import { spacing, width } from "../styles/theme";
import { DesktopNavigation } from "./navigation/desktop-navigation";
import { MobileNavigation } from "./navigation/mobile-navigation";
import { Subtitle, Title } from "./text/titles";

type Props = {
  pageTitle?: string;
  pageSubtitle?: string;
};

export const PageWrapper: FunctionComponent<Props> = ({
  children,
  ...props
}) => {
  const [isDesktop] = useMediaQuery("(min-width: 62em)");
  return (
    <>
      {!isDesktop ? (
        <MobilePageWrapper {...props}>{children}</MobilePageWrapper>
      ) : (
        <DesktopPageWrapper {...props}>{children}</DesktopPageWrapper>
      )}
    </>
  );
};

const DesktopPageWrapper: FunctionComponent<Props> = ({
  children,
  ...props
}) => {
  return (
    <Container maxW={width} py={[6, 0]}>
      <DesktopNavigation />
      <Box mx={spacing}>
        <Title>{props.pageTitle}</Title>
        <Subtitle>{props.pageSubtitle}</Subtitle>
      </Box>
      <Box my={spacing}>{children}</Box>
    </Container>
  );
};

const MobilePageWrapper: FunctionComponent<Props> = ({
  children,
  ...props
}) => {
  return (
    <>
      <Container maxW={width} px={spacing}>
        <Box p={spacing}>
          <Title>{props.pageTitle}</Title>
          <Subtitle>{props.pageSubtitle}</Subtitle>
        </Box>

        {children}
      </Container>
      <MobileNavigation />
    </>
  );
};
