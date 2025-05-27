import { useState } from 'react'
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  Image,
  SimpleGrid,
  Stack,
  Text,
  VStack,
  HStack,
  useColorModeValue,
  Badge,
  Icon,
  Link,
} from '@chakra-ui/react'
import { FiStar, FiShoppingBag, FiArrowRight } from 'react-icons/fi'
import { Link as RouterLink } from 'react-router-dom'

// Mock data for products
const featuredProducts = [
  {
    id: 1,
    name: 'Brushed Raglan Sweatshirt',
    price: 195,
    rating: 4.5,
    reviews: 121,
    image: 'https://images.unsplash.com/photo-1614251056798-0a63eda2bb25?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    category: 'Sweater',
  },
  {
    id: 2,
    name: 'Cameryn Sash Tie Dress',
    price: 545,
    rating: 4.8,
    reviews: 35,
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    category: 'Dress',
  },
  {
    id: 3,
    name: 'Flex Sweatshirt',
    price: 175,
    rating: 4.2,
    reviews: 55,
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    category: 'Sweater',
  },
  {
    id: 4,
    name: 'Flex Sweatpants',
    price: 150,
    rating: 4.3,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    category: 'Pants',
  },
]

const HomePage = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box bg={useColorModeValue('gray.50', 'gray.900')} py={{ base: 10, md: 20 }}>
        <Container maxW="container.xl">
          <Flex
            direction={{ base: 'column', md: 'row' }}
            align="center"
            justify="space-between"
            gap={8}
          >
            <VStack
              align={{ base: 'center', md: 'flex-start' }}
              spacing={6}
              maxW={{ base: 'full', md: '50%' }}
              textAlign={{ base: 'center', md: 'left' }}
            >
              <Heading
                as="h1"
                size="3xl"
                fontWeight="bold"
                lineHeight="1.2"
              >
                FIND CLOTHES THAT MATCHES YOUR STYLE
              </Heading>
              <Text fontSize="lg" color={useColorModeValue('gray.600', 'gray.400')}>
                Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
              </Text>
              <Button
                size="lg"
                colorScheme="blackAlpha"
                bg="black"
                color="white"
                rightIcon={<FiShoppingBag />}
                borderRadius="full"
                px={8}
                _hover={{ bg: 'gray.800' }}
              >
                Shop Now
              </Button>
              
              <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4} width="full" mt={4}>
                <VStack>
                  <Heading size="lg">200+</Heading>
                  <Text>International Brands</Text>
                </VStack>
                <VStack>
                  <Heading size="lg">2,000+</Heading>
                  <Text>High-Quality Products</Text>
                </VStack>
                <VStack>
                  <Heading size="lg">30,000+</Heading>
                  <Text>Happy Customers</Text>
                </VStack>
                <VStack>
                  <Heading size="lg">100%</Heading>
                  <Text>Secure Checkout</Text>
                </VStack>
              </SimpleGrid>
            </VStack>
            
            <Box
              maxW={{ base: '100%', md: '50%' }}
              overflow="hidden"
              borderRadius="xl"
            >
              <Image
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                alt="Fashion model"
                objectFit="cover"
                w="full"
              />
            </Box>
          </Flex>
        </Container>
      </Box>

      {/* Featured Products Section */}
      <Box py={16}>
        <Container maxW="container.xl">
          <VStack spacing={12}>
            <VStack spacing={4} textAlign="center">
              <Heading as="h2" size="xl">
                FEATURED PRODUCTS
              </Heading>
              <Text color={useColorModeValue('gray.600', 'gray.400')} maxW="2xl">
                Explore our handpicked collection of the season's most coveted styles.
              </Text>
            </VStack>

            <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </SimpleGrid>

            <Button
              as={RouterLink}
              to="/shop"
              variant="outline"
              colorScheme="blackAlpha"
              borderColor="black"
              color="black"
              size="lg"
              rightIcon={<FiArrowRight />}
              borderRadius="full"
              px={8}
              _hover={{ bg: 'gray.100' }}
            >
              View All Products
            </Button>
          </VStack>
        </Container>
      </Box>

      {/* Browse by Category */}
      <Box py={16} bg={useColorModeValue('gray.50', 'gray.900')}>
        <Container maxW="container.xl">
          <VStack spacing={12}>
            <VStack spacing={4} textAlign="center">
              <Heading as="h2" size="xl">
                BROWSE BY CATEGORY
              </Heading>
              <Text color={useColorModeValue('gray.600', 'gray.400')} maxW="2xl">
                Find exactly what you're looking for by shopping our curated categories.
              </Text>
            </VStack>

            <SimpleGrid columns={{ base: 2, md: 4 }} spacing={8}>
              <CategoryCard name="Men" image="https://images.unsplash.com/photo-1617137968427-85924c800a22?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" />
              <CategoryCard name="Women" image="https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" />
              <CategoryCard name="Kids" image="https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" />
              <CategoryCard name="Accessories" image="https://images.unsplash.com/photo-1576053139778-7e32f2ae3cfd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" />
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* Why Choose Us */}
      <Box py={16}>
        <Container maxW="container.xl">
          <VStack spacing={12}>
            <VStack spacing={4} textAlign="center">
              <Heading as="h2" size="xl">
                WHY CHOOSE US
              </Heading>
              <Text color={useColorModeValue('gray.600', 'gray.400')} maxW="2xl">
                We're dedicated to providing you with the best shopping experience possible.
              </Text>
            </VStack>

            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
              <FeatureCard 
                title="Free Shipping" 
                description="Enjoy free shipping on all orders above $100" 
                icon="🚚" 
              />
              <FeatureCard 
                title="Easy Returns" 
                description="Return any item within 30 days, no questions asked" 
                icon="↩️" 
              />
              <FeatureCard 
                title="Secure Checkout" 
                description="Your data is protected with industry-leading encryption" 
                icon="🔒" 
              />
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>
    </Box>
  )
}

