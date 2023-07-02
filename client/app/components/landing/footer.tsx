import { Box, chakra, Container, Link, Stack, Text, VisuallyHidden } from "@chakra-ui/react";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { ReactNode } from "react";
import Image from "next/image";

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <chakra.button
      rounded="full"
      w={8}
      h={8}
      cursor="pointer"
      as="a"
      href={href}
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      transition="background 0.3s ease"
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export const Footer = () => {
  return (
    <Box>
      <Container as={Stack} maxW="6xl" py={4} spacing={4} justify="center" align="center">
        <Box position="relative" boxSize="100px">
          <Image
            src="/logo.png"
            placeholder="blur"
            layout="fill"
            objectFit="contain"
            blurDataURL="https://sturmglas.com/logo.png"
            quality={100}
          />
        </Box>
      </Container>

      <Box>
        <Container
          as={Stack}
          maxW="6xl"
          py={4}
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify={{ base: "center", md: "space-between" }}
          align={{ base: "center", md: "center" }}
        >
          <Text>
            © 2021 sturmglas. Made by{" "}
            <Link href="https://winnekes.com" isExternal>
              @winnekes
            </Link>
            . All rights reserved
          </Text>
        </Container>
      </Box>
    </Box>
  );
};
