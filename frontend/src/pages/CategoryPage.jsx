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
  Icon,
  Checkbox,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Select,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  IconButton,
} from '@chakra-ui/react'
import { FiStar, FiFilter, FiChevronDown } from 'react-icons/fi'
import { Link as RouterLink } from 'react-router-dom'

// Mock product data
const allProducts = [
  {
    id: 1,
    name: 'Brushed Raglan Sweatshirt',
    price: 195,
    rating: 4.5,
    reviews: 121,
    image: 'https://images.unsplash.com/photo-1614251056798-0a63eda2bb25?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    category: 'men',
    subcategory: 'sweater',
    brand: 'Northside',
    colors: ['Black', 'Gray', 'White'],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 2,
    name: 'Cameryn Sash Tie Dress',
    price: 545,
    rating: 4.8,
    reviews: 35,
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    category: 'women',
    subcategory: 'dress',
    brand: 'Elleven',
    colors: ['Blue', 'Red', 'Green'],
    sizes: ['XS', 'S', 'M', 'L'],
  },
  {
    id: 3,
    name: 'Flex Sweatshirt',
    price: 175,
    rating: 4.2,
    reviews: 55,
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    category: 'men',
    subcategory: 'sweater',
    brand: 'Northside',
    colors: ['Black', 'Blue', 'Red'],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 4,
    name: 'Flex Sweatpants',
    price: 150,
    rating: 4.3,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    category: 'men',
    subcategory: 'pants',
    brand: 'Northside',
    colors: ['Black', 'Gray'],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 5,
    name: 'Pink Fleece Sweatpants',
    price: 195,
    rating: 4.1,
    reviews: 23,
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    category: 'women',
    subcategory: 'pants',
    brand: 'Elleven',
    colors: ['Pink', 'White'],
    sizes: ['XS', 'S', 'M', 'L'],
  },
  {
    id: 6,
    name: 'Lite Sweatpants',
    price: 150,
    rating: 4.0,
    reviews: 55,
    image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    category: 'men',
    subcategory: 'pants',
    brand: 'Sportix',
    colors: ['Gray', 'Black', 'Blue'],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 7,
    name: 'Imperial Alpaca Hoodie',
    price: 525,
    rating: 4.7,
    reviews: 55,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    category: 'women',
    subcategory: 'hoodie',
    brand: 'Elleven',
    colors: ['Brown', 'Black', 'White'],
    sizes: ['XS', 'S', 'M', 'L'],
  },
  {
    id: 8,
    name: 'Muscle Tank',
    price: 75,
    rating: 4.3,
    reviews: 45,
    image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    category: 'men',
    subcategory: 'tank',
    brand: 'Sportix',
    colors: ['White', 'Gray', 'Black'],
    sizes: ['S', 'M', 'L', 'XL'],
  },
];

// Filter options
const brands = ['Northside', 'Elleven', 'Sportix', 'Urban Style', 'Luxe Fashion'];
const subcategories = ['Sweater', 'Dress', 'Pants', 'Hoodie', 'Tank', 'Shirt', 'Jacket'];
const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const colors = ['Black', 'White', 'Gray', 'Blue', 'Red', 'Pink', 'Green', 'Brown'];

