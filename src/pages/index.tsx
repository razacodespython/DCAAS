import CustomLink from './components/CustomLink';
import { Box, Heading, Container, Text, Stack, Button } from '@chakra-ui/react';

export default function Home() {
  return (
    <>
      <Container maxW={'3xl'} paddingBottom={'0'}>
        <Stack
          as={Box}
          textAlign={'center'}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20 }}
          paddingBottom={'0'}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}
          >
            Deliver 24/7 support
            <br />
            <Text as={'span'} color={'green.400'}>
              to your developers
            </Text>
          </Heading>
          <Text color={'gray.500'}>
            DCAAS is a platform where discussion around protocols can be
            facilitated. Create a forum and let your Devs ask you questions.
            With our AI powered telegram bot, you can even interact on DCAAS
            with devs from your group chats.
          </Text>
          <Stack
            direction={'row'}
            spacing={3}
            align={'center'}
            alignSelf={'center'}
            position={'relative'}
          >
            <Button
              as={CustomLink}
              href="/explore"
              colorScheme={'green'}
              bg={'green.400'}
              rounded={'full'}
              px={6}
              _hover={{
                bg: 'green.500',
              }}
            >
              Sign Up
            </Button>
            <Button
              as={CustomLink}
              href="/company"
              backgroundColor={'white'}
              border={'1px'}
              borderColor={'black'}
              rounded={'full'}
              px={6}
            >
              Learn More
            </Button>
          </Stack>
          <Stack
            direction={'column'}
            spacing={3}
            align={'center'}
            alignSelf={'center'}
            position={'relative'}
          ></Stack>
        </Stack>
      </Container>
    </>
  );
}
