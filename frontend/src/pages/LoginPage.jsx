import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  Link,
  useToast,
  Container,
  InputGroup,
  InputRightElement,
  FormErrorMessage,
  Flex,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Checkbox,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const toast = useToast();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:8000/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.detail || 'Invalid credentials');
        }

        // Store token in localStorage
        localStorage.setItem('token', data.access_token);
        
        toast({
          title: 'Login successful',
          description: "You've been successfully logged in.",
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        
        // Redirect to home page
        window.location.href = '/';
      } catch (error) {
        toast({
          title: 'Login failed',
          description: error.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Box bg="gray.50" minH="100vh" py={12}>
      <Container maxW="container.xl" px={{ base: 4, md: 8 }}>
        <Breadcrumb mb={8} fontSize="sm">
          <BreadcrumbItem>
            <BreadcrumbLink as={RouterLink} to="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink>Login</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        <Flex direction={{ base: 'column', md: 'row' }} justify="center">
          <Box 
            w={{ base: 'full', md: '50%' }} 
            bg="white" 
            p={8} 
            borderRadius="lg" 
            boxShadow="lg"
            mx={{ base: 0, md: 4 }}
          >
            <VStack spacing={8} align="flex-start" w="full">
              <VStack spacing={1} align="flex-start" w="full">
                <Heading size="xl">Welcome Back</Heading>
                <Text>Sign in to your account to continue</Text>
              </VStack>

              <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                <VStack spacing={4} w="full">
                  <FormControl isInvalid={errors.email} isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                    />
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={errors.password} isRequired>
                    <FormLabel>Password</FormLabel>
                    <InputGroup>
                      <Input
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="******"
                      />
                      <InputRightElement width="4.5rem">
                        <Button
                          h="1.75rem"
                          size="sm"
                          onClick={() => setShowPassword(!showPassword)}
                          variant="ghost"
                        >
                          {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>{errors.password}</FormErrorMessage>
                  </FormControl>

                  <Flex justify="space-between" w="full">
                    <Checkbox 
                      colorScheme="teal" 
                      isChecked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    >
                      Remember me
                    </Checkbox>
                    <Link color="teal.500" fontSize="sm">
                      Forgot password?
                    </Link>
                  </Flex>

                  <Button
                    type="submit"
                    colorScheme="teal"
                    size="lg"
                    w="full"
                    mt={4}
                    isLoading={isLoading}
                  >
                    Sign In
                  </Button>
                </VStack>
              </form>

              <Text align="center" w="full">
                Don't have an account?{' '}
                <Link as={RouterLink} to="/signup" color="teal.500" fontWeight="bold">
                  Sign Up
                </Link>
              </Text>
            </VStack>
          </Box>

          <Box 
            w={{ base: 'full', md: '40%' }} 
            bg="teal.500" 
            p={8} 
            borderRadius="lg" 
            color="white"
            mt={{ base: 8, md: 0 }}
            mx={{ base: 0, md: 4 }}
          >
            <VStack spacing={8} align="flex-start">
              <Heading size="xl">Welcome to Relaxee</Heading>
              <VStack spacing={4} align="flex-start">
                <Box>
                  <Heading size="md" mb={2}>Premium Products</Heading>
                  <Text>Discover our curated collection of high-quality products.</Text>
                </Box>
                <Box>
                  <Heading size="md" mb={2}>Secure Shopping</Heading>
                  <Text>Shop with confidence with our secure payment system.</Text>
                </Box>
                <Box>
                  <Heading size="md" mb={2}>Fast Delivery</Heading>
                  <Text>Enjoy quick and reliable shipping on all orders.</Text>
                </Box>
                <Box>
                  <Heading size="md" mb={2}>24/7 Support</Heading>
                  <Text>Our customer service team is always ready to assist you.</Text>
                </Box>
              </VStack>
            </VStack>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default LoginPage;