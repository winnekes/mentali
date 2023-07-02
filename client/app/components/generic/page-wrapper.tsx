import { FunctionComponent, useEffect, useState } from "react";
import { Box, Container } from "@chakra-ui/react";
import { spacing, width } from "../../styles/theme";
import { Footer } from "../landing/footer";
import { DesktopNavigation } from "../navigation/desktop-navigation";
import { MobileNavigation } from "../navigation/mobile-navigation";
import { Splash } from "./splash";
import { Subtitle, Title } from "./text/titles";

type Props = {
  pageTitle?: string;
  pageSubtitle?: string;
  hideNavigation?: boolean;
  showFooter?: boolean;
  fullWidth?: boolean;
};

export const PageWrapper: FunctionComponent<Props> = ({ children, ...props }) => {
  return (
    <>
      <MobilePageWrapper {...props}>{children}</MobilePageWrapper>
      <DesktopPageWrapper {...props}>{children}</DesktopPageWrapper>
    </>
  );
};

const DesktopPageWrapper: FunctionComponent<Props> = ({ children, ...props }) => {
  return (
    <Box display={{ base: "none", sm: "none", md: "none", lg: "block" }}>
      <Container maxW={props.fullWidth ? "70%" : width} py={[6]}>
        {!props.hideNavigation && <DesktopNavigation />}
        <Box mx={spacing}>
          <Title>{props.pageTitle}</Title>
          <Subtitle>{props.pageSubtitle}</Subtitle>
        </Box>
        <Box my={spacing}>{children}</Box>
      </Container>
      {props.showFooter && <Footer />}
    </Box>
  );
};

const MobilePageWrapper: FunctionComponent<Props> = ({ children, ...props }) => {
  return (
    <Box display={{ base: "block", lg: "none" }}>
      <Container maxW={width} px={spacing} pb={120}>
        <Box p={spacing}>
          <Title>{props.pageTitle}</Title>
          <Subtitle>{props.pageSubtitle}</Subtitle>
        </Box>

        {children}
      </Container>
      {!props.hideNavigation && <MobileNavigation />}
      {props.showFooter && <Footer />}
    </Box>
  );
};
