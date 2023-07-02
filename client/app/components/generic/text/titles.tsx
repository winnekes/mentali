import {
  ComponentWithAs,
  Heading,
  HeadingProps,
  useBreakpointValue,
  useMediaQuery,
} from "@chakra-ui/react";

export const Title: ComponentWithAs<"h1", HeadingProps> = ({ children, ...props }) => {
  return (
    <Heading as="h1" size="xl" mb={2} {...props}>
      {children}
    </Heading>
  );
};

export const Subtitle: ComponentWithAs<"h2", HeadingProps> = ({ children, ...props }) => {
  const fontSize = useBreakpointValue({ base: "sm", lg: "md" });
  return (
    <Heading as="h2" size={fontSize} mb={2} {...props}>
      {children}
    </Heading>
  );
};

export const PanelTitle: ComponentWithAs<"h3", HeadingProps> = ({ children, ...props }) => {
  return (
    <Heading as="h2" size="lg" mb="2rem" {...props}>
      {children}
    </Heading>
  );
};
