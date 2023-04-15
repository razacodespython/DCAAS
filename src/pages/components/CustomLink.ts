import { chakra } from '@chakra-ui/react';
import NextLink from 'next/link';

const CustomLink = chakra(NextLink, {
  shouldForwardProp: (prop: any) =>
    ['href', 'target', 'children'].includes(prop),
});

export default CustomLink;
