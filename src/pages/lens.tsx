import React from 'react';
import {
  Box,
  Heading,
  Link,
  Image,
  Text,
  Divider,
  HStack,
  // Tag,
  Wrap,
  WrapItem,
  // SpaceProps,
  Container,
  Button,
  Flex,
  VStack,
} from '@chakra-ui/react';
import CustomLink from './components/CustomLink';
// interface IBlogTags {
//   tags: Array<string>;
//   marginTop?: SpaceProps['marginTop'];
// }

// const BlogTags: React.FC<IBlogTags> = (props) => {
//   return (
//     <HStack spacing={2} marginTop={props.marginTop}>
//       {props.tags.map((tag) => {
//         return (
//           <Tag size={'md'} variant="solid" colorScheme="orange" key={tag}>
//             {tag}
//           </Tag>
//         );
//       })}
//     </HStack>
//   );
// };

interface BlogAuthorProps {
  date: Date;
  name: string;
}

export const BlogAuthor: React.FC<BlogAuthorProps> = (props) => {
  return (
    <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
      <Image
        borderRadius="full"
        boxSize="40px"
        src="/lens.jpeg"
        alt={`Avatar of ${props.name}`}
      />
      <Text fontWeight="medium">{props.name}</Text>
      <Text>—</Text>
      <Text>{props.date.toLocaleDateString()}</Text>
    </HStack>
  );
};

const ArticleList = () => {
  return (
    <Container
      maxW={'7xl'}
      p="3"
      bgGradient="linear(to-b, #1A202C, #000000)"
      textColor="white"
    >
      <Box>
        <Container maxW="container.xl">
          <Flex alignItems="center" justifyContent="space-between">
            <Box>
              <Button as={CustomLink} href="/" bg="transparent" variant="link">
                <Image
                  src="/robot3.jpeg"
                  alt="Robot Logo"
                  width={'50'}
                  height={'50'}
                />
              </Button>
            </Box>
            <Box>
              <Button
                bg="transparent"
                borderColor="white"
                borderWidth="2px"
                color="white"
              >
                Sign In
              </Button>
            </Box>
          </Flex>
        </Container>
      </Box>
      <Heading as="h1">Lens support for Devs</Heading>
      <Box
        marginTop={{ base: '1', sm: '5' }}
        display="flex"
        flexDirection={{ base: 'column', sm: 'row' }}
        justifyContent="space-between"
      >
        <Box
          display="flex"
          flex="1"
          marginRight="3"
          position="relative"
          alignItems="center"
        >
          <Box
            width={{ base: '100%', sm: '85%' }}
            zIndex="2"
            marginLeft={{ base: '0', sm: '5%' }}
            marginTop="5%"
          >
            <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
              <Image
                borderRadius="lg"
                src="/lens.jpeg"
                alt="some good alt text"
                objectFit="contain"
              />
            </Link>
          </Box>
          <Box zIndex="1" width="100%" position="absolute" height="100%">
            <Box
            // bgGradient={useColorModeValue(
            //   'radial(orange.600 1px, transparent 1px)',
            //   'radial(orange.300 1px, transparent 1px)',
            // )}
            // backgroundSize="20px 20px"
            // opacity="0.4"
            // height="100%"
            />
          </Box>
        </Box>
        <Box
          display="flex"
          flex="1"
          flexDirection="column"
          justifyContent="center"
          marginTop={{ base: '3', sm: '0' }}
        >
          <Heading marginTop="1">
            <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
              Blog article title
            </Link>
          </Heading>

          <BlogAuthor name="John Doe" date={new Date('2021-04-06T19:01:27Z')} />
        </Box>
      </Box>
      <Heading as="h2" marginTop="5">
        Latest Discussions
      </Heading>
      <Divider marginTop="5" />
      <Wrap spacing="30px" marginTop="5">
        <WrapItem width={{ base: '100%', sm: '45%', md: '45%', lg: '30%' }}>
          <Box w="100%">
            <Box borderRadius="lg" overflow="hidden">
              <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
                <Image
                  transform="scale(1.0)"
                  src="/lens.jpeg"
                  alt="some text"
                  objectFit="contain"
                  width="100%"
                  transition="0.3s ease-in-out"
                  _hover={{
                    transform: 'scale(1.05)',
                  }}
                />
              </Link>
            </Box>

            <Heading fontSize="xl" marginTop="2">
              <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
                Question Title
              </Link>
            </Heading>
            <Text as="p" fontSize="md" marginTop="2">
              Answer Answer Answer Answer Answer Answer
            </Text>
            <BlogAuthor
              name="John Doe"
              date={new Date('2021-04-06T19:01:27Z')}
            />
          </Box>
        </WrapItem>
      </Wrap>
      <VStack paddingTop="40px" spacing="2" alignItems="flex-start">
        <Heading as="h2">About Lens</Heading>
        <Text as="p" fontSize="lg">
          Lens Protocol is a composable and decentralized social graph, ready
          for you to build on so you can focus on creating a great experience,
          not scaling your users.
        </Text>
      </VStack>
    </Container>
  );
};

export default ArticleList;
