import { useState } from 'react'
import { useParams } from 'react-router-dom'
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
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Divider,
  Icon,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@chakra-ui/react'
import { FiStar, FiShoppingBag, FiHeart, FiTruck, FiRefreshCw, FiShield } from 'react-icons/fi'
import { Link as RouterLink } from 'react-router-dom'

// Mock product data
const products = [
  {
    id: 1,
    name: 'Brushed Raglan Sweatshirt',
    price: 195,
    rating: 4.5,
    reviews: 121,
    description: 'Meet the softest, coziest sweatshirt you\'ll ever own. Made from premium cotton blend, this sweatshirt features a relaxed fit with raglan sleeves for a vintage athletic look.',
    details: {
      material: '85% Cotton, 15% Polyester',
      fit: 'Relaxed fit',
      care: 'Machine wash cold, tumble dry low',
      features: 'Ribbed cuffs and hem, Raglan sleeves',
    },
    images: [
      'https://images.unsplash.com/photo-1614251056798-0a63eda2bb25?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    ],
    colors: ['Black', 'Gray', 'White'],
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'Sweater',
  },
  {
    id: 2,
    name: 'Cameryn Sash Tie Dress',
    price: 545,
    rating: 4.8,
    reviews: 35,
    description: 'A versatile dress that can be dressed up or down. Features a flattering sash tie at the waist and a comfortable, flowy silhouette.',
    details: {
      material: '100% Viscose',
      fit: 'Regular fit',
      care: 'Hand wash cold, line dry',
      features: 'Sash tie waist, V-neck, Short sleeves',
    },
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1554568218-0f1715e72254?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1612336307429-8a898d10e223?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    ],
    colors: ['Blue', 'Red', 'Green'],
    sizes: ['XS', 'S', 'M', 'L'],
    category: 'Dress',
  },
];

// Related products
const relatedProducts = [
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
  {
    id: 5,
    name: 'Pink Fleece Sweatpants',
    price: 195,
    rating: 4.1,
    reviews: 23,
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    category: 'Pants',
  },
  {
    id: 6,
    name: 'Lite Sweatpants',
    price: 150,
    rating: 4.0,
    reviews: 55,
    image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    category: 'Pants',
  },
];

