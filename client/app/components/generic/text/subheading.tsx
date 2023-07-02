import { ComponentWithAs, Text, TextProps } from "@chakra-ui/react";

export const Subheading: ComponentWithAs<"p", TextProps> = props => {
  const { children } = props;
  return (
    <Text textTransform="uppercase" {...props}>
      {children}
    </Text>
  );
};
