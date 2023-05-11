  /** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

module.exports = {
    theme: {
        fontFamily: {
            sans: ['Work Sans', 'sans-serif']
        },
        colors: {
            'primary'        : '#C6BFAC',
            'primary-variant': '#B57E3E',
            'secondary'      : '#F4F4F4',
            'accent'         : '#27221C',
            'white'          : '#FFFF',
            'black'          : '#000',
            'transparent'    : 'transparent',
        },
    },
    plugins: [
        plugin(function ({ addBase, addComponents, theme }) {
            addBase({
                'html'  : {
                    fontWeight: 500,
                    background: theme('colors.primary')
                }
            })
            addComponents({
                '.link': {
                    position     : 'relative',
                    fontSize     : theme('fontSize.2xl'),
                    marginBottom : theme('spacing.5'),
                    textTransform: 'capitalize',
                    '&::after'   : {
                        content   : '""',
                        position  : 'absolute',
                        left      : 0,
                        right     : 0,
                        bottom    : '-.15rem',
                        background: theme('colors.accent'),
                        transition: 'height .2s ease-out',
                        zIndex    : '-1',
                        height    : 0
                    },
                    '&.router-link-active::after': {
                        height: '.14rem'
                    },
                    '@media screen(sm)': {
                        fontSize    : theme('fontSize.xl'),
                        marginBottom: theme('spacing.0')
                    },
                    '@media screen(2xl)': {
                        fontSize: theme('fontSize.3xl')
                    }
                },
                '.drawer-toggle': {
                    display      : 'flex',
                    flexDirection: 'column',
                    alignSelf    : 'center',
                    padding      : '5px',
                    span         : {
                        height              : theme('spacing.2'),
                        width               : theme('spacing.2'),
                        borderRadius        : theme('borderRadius.full'),
                        border              : '1px solid theme("colors.black")',
                        '&:not(:last-child)': {
                            marginBottom: '5px'
                        }
                    },
                    '&.active span': {
                        backgroundColor: theme('colors.black')
                    }
                },
                '.interior-wrapper': {
                    transition: 'z-index .5s ease-out',
                    '&.end'   : {
                        flexDirection: 'column-reverse',
                        '.title'     : {
                            alignItems: 'flex-start'
                        }
                    },
                    '.info': {
                        '&::before': {
                            content   : "''",
                            position  : 'absolute',
                            left      : 0,
                            right     : 0,
                            bottom    : '-.5rem',
                            background: theme('colors.primary-variant'),
                            transition: 'height .20s ease-out',
                            zIndex    : -1,
                            height    : 0
                        },
                        '&.active::before': {
                            height: '.25rem'
                        }
                    }
                },
                '.hide-scroll': {
                    '&::-webkit-scrollbar': {
                        display: 'none'
                    },
                    '-ms-overflow-style': 'none',
                    'scrollbar-width'   : 'none'
                }
            })
        })
    ]
}