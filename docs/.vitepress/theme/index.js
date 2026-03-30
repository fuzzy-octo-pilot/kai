import DefaultTheme from 'vitepress/theme'
import './styles/main.css'
import './styles/vars.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app, router, siteData }) {
    // Add global properties or components here if needed
  }
}