const CategoryPage = () => {
  const { category } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  // Filter states
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [sortBy, setSortBy] = useState('featured');
  
  // Filter products based on category and filters
  const filteredProducts = allProducts.filter(product => {
    // Filter by category
    if (category && product.category !== category.toLowerCase()) return false;
    
    // Filter by price range
    if (product.price < priceRange[0] || product.price > priceRange[1]) return false;
    
    // Filter by brands
    if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) return false;
    
    // Filter by subcategories
    if (selectedSubcategories.length > 0 && !selectedSubcategories.includes(product.subcategory)) return false;
    
    // Filter by sizes
    if (selectedSizes.length > 0 && !product.sizes.some(size => selectedSizes.includes(size))) return false;
    
    // Filter by colors
    if (selectedColors.length > 0 && !product.colors.some(color => selectedColors.includes(color))) return false;
    
    return true;
  });
  
  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low-high':
        return a.price - b.price;
      case 'price-high-low':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default: // 'featured'
        return 0;
    }
  });
  
  // Toggle brand selection
  const toggleBrand = (brand) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter(b => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };
  
  // Toggle subcategory selection
  const toggleSubcategory = (subcategory) => {
    if (selectedSubcategories.includes(subcategory)) {
      setSelectedSubcategories(selectedSubcategories.filter(s => s !== subcategory));
    } else {
      setSelectedSubcategories([...selectedSubcategories, subcategory]);
    }
  };
  
  // Toggle size selection
  const toggleSize = (size) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter(s => s !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };
  
  // Toggle color selection
  const toggleColor = (color) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter(c => c !== color));
    } else {
      setSelectedColors([...selectedColors, color]);
    }
  };
  
  // Reset all filters
  const resetFilters = () => {
    setPriceRange([0, 1000]);
    setSelectedBrands([]);
    setSelectedSubcategories([]);
    setSelectedSizes([]);
    setSelectedColors([]);
  };

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
            <BreadcrumbLink textTransform="capitalize">{category || 'All Products'}</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        {/* Category Header */}
        <Box mb={8}>
          <Heading as="h1" size="xl" textTransform="capitalize">
            {category || 'All Products'}
          </Heading>
          <Text color="gray.600" mt={2}>
            Showing {sortedProducts.length} results
          </Text>
        </Box>

        {/* Mobile Filter Button */}
        <Button
          leftIcon={<FiFilter />}
          onClick={onOpen}
          display={{ base: 'flex', md: 'none' }}
          mb={4}
          width="full"
          variant="outline"
        >
          Filter Products
        </Button>

        <Flex direction={{ base: 'column', md: 'row' }} gap={8}>
          {/* Desktop Filters */}
          <Box
            width={{ base: 'full', md: '250px' }}
            flexShrink={0}
            display={{ base: 'none', md: 'block' }}
          >
            <FilterSidebar
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              selectedBrands={selectedBrands}
              toggleBrand={toggleBrand}
              selectedSubcategories={selectedSubcategories}
              toggleSubcategory={toggleSubcategory}
              selectedSizes={selectedSizes}
              toggleSize={toggleSize}
              selectedColors={selectedColors}
              toggleColor={toggleColor}
              resetFilters={resetFilters}
            />
          </Box>

          {/* Mobile Filter Drawer */}
          <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Filter Products</DrawerHeader>
              <DrawerBody>
                <FilterSidebar
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                  selectedBrands={selectedBrands}
                  toggleBrand={toggleBrand}
                  selectedSubcategories={selectedSubcategories}
                  toggleSubcategory={toggleSubcategory}
                  selectedSizes={selectedSizes}
                  toggleSize={toggleSize}
                  selectedColors={selectedColors}
                  toggleColor={toggleColor}
                  resetFilters={resetFilters}
                  onClose={onClose}
                />
              </DrawerBody>
            </DrawerContent>
          </Drawer>

          {/* Products Grid */}
          <Box flex={1}>
            {/* Sort Options */}
            <Flex justify="space-between" align="center" mb={6}>
              <Text fontWeight="medium">Sort by:</Text>
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                width="200px"
                size="sm"
              >
                <option value="featured">Featured</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </Select>
            </Flex>

            {/* Products */}
            {sortedProducts.length > 0 ? (
              <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={8}>
                {sortedProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </SimpleGrid>
            ) : (
              <Box textAlign="center" py={10}>
                <Text fontSize="lg">No products found matching your filters.</Text>
                <Button mt={4} onClick={resetFilters} colorScheme="blue">
                  Reset Filters
                </Button>
              </Box>
            )}
          </Box>
        </Flex>
      </Container>
    </Box>
  )
}

