import type { Config } from 'tailwindcss'

export default <Partial<Config>> {
    content: [
        'docs/content/**/*.md'
    ],
    theme: {
      extend: {
        screens: {
          'lg-custom': '1000px',
          'ssm': '321px',
        },
      },
    },
    variants: {},
    plugins: [],
}