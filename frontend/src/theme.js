import { extendTheme } from '@chakra-ui/react'

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

const colors = {
  brand: {
    50: '#f2f2f2',
    100: '#d9d9d9',
    200: '#bfbfbf',
    300: '#a6a6a6',
    400: '#8c8c8c',
    500: '#737373',
    600: '#595959',
    700: '#404040',
    800: '#262626',
    900: '#0d0d0d',
  },
  primary: {
    50: '#e6f2ff',
    100: '#cce5ff',
    200: '#99cbff',
    300: '#66b0ff',
    400: '#3396ff',
    500: '#007bff',
    600: '#0062cc',
    700: '#004999',
    800: '#003166',
    900: '#001833',
  },
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
}

const fonts = {
  body: "'Inter', sans-serif",
  heading: "'Inter', sans-serif",
}

const components = {
  Button: {
    baseStyle: {
      fontWeight: 'medium',
      borderRadius: 'md',
    },
    variants: {
      primary: {
        bg: 'primary.500',
        color: 'white',
        _hover: {
          bg: 'primary.600',
        },
      },
      secondary: {
        bg: 'gray.100',
        color: 'gray.800',
        _hover: {
          bg: 'gray.200',
        },
      },
    },
  },
  Heading: {
    baseStyle: {
      fontWeight: 'bold',
    },
  },
}

const theme = extendTheme({ config, colors, fonts, components })

export default theme