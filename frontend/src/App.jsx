import { useState } from 'react'
import { Box, Container, Heading, Text, VStack, Image, Button, useColorMode, Flex, IconButton } from '@chakra-ui/react'
import { SunIcon, MoonIcon } from '@chakra-ui/icons'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Container maxW="container.xl" py={8}>
      <Flex justifyContent="flex-end" mb={4}>
        <IconButton
          icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          onClick={toggleColorMode}
          variant="ghost"
          aria-label="Toggle color mode"
        />
      </Flex>
      
      <VStack spacing={8} textAlign="center">
        <Heading as="h1" size="2xl">Welcome to Relaxee</Heading>
        <Text fontSize="xl">Your personal relaxation and meditation companion</Text>
        
        <Box boxSize="sm">
          <Image 
            src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" 
            alt="Relaxation" 
            borderRadius="md"
            fallbackSrc="https://via.placeholder.com/500"
          />
        </Box>
        
        <VStack spacing={4}>
          <Heading as="h2" size="lg">Features coming soon:</Heading>
          <Text>Guided Meditation Sessions</Text>
          <Text>Relaxing Soundscapes</Text>
          <Text>Sleep Stories</Text>
          <Text>Breathing Exercises</Text>
        </VStack>
        
        <Button 
          colorScheme="teal" 
          size="lg"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </Button>
      </VStack>
    </Container>
  )
}

export default App