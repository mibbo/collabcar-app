// Contains themes and styles used around the app

import {StyleSheet, Dimensions} from 'react-native'

export const dimensions = {
  fullHeight: Dimensions.get('window').height,
  fullWidth: Dimensions.get('window').width
}
  
const palette = {
    purple: '#5A31F4',
    green: '#0ECD9D',
    red: '#CD0E61',
    black: '#0B0B0B',
    white: '#F0F2F3',
    darkBlue: '#2A2E43',
    cyan: '#3ACCE1',
    gray: '#2D5D7B'
  }

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
    xl: 42,
    primary: 'Cochin'
  }

export const theme = {
    colors: {
      background: palette.white,
      modalBackground: palette.darkBlue,
      foreground: palette.black,
      primary: palette.darkBlue,
      secondary: palette.gray,
      success: palette.green,
      danger: palette.red,
      failure: palette.red,
      accept: palette.cyan,
      cancel: palette.gray,
      mainBlue: '#052253'
    },
    spacing: {
        none: 0,
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
        fontFamily: 'sans-serif',
        fontSize: fonts.l,
        fontWeight: '600',
        color: 'white',
        letterSpacing: 0
      },
      body: {
        fontFamily: 'sans-serif',
        fontSize: fonts.m,
        fontWeight: '600',
        color: 'white',
        letterSpacing: 0
      },
    }
  };

  export const darkTheme = {
    ...theme,
    colors: {
      ...theme.colors,
      background: palette.black,
      foreground: palette.white,
    }
  }
  
  export default function createStyles(overrides = {}) {
    return StyleSheet.create({...theme, ...overrides})
  }
  