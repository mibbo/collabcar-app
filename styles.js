// Contains themes and styles used around the app

import {StyleSheet, Dimensions} from 'react-native'

export const dimensions = {
  fullHeight: Dimensions.get('window').height,
  fullWidth: Dimensions.get('window').width
}
  
/*export const colors  = {
  primary: '#226B74',
  secondary: '#254B5A',
  tertiary: '#5DA6A7'
} */

const palette = {
    purple: '#5A31F4',
    green: '#0ECD9D',
    red: '#CD0E61',
    black: '#0B0B0B',
    white: '#F0F2F3',
  }

export const theme = {
    colors: {
      background: palette.white,
      foreground: palette.black,
      primary: palette.purple,
      success: palette.green,
      danger: palette.red,
      failure: palette.red,
    },
    spacing: {
      s: 8,
      m: 16,
      l: 24,
      xl: 40,
    },
    breakpoints: {
        smallPhone: 0,
        phone: 321,
        tablet: 768,
    },
    textVariants: {
      header: {
        fontFamily: 'Raleway',
        fontSize: 36,
        fontWeight: 'bold',
      },
      body: {
        fontFamily: 'Merriweather',
        fontSize: 16,
      },
    }
  };


export const padding = {
  s: 10,
  m: 20,
  l: 30,
  xl: 40
}

export const fonts = {
  s: 12,
  m: 18,
  l: 28,
  primary: 'Cochin'
}

const baseStyles = {
    container: {
      paddingHorizontal: padding.sm,
      paddingVertical: padding.lg,
      width: dimensions.fullWidth
    },
    header: {
      backgroundColor: 'transparent',
      fontSize: fonts.l,
      fontFamily: fonts.primary,
      fontWeight: 'bold'
    },
    section: {
      paddingVertical: padding.l,
      paddingHorizontal: padding.xl
    },
  }

  export const darkTheme = {
    ...theme,
    colors: {
      ...theme.colors,
      background: palette.black,
      foreground: palette.white,
    }
  }
  
  export default function createStyles(overrides = {}) {
    return StyleSheet.create({...baseStyles, ...overrides})
  }
  