const FilterSidebar = ({
  priceRange,
  setPriceRange,
  selectedBrands,
  toggleBrand,
  selectedSubcategories,
  toggleSubcategory,
  selectedSizes,
  toggleSize,
  selectedColors,
  toggleColor,
  resetFilters,
  onClose,
}) => {
  return (
    <VStack align="start" spacing={6} width="full">
      {/* Price Range */}
      <Box width="full">
        <Flex justify="space-between" mb={2}>
          <Text fontWeight="bold">Price Range</Text>
          <Text>${priceRange[0]} - ${priceRange[1]}</Text>
        </Flex>
        <RangeSlider
          aria-label={['min', 'max']}
          defaultValue={[0, 1000]}
          min={0}
          max={1000}
          step={10}
          value={priceRange}
          onChange={setPriceRange}
          colorScheme="blackAlpha"
        >
          <RangeSliderTrack>
            <RangeSliderFilledTrack />
          </RangeSliderTrack>
          <RangeSliderThumb index={0} />
          <RangeSliderThumb index={1} />
        </RangeSlider>
      </Box>

      {/* Brand Filter */}
      <Box width="full">
        <Text fontWeight="bold" mb={2}>Brand</Text>
        <VStack align="start" spacing={1}>
          {brands.map(brand => (
            <Checkbox
              key={brand}
              isChecked={selectedBrands.includes(brand)}
              onChange={() => toggleBrand(brand)}
            >
              {brand}
            </Checkbox>
          ))}
        </VStack>
      </Box>

      {/* Category Filter */}
      <Box width="full">
        <Text fontWeight="bold" mb={2}>Category</Text>
        <VStack align="start" spacing={1}>
          {subcategories.map(subcategory => (
            <Checkbox
              key={subcategory}
              isChecked={selectedSubcategories.includes(subcategory.toLowerCase())}
              onChange={() => toggleSubcategory(subcategory.toLowerCase())}
            >
              {subcategory}
            </Checkbox>
          ))}
        </VStack>
      </Box>

      {/* Size Filter */}
      <Box width="full">
        <Text fontWeight="bold" mb={2}>Size</Text>
        <Flex wrap="wrap" gap={2}>
          {sizes.map(size => (
            <Box
              key={size}
              onClick={() => toggleSize(size)}
              bg={selectedSizes.includes(size) ? 'black' : 'white'}
              color={selectedSizes.includes(size) ? 'white' : 'black'}
              borderWidth="1px"
              borderColor="gray.200"
              width="40px"
              height="40px"
              borderRadius="md"
              display="flex"
              alignItems="center"
              justifyContent="center"
              cursor="pointer"
              _hover={{ bg: selectedSizes.includes(size) ? 'black' : 'gray.100' }}
              transition="all 0.2s"
            >
              {size}
            </Box>
          ))}
        </Flex>
      </Box>

      {/* Color Filter */}
      <Box width="full">
        <Text fontWeight="bold" mb={2}>Color</Text>
        <Flex wrap="wrap" gap={2}>
          {colors.map(color => (
            <Box
              key={color}
              onClick={() => toggleColor(color)}
              bg={color.toLowerCase()}
              width="32px"
              height="32px"
              borderRadius="full"
              cursor="pointer"
              borderWidth={selectedColors.includes(color) ? '2px' : '0px'}
              borderColor="primary.500"
              _hover={{ transform: 'scale(1.1)' }}
              transition="all 0.2s"
            />
          ))}
        </Flex>
      </Box>

      {/* Reset Filters */}
      <Button
        onClick={() => {
          resetFilters();
          if (onClose) onClose();
        }}
        variant="outline"
        width="full"
        colorScheme="blackAlpha"
      >
        Reset Filters
      </Button>

      {/* Apply Filters (Mobile Only) */}
      {onClose && (
        <Button
          onClick={onClose}
          colorScheme="blackAlpha"
          bg="black"
          width="full"
        >
          Apply Filters
        </Button>
      )}
    </VStack>
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
        <Text fontSize="sm" color="gray.500" mb={1} textTransform="capitalize">
          {product.subcategory}
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

export default CategoryPage