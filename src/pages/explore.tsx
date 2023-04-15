// pages/index.tsx
import {
  Box,
  Flex,
  Heading,
  VStack,
  Grid,
  useColorModeValue,
  Container,
  Button,
} from '@chakra-ui/react';
import { FaRocket, FaCode, FaUsers, FaStar, FaArrowLeft } from 'react-icons/fa';
import { ReactElement } from 'react';
import ChakraLink from './components/ChakraLink';

interface TileProps {
  icon: ReactElement;
  title: string;
  description: string;
  href: string;
}
const Tile: React.FC<TileProps> = ({ icon, title, description, href }) => {
  const bgColor = useColorModeValue('gray.100', 'gray.700');
  const color = useColorModeValue('gray.800', 'gray.200');

  return (
    <VStack
      w="100%"
      h="100%"
      p={8}
      pl={4}
      pr={4}
      spacing={6}
      alignItems="flex-start"
      borderRadius="xl"
      borderWidth="1px"
      borderColor={color}
      bgColor={bgColor}
      cursor="pointer"
      transition="all 0.2s"
      _hover={{ boxShadow: 'xl' }}
    >
      <ChakraLink href={href} display="flex" flexDirection="column">
        <Box fontSize="5xl" color={color}>
          {icon}
        </Box>
        <Heading fontSize="2xl">{title}</Heading>
      </ChakraLink>
      <Box color={color}>{description}</Box>
    </VStack>
  );
};

const Explore: React.FC = () => {
  return (
    <Container maxW="container.xl" minHeight="100vh">
      <Flex alignItems="center" justifyContent="flex-start" mt={4}>
        <ChakraLink href="/" display="inline-flex" alignItems="center">
          <Button as="span" href="/" variant="ghost" leftIcon={<FaArrowLeft />}>
            Go Back
          </Button>
        </ChakraLink>
      </Flex>
      <Flex alignItems="center" justifyContent="center" flexGrow={1}>
        <Grid templateColumns="repeat(2, 1fr)" gap={8}>
          <Tile
            icon={<FaRocket />}
            title="Fast &amp; Efficient"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque suscipit."
            href="/lens"
          />
          <Tile
            icon={<FaCode />}
            title="Quality Code"
            description="Proin fringilla urna nulla, ut sagittis urna facilisis ut. Cras bibendum."
            href="/quality-code"
          />
          <Tile
            icon={<FaUsers />}
            title="Great Support"
            description="Suspendisse eu arcu id magna facilisis egestas. Aliquam ultrices odio."
            href="/great-support"
          />
          <Tile
            icon={<FaStar />}
            title="Top-rated Service"
            description="Morbi ac purus non mi tristique tristique. Donec ut ante id ante efficitur."
            href="/top-rated-service"
          />
        </Grid>
      </Flex>
    </Container>
  );
};

export default Explore;
