import { Box, Container, Flex, Text, VStack, Link } from "@chakra-ui/react";
import { useEvents, useComments, useVenues } from "../integrations/supabase/index.js";

const Index = () => {
  const { data: events, error: eventsError } = useEvents();
  const { data: comments, error: commentsError } = useComments();
  const { data: venues, error: venuesError } = useVenues();

  if (eventsError || commentsError || venuesError) {
    return <Text>Error loading data</Text>;
  }

  return (
    <Box>
      {/* Navigation Bar */}
      <Box as="nav" bg="blue.500" color="white" py={4}>
        <Container maxW="container.lg">
          <Flex justify="space-between" align="center">
            <Text fontSize="xl" fontWeight="bold">My Website</Text>
            <Flex>
              <Link href="#" mx={2}>Home</Link>
              <Link href="#" mx={2}>About</Link>
              <Link href="#" mx={2}>Contact</Link>
            </Flex>
          </Flex>
        </Container>
      </Box>

      {/* Main Content Area */}
      <Container maxW="container.lg" py={8}>
        <VStack spacing={4}>
          <Text fontSize="2xl">Welcome to My Website</Text>
          <Text>This is a basic structure of a React app with Chakra UI.</Text>
        <Box>
            <Text fontSize="xl" fontWeight="bold">Events</Text>
            {events?.map(event => (
              <Box key={event.id} p={4} borderWidth={1} borderRadius="md">
                <Text fontSize="lg">{event.name}</Text>
                <Text>{event.description}</Text>
              </Box>
            ))}
          </Box>
          <Box>
            <Text fontSize="xl" fontWeight="bold">Comments</Text>
            {comments?.map(comment => (
              <Box key={comment.id} p={4} borderWidth={1} borderRadius="md">
                <Text>{comment.content}</Text>
              </Box>
            ))}
          </Box>
          <Box>
            <Text fontSize="xl" fontWeight="bold">Venues</Text>
            {venues?.map(venue => (
              <Box key={venue.id} p={4} borderWidth={1} borderRadius="md">
                <Text fontSize="lg">{venue.name}</Text>
                <Text>{venue.location}</Text>
              </Box>
            ))}
          </Box>
        </VStack>
      </Container>

      {/* Footer */}
      <Box as="footer" bg="gray.700" color="white" py={4} mt={8}>
        <Container maxW="container.lg">
          <Text textAlign="center">&copy; 2023 My Website. All rights reserved.</Text>
        </Container>
      </Box>
    </Box>
  );
};

export default Index;