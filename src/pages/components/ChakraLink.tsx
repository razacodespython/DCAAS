import { Box, BoxProps } from '@chakra-ui/react';
import NextLink from 'next/link';
import { ReactNode } from 'react';

interface ChakraLinkProps extends BoxProps {
  href: string;
  children: ReactNode;
}

const ChakraLink: React.FC<ChakraLinkProps> = ({
  href,
  children,
  ...props
}) => {
  return (
    <NextLink href={href} passHref>
      <Box as="a" {...props}>
        {children}
      </Box>
    </NextLink>
  );
};

export default ChakraLink;