const ProductPage = () => {
  const { id } = useParams();
  const productId = parseInt(id);
  const product = products.find(p => p.id === productId) || products[0];
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);

  return (
    <Box>
      <Container maxW="container.xl" py={8}>
        {/* Breadcrumb */}
        <Breadcrumb fontSize="sm" color="gray.500" mb={8}>
          <BreadcrumbItem>
            <BreadcrumbLink as={RouterLink} to="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink as={RouterLink} to="/shop">Shop</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink>{product.name}</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        {/* Product Details */}
        <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={10}>
          {/* Product Images */}
          <Box>
            <Box 
              borderRadius="lg" 
              overflow="hidden" 
              mb={4}
              height="500px"
            >
              <Image 
                src={product.images[selectedImage]} 
                alt={product.name} 
                width="100%"
                height="100%"
                objectFit="cover"
              />
            </Box>
            <Flex gap={4} justifyContent="center">
              {product.images.map((image, index) => (
                <Box 
                  key={index} 
                  borderWidth={selectedImage === index ? '2px' : '1px'}
                  borderColor={selectedImage === index ? 'primary.500' : 'gray.200'}
                  borderRadius="md"
                  overflow="hidden"
                  width="80px"
                  height="80px"
                  cursor="pointer"
                  onClick={() => setSelectedImage(index)}
                >
                  <Image 
                    src={image} 
                    alt={`${product.name} ${index + 1}`} 
                    width="100%"
                    height="100%"
                    objectFit="cover"
                  />
                </Box>
              ))}
            </Flex>
          </Box>

          {/* Product Info */}
          <Box>
            <VStack align="start" spacing={6}>
              <Box>
                <Text fontSize="sm" color="gray.500">{product.category}</Text>
                <Heading as="h1" size="xl" mt={1}>{product.name}</Heading>
                <HStack mt={2}>
                  <HStack color="yellow.400">
                    {[...Array(5)].map((_, i) => (
                      <Icon 
                        key={i} 
                        as={FiStar} 
                        fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                      />
                    ))}
                  </HStack>
                  <Text fontSize="sm" color="gray.500">{product.rating} ({product.reviews} Reviews)</Text>
                </HStack>
              </Box>

              <Text fontSize="2xl" fontWeight="bold">${product.price}</Text>
              
              <Text>{product.description}</Text>
              
              <Divider />
              
              {/* Color Selection */}
              <Box width="100%">
                <Text fontWeight="medium" mb={2}>Select Color: {selectedColor}</Text>
                <HStack spacing={3}>
                  {product.colors.map(color => (
                    <Box 
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      bg={color.toLowerCase()}
                      width="32px"
                      height="32px"
                      borderRadius="full"
                      cursor="pointer"
                      borderWidth={selectedColor === color ? '2px' : '0px'}
                      borderColor="primary.500"
                      _hover={{ transform: 'scale(1.1)' }}
                      transition="all 0.2s"
                    />
                  ))}
                </HStack>
              </Box>
              
              {/* Size Selection */}
              <Box width="100%">
                <Text fontWeight="medium" mb={2}>Select Size: {selectedSize}</Text>
                <HStack spacing={3}>
                  {product.sizes.map(size => (
                    <Box 
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      bg={selectedSize === size ? 'black' : 'white'}
                      color={selectedSize === size ? 'white' : 'black'}
                      borderWidth="1px"
                      borderColor="gray.200"
                      width="40px"
                      height="40px"
                      borderRadius="md"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      cursor="pointer"
                      _hover={{ bg: selectedSize === size ? 'black' : 'gray.100' }}
                      transition="all 0.2s"
                    >
                      {size}
                    </Box>
                  ))}
                </HStack>
              </Box>
              
              {/* Quantity */}
              <Box width="100%">
                <Text fontWeight="medium" mb={2}>Quantity:</Text>
                <Flex>
                  <NumberInput 
                    defaultValue={1} 
                    min={1} 
                    max={10}
                    value={quantity}
                    onChange={(valueString) => setQuantity(parseInt(valueString))}
                    maxW="100px"
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </Flex>
              </Box>
              
              {/* Add to Cart */}
              <HStack width="100%" spacing={4}>
                <Button 
                  leftIcon={<FiShoppingBag />}
                  colorScheme="blackAlpha"
                  bg="black"
                  size="lg"
                  flex={1}
                  borderRadius="full"
                >
                  Add to Cart
                </Button>
                <Button
                  leftIcon={<FiHeart />}
                  variant="outline"
                  size="lg"
                  borderRadius="full"
                >
                  Wishlist
                </Button>
              </HStack>
              
              {/* Shipping Info */}
              <VStack align="start" spacing={4} width="100%" bg="gray.50" p={4} borderRadius="md">
                <HStack>
                  <Icon as={FiTruck} />
                  <Text>Free shipping on orders over $50</Text>
                </HStack>
                <HStack>
                  <Icon as={FiRefreshCw} />
                  <Text>Free 30-day returns</Text>
                </HStack>
                <HStack>
                  <Icon as={FiShield} />
                  <Text>2-year warranty</Text>
                </HStack>
              </VStack>
            </VStack>
          </Box>
        </Grid>
        
        {/* Product Details Tabs */}
        <Box mt={16}>
          <Tabs colorScheme="blackAlpha">
            <TabList>
              <Tab fontWeight="medium">Product Details</Tab>
              <Tab fontWeight="medium">Care Instructions</Tab>
              <Tab fontWeight="medium">Shipping & Returns</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <VStack align="start" spacing={4}>
                  <Text fontWeight="bold">Material:</Text>
                  <Text>{product.details.material}</Text>
                  <Text fontWeight="bold">Fit:</Text>
                  <Text>{product.details.fit}</Text>
                  <Text fontWeight="bold">Features:</Text>
                  <Text>{product.details.features}</Text>
                </VStack>
              </TabPanel>
              <TabPanel>
                <VStack align="start" spacing={4}>
                  <Text fontWeight="bold">Care Instructions:</Text>
                  <Text>{product.details.care}</Text>
                </VStack>
              </TabPanel>
              <TabPanel>
                <VStack align="start" spacing={4}>
                  <Text fontWeight="bold">Shipping:</Text>
                  <Text>Free standard shipping on all orders over $50. Orders are processed and delivered Monday-Friday (excluding holidays).</Text>
                  <Text fontWeight="bold">Returns:</Text>
                  <Text>We accept returns within 30 days of delivery. Items must be unworn, unwashed, and undamaged with the original tags attached.</Text>
                </VStack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
        
        {/* Related Products */}
        <Box mt={16}>
          <Heading as="h2" size="xl" mb={8}>You Might Also Like</Heading>
          <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
            {relatedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </SimpleGrid>
        </Box>
      </Container>
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
      <Box as={RouterLink} to={`/product/${product.id}`}>
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
      </Box>

      <Box p={4}>
        <Text fontSize="sm" color="gray.500" mb={1}>
          {product.category}
        </Text>
        <Text
          as={RouterLink}
          to={`/product/${product.id}`}
          fontWeight="semibold"
          fontSize="lg"
          display="block"
          mb={2}
          _hover={{ color: 'primary.500', textDecoration: 'none' }}
        >
          {product.name}
        </Text>

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

export default ProductPage