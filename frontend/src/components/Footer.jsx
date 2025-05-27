import { Link as RouterLink } from 'react-router-dom'
import {
  Box,
  Container,
  SimpleGrid,
  Stack,
  Text,
  Flex,
  Tag,
  useColorModeValue,
  Image,
  Input,
  IconButton,
  Button,
  VStack,
  HStack,
  Divider,
  Heading,
} from '@chakra-ui/react'
import { FiMail } from 'react-icons/fi'

const Footer = () => {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
      borderTop="1px"
      borderColor={useColorModeValue('gray.200', 'gray.700')}
    >
      <Container as={Stack} maxW={'container.xl'} py={10}>
        <SimpleGrid
          templateColumns={{ base: '1fr', md: '2fr 1fr 1fr 1fr 1fr' }}
          spacing={8}
        >
          <Stack spacing={6}>
            <Box>
              <Text fontSize="2xl" fontWeight="bold">
                SHOP.CO
              </Text>
            </Box>
            <Text fontSize={'sm'} maxW={'xs'}>
              We have clothes that suits your style and which you're proud to wear. From women to men.
            </Text>
            <Stack direction={'row'} spacing={6}>
              <SocialButton label={'Twitter'} href={'#'}>
                <Image src="/images/logo-twitter.svg" alt="Twitter" boxSize="20px" />
              </SocialButton>
              <SocialButton label={'Facebook'} href={'#'}>
                <Image src="/images/logo-fb.svg" alt="Facebook" boxSize="20px" />
              </SocialButton>
              <SocialButton label={'Instagram'} href={'#'}>
                <Image src="/images/logo-instagram.svg" alt="Instagram" boxSize="20px" />
              </SocialButton>
              <SocialButton label={'GitHub'} href={'#'}>
                <Image src="/images/logo-github.svg" alt="GitHub" boxSize="20px" />
              </SocialButton>
            </Stack>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>Company</ListHeader>
            <Link href={'#'}>About</Link>
            <Link href={'#'}>Features</Link>
            <Link href={'#'}>Works</Link>
            <Link href={'#'}>Career</Link>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>Help</ListHeader>
            <Link href={'#'}>Customer Support</Link>
            <Link href={'#'}>Delivery Details</Link>
            <Link href={'#'}>Terms & Conditions</Link>
            <Link href={'#'}>Privacy Policy</Link>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>FAQ</ListHeader>
            <Link href={'#'}>Account</Link>
            <Link href={'#'}>Manage Deliveries</Link>
            <Link href={'#'}>Orders</Link>
            <Link href={'#'}>Payments</Link>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>Resources</ListHeader>
            <Link href={'#'}>Free eBooks</Link>
            <Link href={'#'}>Development Tutorial</Link>
            <Link href={'#'}>How to - Blog</Link>
            <Link href={'#'}>Youtube Playlist</Link>
          </Stack>
        </SimpleGrid>
      </Container>

      {/* Newsletter Section */}
      <Box bg={useColorModeValue('gray.50', 'gray.900')} py={10}>
        <Container maxW={'container.xl'}>
          <VStack
            spacing={4}
            p={6}
            bg={useColorModeValue('white', 'gray.800')}
            borderRadius="xl"
            boxShadow="md"
          >
            <Text
              textTransform={'uppercase'}
              fontWeight={'bold'}
              fontSize={'sm'}
              letterSpacing={1.1}
            >
              Stay up to date about our latest offers
            </Text>

            <Flex
              direction={{ base: 'column', md: 'row' }}
              width={'full'}
              spacing={4}
              gap={4}
            >
              <Flex
                flex={1}
                bg={useColorModeValue('gray.100', 'gray.800')}
                borderRadius="full"
                px={4}
                alignItems="center"
              >
                <IconButton
                  bg="transparent"
                  _hover={{ bg: 'transparent' }}
                  aria-label="Email"
                  icon={<FiMail color="gray.500" />}
                  size="sm"
                />
                <Input
                  border={0}
                  placeholder={'Enter your email address'}
                  _placeholder={{ color: 'gray.500' }}
                  bg="transparent"
                />
              </Flex>
              <Button
                bg="black"
                color="white"
                _hover={{ bg: 'gray.800' }}
                borderRadius="full"
                px={6}
                py={6}
              >
                Subscribe to Newsletter
              </Button>
            </Flex>
          </VStack>
        </Container>
      </Box>

      {/* Bottom Footer */}
      <Box
        borderTopWidth={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.700')}
      >
        <Container
          as={Stack}
          maxW={'container.xl'}
          py={4}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={{ base: 'center', md: 'space-between' }}
          align={{ base: 'center', md: 'center' }}
        >
          <Text>Shop.co © 2000-2023, All Rights Reserved</Text>
          <Stack direction={'row'} spacing={6}>
            <Image src="/images/visa.svg" alt="Visa" height="24px" />
            <Image src="/images/mastercard.svg" alt="Mastercard" height="24px" />
            <Image src="/images/paypal.svg" alt="PayPal" height="24px" />
            <Image src="/images/apple-pay.svg" alt="Apple Pay" height="24px" />
            <Image src="/images/google-pay.svg" alt="Google Pay" height="24px" />
          </Stack>
        </Container>
      </Box>
    </Box>
  )
}

const SocialButton = ({ children, label, href }) => {
  return (
    <IconButton
      bg={useColorModeValue('white', 'whiteAlpha.100')}
      borderRadius="full"
      border="1px solid"
      borderColor={useColorModeValue('gray.200', 'whiteAlpha.300')}
      as={'a'}
      href={href}
      aria-label={label}
      icon={children}
      _hover={{
        bg: useColorModeValue('gray.100', 'whiteAlpha.200'),
      }}
    />
  )
}

const ListHeader = ({ children }) => {
  return (
    <Text fontWeight={'bold'} fontSize={'lg'} mb={2}>
      {children}
    </Text>
  )
}

const Link = ({ href, children }) => {
  return (
    <Box
      as={RouterLink}
      to={href}
      py={1}
      color={useColorModeValue('gray.500', 'gray.400')}
      _hover={{
        color: useColorModeValue('gray.800', 'white'),
        textDecoration: 'none',
      }}
    >
      {children}
    </Box>
  )
}

export default Footer