import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import './styles/main.css'
import './styles/vars.css'

const theme: Theme = {
  extends: DefaultTheme,
  enhanceApp: ({ app, router, siteData }) => {
    // Add global properties or components here if needed
    // For example, you could register custom Vue components
  }
}

export default theme
