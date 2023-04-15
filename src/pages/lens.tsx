import React, { useState, useEffect } from 'react';
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
  Input,
} from '@chakra-ui/react';
import CustomLink from './components/CustomLink';
import { ethers } from 'ethers';
import { client, challenge, authenticate, getProfile } from '@/lensapi';
import abi from '@/abi.json';
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

const contractAddress = '0x8E964732c29534e6C133d296cD2392e00969DCFD';

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
  /* local state variables to hold user's address and access token */
  const [address, setAddress] = useState();
  const [token, setToken] = useState();
  const [handle, setHandle] = useState('');
  const [contract, setContract] = useState<any>();
  const [pageData, setPageData] = useState<any>(null);
  const [input, setInput] = useState('');
  useEffect(() => {
    /* when the app loads, check to see if the user has already connected their wallet */
    checkConnection();
  }, []);
  async function checkConnection() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.listAccounts();
    if (accounts.length) {
      setAddress(accounts[0]);
    }
  }
  async function connect() {
    /* this allows the user to connect their wallet */
    const account = await window.ethereum.send('eth_requestAccounts');
    if (account.result.length) {
      setAddress(account.result[0]);
    }
  }
  async function login() {
    try {
      /* first request the challenge from the API server */
      const challengeInfo = await client.query({
        query: challenge,
        variables: { address },
      });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      /* ask the user to sign a message with the challenge info returned from the server */
      const signature = await signer.signMessage(
        challengeInfo.data.challenge.text,
      );
      /* authenticate the user */
      const authData = await client.mutate({
        mutation: authenticate,
        variables: {
          address,
          signature,
        },
      });
      /* if user authentication is successful, you will receive an accessToken and refreshToken */
      const {
        data: {
          authenticate: { accessToken },
        },
      } = authData;
      console.log({ accessToken });
      setToken(accessToken);
      const profileInfo = await client.query({
        query: getProfile,
        variables: {
          address,
        },
      });
      console.log(profileInfo);
      const { data } = profileInfo;
      setHandle(data.defaultProfile.handle);

      const connectedContract = new ethers.Contract(
        contractAddress,
        abi,
        signer,
      );
      setContract(connectedContract);

      const posts = await connectedContract.getAllPosts();
      const postArray = [];
      for (let index = 0; index < posts.length; index++) {
        const comments = await connectedContract.fetchPostComments(index);
        console.log(comments[0]);
        const post = posts[index];
        console.log(post);
        postArray.push({
          question: { content: post.content, author: post.lensHandle },
          answer: {
            content: comments[0]?.content,
            author: comments[0]?.lensHandle,
          },
        });
      }
      setPageData(postArray);
    } catch (err) {
      console.log('Error signing in: ', err);
    }
  }
  console.log({ pageData });
  console.log({ input });
  const handleSubmit = async () => {
    const trx = await contract?.createPost(handle, input);
    await trx.wait();
    const posts = await contract.getAllPosts();
    const postArray = [];
    for (let index = 0; index < posts.length; index++) {
      const comments = await contract.fetchPostComments(index);
      console.log(comments[0]);
      const post = posts[index];
      console.log(post);
      postArray.push({
        question: { content: post.content, author: post.lensHandle },
        answer: {
          content: comments[0]?.content,
          author: comments[0]?.lensHandle,
        },
      });
    }
    setPageData(postArray);
  };
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
              {/* {
                handle ?
                (<Text>Handle</Text>) :
                (
                  <Button
                bg="transparent"
                borderColor="white"
                borderWidth="2px"
                color="white"
              >
                Sign In
              </Button>
                )
              } */}
              {/* if the user has not yet connected their wallet, show a connect button */}
              {!address && (
                <Button
                  bg="transparent"
                  borderColor="white"
                  borderWidth="2px"
                  color="white"
                  onClick={connect}
                >
                  Connect
                </Button>
              )}
              {/* if the user has connected their wallet but has not yet authenticated, show them a login button */}
              {address && !token && (
                <Button
                  onClick={login}
                  bg="transparent"
                  borderColor="white"
                  borderWidth="2px"
                  color="white"
                >
                  Login
                </Button>
              )}
              {/* once the user has authenticated, show them a success message */}
              {address && token && (
                <Text
                  bg="transparent"
                  borderColor="white"
                  borderWidth="2px"
                  padding={2}
                  color="white"
                >
                  {handle}
                </Text>
              )}
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
              Ask a Question about Lens
            </Link>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Start Typing"
            />
            <Button
              bg="transparent"
              borderColor="white"
              borderWidth="2px"
              color="white"
              onClick={() => handleSubmit()}
            >
              Submit
            </Button>
          </Heading>
        </Box>
      </Box>

      <Heading as="h2" marginTop="5">
        Latest Discussions
      </Heading>
      <Divider marginTop="5" />
      {pageData &&
        pageData.map((pg: any) => {
          return (
            <Wrap key={pg.content} spacing="30px" marginTop="5">
              <WrapItem
                width={{ base: '100%', sm: '45%', md: '45%', lg: '30%' }}
              >
                <Box w="100%">
                  <Box borderRadius="lg" overflow="hidden">
                    <Link
                      textDecoration="none"
                      _hover={{ textDecoration: 'none' }}
                    >
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
                    <Link
                      textDecoration="none"
                      _hover={{ textDecoration: 'none' }}
                    >
                      {pg.question.content}
                    </Link>
                    <Link
                      textDecoration="none"
                      _hover={{ textDecoration: 'none' }}
                    >
                      - {pg.question.author}
                    </Link>
                  </Heading>
                  <Text as="p" fontSize="md" marginTop="2">
                    {pg.answer.content}
                  </Text>
                  <Text as="p" fontSize="md" marginTop="2">
                    {pg.answer.author}
                  </Text>
                </Box>
              </WrapItem>
            </Wrap>
          );
        })}

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
