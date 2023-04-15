import CustomLink from './components/CustomLink';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Text,
} from '@chakra-ui/react';

const Home = () => {
  return (
    <Box
      bgGradient="linear(to-b, #1A202C, #000000)"
      // backgroundImage="url('/robot-background.jpg')"
      backgroundSize="cover"
      backgroundPosition="center"
      color="white"
      minHeight="100vh"
    >
      <Box>
        <Container maxW="container.xl">
          <Flex alignItems="center" justifyContent="space-between" py={4}>
            <Box>
              <Image src="/robot3.jpeg" alt="Robot Logo" boxSize="50px" />
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
      <Box>
        <Container maxW="container.xl" pt={16}>
          <Flex alignItems="center" justifyContent="space-between">
            <Box w="50%">
              <Heading as="h1" size="2xl" mb={8}>
                Welcome to D-CAAS
              </Heading>
              <Text fontSize="xl" lineHeight="tall" mb={12}>
                D-CAAS is a platform where discussion around protocols can be
                facilitated. Create a forum and let your developers ask you
                questions. With our AI powered telegram bot, you can even
                interact on DCAAS with devs from your group chats, without
                visiting our platform.
              </Text>
              <Button
                as={CustomLink}
                href="/explore"
                bg="transparent"
                borderColor="white"
                borderWidth="2px"
                color="white"
              >
                Get Started
              </Button>
            </Box>
            <Box w="50%" h="50%">
              <Image src="/robot3.jpeg" alt="Robot Image" />
            </Box>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
