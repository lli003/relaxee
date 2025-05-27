import { useState } from 'react'
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  Image,
  Stack,
  Text,
  VStack,
  HStack,
  useColorModeValue,
  Icon,
  Input,
  Divider,
  IconButton,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Alert,
  AlertIcon,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@chakra-ui/react'
import { FiTrash2, FiShoppingBag } from 'react-icons/fi'
import { Link as RouterLink } from 'react-router-dom'

// Mock cart data
const initialCartItems = [
  {
    id: 1,
    name: 'Brushed Raglan Sweatshirt',
    price: 195,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1614251056798-0a63eda2bb25?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    color: 'Black',
    size: 'M',
  },
  {
    id: 7,
    name: 'Imperial Alpaca Hoodie',
    price: 525,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    color: 'Brown',
    size: 'S',
  },
];

const CartPage = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoError, setPromoError] = useState('');
  
  // Calculate subtotal
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  // Calculate shipping (free over $150)
  const shipping = subtotal > 150 ? 0 : 15;
  
  // Calculate tax (8%)
  const tax = subtotal * 0.08;
  
  // Calculate total
  const total = subtotal + shipping + tax - promoDiscount;
  
  // Update quantity
  const updateQuantity = (id, quantity) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity } : item
    ));
  };
  
  // Remove item from cart
  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };
  
  // Apply promo code
  const applyPromoCode = () => {
    // Mock promo code validation
    if (promoCode.toUpperCase() === 'SAVE10') {
      setPromoApplied(true);
      setPromoDiscount(subtotal * 0.1); // 10% discount
      setPromoError('');
    } else if (promoCode.toUpperCase() === 'SAVE20') {
      setPromoApplied(true);
      setPromoDiscount(subtotal * 0.2); // 20% discount
      setPromoError('');
    } else {
      setPromoApplied(false);
      setPromoDiscount(0);
      setPromoError('Invalid promo code');
    }
  };

  return (
    <Box>
      <Container maxW="container.xl" py={8}>
        {/* Breadcrumb */}
        <Breadcrumb fontSize="sm" color="gray.500" mb={8}>
          <BreadcrumbItem>
            <BreadcrumbLink as={RouterLink} to="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink>Shopping Cart</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        {/* Page Title */}
        <Heading as="h1" size="xl" mb={10}>
          Shopping Cart
        </Heading>

        {cartItems.length > 0 ? (
          <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={10}>
            {/* Cart Items */}
            <Box>
              {/* Table Header */}
              <Grid
                templateColumns="1fr 2fr 1fr 1fr 1fr auto"
                gap={4}
                py={4}
                display={{ base: 'none', md: 'grid' }}
                borderBottomWidth="1px"
                borderColor="gray.200"
              >
                <Text fontWeight="medium">Product</Text>
                <Text fontWeight="medium">Details</Text>
                <Text fontWeight="medium">Price</Text>
                <Text fontWeight="medium">Quantity</Text>
                <Text fontWeight="medium">Subtotal</Text>
                <Box></Box> {/* For delete button */}
              </Grid>

              {/* Cart Items */}
              {cartItems.map(item => (
                <Box key={item.id}>
                  {/* Mobile View */}
                  <Box
                    display={{ base: 'block', md: 'none' }}
                    borderBottomWidth="1px"
                    borderColor="gray.200"
                    py={4}
                  >
                    <Flex>
                      <Image
                        src={item.image}
                        alt={item.name}
                        boxSize="100px"
                        objectFit="cover"
                        borderRadius="md"
                        mr={4}
                      />
                      <Box flex="1">
                        <Text fontWeight="medium" mb={1}>{item.name}</Text>
                        <Text fontSize="sm" color="gray.600" mb={1}>Color: {item.color}</Text>
                        <Text fontSize="sm" color="gray.600" mb={2}>Size: {item.size}</Text>
                        <Text fontWeight="bold" mb={2}>${item.price}</Text>
                        
                        <Flex justify="space-between" align="center">
                          <NumberInput
                            size="sm"
                            maxW={20}
                            min={1}
                            max={10}
                            value={item.quantity}
                            onChange={(_, value) => updateQuantity(item.id, value)}
                          >
                            <NumberInputField />
                            <NumberInputStepper>
                              <NumberIncrementStepper />
                              <NumberDecrementStepper />
                            </NumberInputStepper>
                          </NumberInput>
                          
                          <IconButton
                            icon={<FiTrash2 />}
                            variant="ghost"
                            colorScheme="red"
                            aria-label="Remove item"
                            onClick={() => removeItem(item.id)}
                          />
                        </Flex>
                      </Box>
                    </Flex>
                  </Box>

                  {/* Desktop View */}
                  <Grid
                    templateColumns="1fr 2fr 1fr 1fr 1fr auto"
                    gap={4}
                    py={6}
                    alignItems="center"
                    display={{ base: 'none', md: 'grid' }}
                    borderBottomWidth="1px"
                    borderColor="gray.200"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      boxSize="100px"
                      objectFit="cover"
                      borderRadius="md"
                    />
                    <Box>
                      <Text fontWeight="medium" mb={1}>{item.name}</Text>
                      <Text fontSize="sm" color="gray.600">Color: {item.color}</Text>
                      <Text fontSize="sm" color="gray.600">Size: {item.size}</Text>
                    </Box>
                    <Text>${item.price}</Text>
                    <NumberInput
                      size="sm"
                      maxW={20}
                      min={1}
                      max={10}
                      value={item.quantity}
                      onChange={(_, value) => updateQuantity(item.id, value)}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                    <Text fontWeight="medium">${item.price * item.quantity}</Text>
                    <IconButton
                      icon={<FiTrash2 />}
                      variant="ghost"
                      colorScheme="red"
                      aria-label="Remove item"
                      onClick={() => removeItem(item.id)}
                    />
                  </Grid>
                </Box>
              ))}

              {/* Continue Shopping */}
              <Flex justify="flex-start" mt={6}>
                <Button
                  as={RouterLink}
                  to="/shop"
                  leftIcon={<FiShoppingBag />}
                  variant="outline"
                  colorScheme="blackAlpha"
                >
                  Continue Shopping
                </Button>
              </Flex>
            </Box>

            {/* Order Summary */}
            <Box
              bg={useColorModeValue('gray.50', 'gray.700')}
              p={6}
              borderRadius="lg"
              position="sticky"
              top="100px"
              height="fit-content"
            >
              <Heading as="h2" size="md" mb={6}>
                Order Summary
              </Heading>

              {/* Promo Code */}
              <Box mb={6}>
                <Text mb={2} fontWeight="medium">Promo Code</Text>
                <Flex>
                  <Input
                    placeholder="Enter code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    mr={2}
                  />
                  <Button
                    onClick={applyPromoCode}
                    isDisabled={!promoCode}
                    colorScheme="blackAlpha"
                    bg="black"
                  >
                    Apply
                  </Button>
                </Flex>
                {promoError && (
                  <Alert status="error" mt={2} py={2} size="sm">
                    <AlertIcon />
                    {promoError}
                  </Alert>
                )}
                {promoApplied && (
                  <Alert status="success" mt={2} py={2} size="sm">
                    <AlertIcon />
                    Promo code applied successfully!
                  </Alert>
                )}
              </Box>

              <Divider mb={6} />

              {/* Price Details */}
              <Stack spacing={4} mb={6}>
                <Flex justify="space-between">
                  <Text>Subtotal</Text>
                  <Text>${subtotal.toFixed(2)}</Text>
                </Flex>
                <Flex justify="space-between">
                  <Text>Shipping</Text>
                  <Text>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</Text>
                </Flex>
                <Flex justify="space-between">
                  <Text>Tax (8%)</Text>
                  <Text>${tax.toFixed(2)}</Text>
                </Flex>
                {promoDiscount > 0 && (
                  <Flex justify="space-between" color="green.500">
                    <Text>Discount</Text>
                    <Text>-${promoDiscount.toFixed(2)}</Text>
                  </Flex>
                )}
              </Stack>

              <Divider mb={6} />

              {/* Total */}
              <Flex justify="space-between" fontWeight="bold" fontSize="lg" mb={6}>
                <Text>Total</Text>
                <Text>${total.toFixed(2)}</Text>
              </Flex>

              {/* Checkout Button */}
              <Button
                colorScheme="blackAlpha"
                bg="black"
                size="lg"
                width="full"
                mb={4}
              >
                Proceed to Checkout
              </Button>

              {/* Shipping Note */}
              <Text fontSize="sm" color="gray.500" textAlign="center">
                Shipping & taxes calculated at checkout
              </Text>
            </Box>
          </Grid>
        ) : (
          <VStack spacing={6} py={10}>
            <Icon as={FiShoppingBag} boxSize={16} color="gray.300" />
            <Heading as="h2" size="lg">
              Your cart is empty
            </Heading>
            <Text color="gray.500" textAlign="center" maxW="md">
              Looks like you haven't added any products to your cart yet.
              Browse our collection and find something you'll love.
            </Text>
            <Button
              as={RouterLink}
              to="/shop"
              colorScheme="blackAlpha"
              bg="black"
              size="lg"
            >
              Start Shopping
            </Button>
          </VStack>
        )}
      </Container>
    </Box>
  )
}

export default CartPage