const ProductCard = ({ product }) => {
  return (
    <Box
      borderRadius="lg"
      overflow="hidden"
      bg={useColorModeValue('white', 'gray.800')}
      transition="all 0.3s"
      _hover={{ transform: 'translateY(-5px)', shadow: 'md' }}
    >
      <Link as={RouterLink} to={`/product/${product.id}`}>
        <Box position="relative" h="300px" overflow="hidden">
          <Image
            src={product.image}
            alt={product.name}
            w="full"
            h="full"
            objectFit="cover"
            transition="transform 0.3s"
            _hover={{ transform: 'scale(1.05)' }}
          />
        </Box>
      </Link>

      <Box p={4}>
        <Text fontSize="sm" color="gray.500" mb={1}>
          {product.category}
        </Text>
        <Link
          as={RouterLink}
          to={`/product/${product.id}`}
          fontWeight="semibold"
          fontSize="lg"
          display="block"
          mb={2}
          _hover={{ color: 'primary.500', textDecoration: 'none' }}
        >
          {product.name}
        </Link>

        <Flex justify="space-between" align="center">
          <Text fontWeight="bold" fontSize="lg">
            ${product.price}
          </Text>
          <HStack>
            <Icon as={FiStar} color="yellow.400" />
            <Text fontSize="sm">
              {product.rating} ({product.reviews})
            </Text>
          </HStack>
        </Flex>
      </Box>
    </Box>
  )
}

const CategoryCard = ({ name, image }) => {
  return (
    <Box
      as={RouterLink}
      to={`/category/${name.toLowerCase()}`}
      position="relative"
      borderRadius="lg"
      overflow="hidden"
      h="200px"
      _hover={{ transform: 'scale(1.02)', transition: 'all 0.3s' }}
    >
      <Image
        src={image}
        alt={name}
        w="full"
        h="full"
        objectFit="cover"
        filter="brightness(0.8)"
      />
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bg="blackAlpha.300"
        transition="all 0.3s"
        _hover={{ bg: 'blackAlpha.500' }}
      >
        <Text
          color="white"
          fontWeight="bold"
          fontSize="xl"
          textAlign="center"
        >
          {name}
        </Text>
      </Box>
    </Box>
  )
}

const FeatureCard = ({ title, description, icon }) => {
  return (
    <VStack
      p={8}
      bg={useColorModeValue('white', 'gray.800')}
      borderRadius="lg"
      shadow="sm"
      spacing={4}
      align="center"
      textAlign="center"
      transition="all 0.3s"
      _hover={{ shadow: 'md', transform: 'translateY(-5px)' }}
    >
      <Text fontSize="4xl">{icon}</Text>
      <Heading as="h3" size="md">
        {title}
      </Heading>
      <Text color={useColorModeValue('gray.600', 'gray.400')}>{description}</Text>
    </VStack>
  )
}

export default HomePage