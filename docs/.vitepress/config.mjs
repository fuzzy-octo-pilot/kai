import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Kai Language',
  description: 'A minimal, elegant programming language for ML/AI development',
  lang: 'en-US',
  base: '/',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#3c8772' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'en' }],
    ['meta', { property: 'og:title', content: 'Kai Language' }],
    ['meta', { property: 'og:site_name', content: 'Kai Language' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { href: 'https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,400;0,600;1,400&family=Manrope:wght@400;600;700&display=swap', rel: 'stylesheet' }]
  ],

  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide/introduction' },
      { text: 'Tutorials', link: '/tutorials/learn-kai-with-tests' },
      { text: 'Reference', link: '/reference/stdlib' },
      { text: 'Community', link: '/community/examples' }
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Introduction', link: '/guide/introduction' },
            { text: 'Installation', link: '/guide/installation' },
            { text: 'Hello World', link: '/guide/hello-world' },
            { text: 'REPL Basics', link: '/guide/repl-basics' }
          ]
        },
        {
          text: 'Language Basics',
          items: [
            { text: 'Variables & Types', link: '/guide/basics/variables' },
            { text: 'Functions', link: '/guide/basics/functions' },
            { text: 'Control Flow', link: '/guide/basics/control-flow' },
            { text: 'Comments', link: '/guide/basics/comments' }
          ]
        },
        {
          text: 'Collections',
          items: [
            { text: 'Arrays', link: '/guide/collections/arrays' },
            { text: 'Records', link: '/guide/collections/records' },
            { text: 'Pipeline Operator', link: '/guide/collections/pipeline' }
          ]
        },
        {
          text: 'Advanced Features',
          items: [
            { text: 'Type System', link: '/guide/advanced/type-system' },
            { text: 'Mutation', link: '/guide/advanced/mutation' },
            { text: 'Closures', link: '/guide/advanced/closures' },
            { text: 'Standard Library', link: '/guide/advanced/stdlib' }
          ]
        }
      ],
      '/tutorials/': [
        {
          text: 'Learn Kai with Tests',
          items: [
            { text: 'Overview', link: '/tutorials/learn-kai-with-tests' },
            { text: 'Chapter 1: Variables', link: '/tutorials/chapters/01-variables' },
            { text: 'Chapter 2: Functions', link: '/tutorials/chapters/02-functions' },
            { text: 'Chapter 3: Control Flow', link: '/tutorials/chapters/03-control-flow' },
            { text: 'Chapter 4: Collections', link: '/tutorials/chapters/04-collections' },
            { text: 'Chapter 5: Pipelines', link: '/tutorials/chapters/05-pipelines' },
            { text: 'Chapter 6: Types', link: '/tutorials/chapters/06-types' },
            { text: 'Chapter 7: ML Features', link: '/tutorials/chapters/07-ml' }
          ]
        }
      ],
      '/reference/': [
        {
          text: 'API Reference',
          items: [
            { text: 'Standard Library', link: '/reference/stdlib' },
            { text: 'Types', link: '/reference/types' },
            { text: 'Syntax', link: '/reference/syntax' },
            { text: 'Grammar', link: '/reference/grammar' }
          ]
        }
      ],
      '/internals/': [
        {
          text: 'Internals',
          items: [
            { text: 'Architecture', link: '/internals/architecture' },
            { text: 'Contributing', link: '/internals/contributing' },
            { text: 'Roadmap', link: '/internals/roadmap' }
          ]
        }
      ],
      '/community/': [
        {
          text: 'Community',
          items: [
            { text: 'Examples', link: '/community/examples' },
            { text: 'FAQ', link: '/community/faq' },
            { text: 'Migration from Python', link: '/community/migration-python' },
            { text: 'Migration from JavaScript', link: '/community/migration-js' }
          ]
        }
      ],
      '/': [
        {
          text: 'Overview',
          items: [
            { text: 'Introduction', link: '/guide/introduction' },
            { text: 'Installation', link: '/guide/installation' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/xeron/kai' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present Kai Language Contributors'
    },

    editLink: {
      pattern: 'https://github.com/xeron/kai/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    },

    lastUpdated: {
      text: 'Last updated',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'short'
      }
    },

    search: {
      provider: 'local'
    }
  },

  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    },
    lineNumbers: true
  },

  // Ignore dead links for now - we're still building the docs
  ignoreDeadLinks: true
})
