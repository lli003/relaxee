import { useState } from 'react'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import {
  Box,
  Flex,
  Text,
  IconButton,
  Stack,
  Collapse,
  Icon,
  Link,
  Container,
  Input,
  InputGroup,
  InputRightElement,
  useDisclosure,
  useColorModeValue,
  HStack,
  Button,
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon, SearchIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { FiShoppingCart, FiUser, FiHeart } from 'react-icons/fi'

const Navbar = () => {
  const { isOpen, onToggle } = useDisclosure()
  const location = useLocation()
  const [cartCount, setCartCount] = useState(0)

  return (
    <Box>
      {/* Top announcement bar */}
      <Box bg="primary.500" py={2}>
        <Container maxW="container.xl">
          <Text color="white" textAlign="center" fontSize="sm">
            Sign up and get 20% off to your first order. <Link as={RouterLink} to="/signup" color="white" fontWeight="bold" textDecoration="underline">Sign Up Now</Link>
          </Text>
        </Container>
      </Box>

      <Box borderBottom={1} borderStyle={'solid'} borderColor={useColorModeValue('gray.200', 'gray.900')}>
        <Container maxW="container.xl">
          <Flex py={4} align={'center'} justify={'space-between'}>
            {/* Mobile hamburger */}
            <IconButton
              display={{ base: 'flex', md: 'none' }}
              onClick={onToggle}
              icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
              variant={'ghost'}
              aria-label={'Toggle Navigation'}
            />

            {/* Logo */}
            <Link
              as={RouterLink}
              to={'/'}
              textAlign={{ base: 'center', md: 'left' }}
              fontFamily={'heading'}
              fontWeight={'bold'}
              fontSize="2xl"
              color={useColorModeValue('gray.800', 'white')}
              _hover={{
                textDecoration: 'none',
              }}
            >
              SHOP.CO
            </Link>

            {/* Desktop Navigation */}
            <HStack spacing={8} display={{ base: 'none', md: 'flex' }}>
              <DesktopNav />
            </HStack>

            {/* Search, Cart, User */}
            <HStack spacing={4}>
              <InputGroup size="md" display={{ base: 'none', md: 'flex' }} w="auto">
                <Input
                  placeholder="Search for products..."
                  borderRadius="full"
                  bg={useColorModeValue('gray.100', 'gray.700')}
                  _focus={{
                    borderColor: 'primary.500',
                  }}
                />
                <InputRightElement>
                  <SearchIcon color="gray.500" />
                </InputRightElement>
              </InputGroup>

              <IconButton
                aria-label="Wishlist"
                icon={<FiHeart />}
                variant="ghost"
                display={{ base: 'none', md: 'flex' }}
              />

              <Box position="relative">
                <IconButton
                  aria-label="User account"
                  icon={<FiUser />}
                  variant="ghost"
                  display={{ base: 'none', md: 'flex' }}
                  as={RouterLink}
                  to="/login"
                />
              </Box>

              <Box position="relative">
                <IconButton
                  as={RouterLink}
                  to="/cart"
                  aria-label="Shopping cart"
                  icon={<FiShoppingCart />}
                  variant="ghost"
                />
                {cartCount > 0 && (
                  <Box
                    position="absolute"
                    top="-2px"
                    right="-2px"
                    px={1.5}
                    py={0.5}
                    fontSize="xs"
                    fontWeight="bold"
                    lineHeight="none"
                    color="white"
                    bg="primary.500"
                    borderRadius="full"
                  >
                    {cartCount}
                  </Box>
                )}
              </Box>
            </HStack>
          </Flex>

          {/* Mobile Navigation */}
          <Collapse in={isOpen} animateOpacity>
            <MobileNav />
          </Collapse>
        </Container>
      </Box>
    </Box>
  )
}

const DesktopNav = () => {
  const linkColor = useColorModeValue('gray.600', 'gray.200')
  const linkHoverColor = useColorModeValue('gray.800', 'white')
  const popoverContentBgColor = useColorModeValue('white', 'gray.800')

  return (
    <Stack direction={'row'} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Link
            p={2}
            as={RouterLink}
            to={navItem.href ?? '#'}
            fontSize={'md'}
            fontWeight={500}
            color={linkColor}
            _hover={{
              textDecoration: 'none',
              color: linkHoverColor,
            }}
          >
            {navItem.label}
            {navItem.children && (
              <Icon
                as={ChevronDownIcon}
                transition={'all .25s ease-in-out'}
                w={5}
                h={5}
                ml={1}
              />
            )}
          </Link>
        </Box>
      ))}
    </Stack>
  )
}

const MobileNav = () => {
  return (
    <Stack bg={useColorModeValue('white', 'gray.800')} p={4} display={{ md: 'none' }}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
      <InputGroup size="md" mt={4}>
        <Input
          placeholder="Search for products..."
          borderRadius="full"
          bg={useColorModeValue('gray.100', 'gray.700')}
        />
        <InputRightElement>
          <SearchIcon color="gray.500" />
        </InputRightElement>
      </InputGroup>
    </Stack>
  )
}

const MobileNavItem = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure()

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={RouterLink}
        to={href ?? '#'}
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none',
        }}
      >
        <Text fontWeight={600} color={useColorModeValue('gray.600', 'gray.200')}>
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} as={RouterLink} to={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  )
}

const NAV_ITEMS = [
  {
    label: 'Shop',
    href: '/shop',
    children: [
      {
        label: 'Men',
        href: '/category/men',
      },
      {
        label: 'Women',
        href: '/category/women',
      },
      {
        label: 'Kids',
        href: '/category/kids',
      },
    ],
  },
  {
    label: 'On Sale',
    href: '/sale',
  },
  {
    label: 'New Arrivals',
    href: '/new-arrivals',
  },
  {
    label: 'Brands',
    href: '/brands',
  },
]

export default Navbar