// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const plugin = require('tailwindcss/plugin')
/** @type {import('tailwindcss').Config} */
export const content = ['./index.html', './src/**/*.{js,ts,jsx,tsx}']
export const theme = {
    extend: {
        colors: {
            orange: '#ee4d2d',
        },
    },
    plugins: [
        plugin(function ({ addComponents, theme }) {
            addComponents({
                '.container': {
                    maxWidth: theme('columns.7xl'),
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    paddingLeft: theme('spacing.4'),
                    paddingRight: theme('spacing.4'),
                },
            })
        }),
        // eslint-disable-next-line no-undef
        require('@tailwindcss/line-clamp'),
        // eslint-disable-next-line no-undef
    ],
}
export const plugins = []
