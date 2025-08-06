const colors = require("tailwindcss/colors")

module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
    "./utils/**/*.{js,ts,jsx,tsx}",
    "./styles/**/*.{css,scss}",
    "./styles/jit-hack.txt"
  ],

  theme: {
    nightwind: {
      colorClasses: ["gradient", "placeholder"],
      typography: {
        strong: {
          color: colors.white
        }
      },
      colors: {
        white: "#0F1115",
        black: "gray.50",
        sky: {
          50: "#001928"
        }
      }
    },
    extend: {
      screens: {
        xs: "580px"
      },
      colors: {
        gray: colors.gray,
        sky: colors.sky,
        cyan: colors.cyan
      },
      zIndex: {
        "-10": "-10"
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.black"),
            a: {
              textDecorationThickness: "2px",
              textUnderlineOffset: "1px",
              textDecorationColor: theme("colors.blue.600")
            },
            h1: {
              color: theme("colors.black"),
              fontWeight: "900"
            },
            h2: {
              color: theme("colors.black"),
              fontWeight: "900"
            },
            h3: {
              color: theme("colors.black"),
              fontSize: "1.12em"
            },
            blockquote: {
              borderLeftColor: theme("colors.blue.600")
            },
            "blockquote p:first-of-type::before": false,
            "blockquote p:last-of-type::after": false,
            strong: {
              fontWeight: "900"
            },
            img: {
              borderRadius: "0.75rem"
            }
          }
        },
        sm: {
          css: {
            color: theme("colors.black"),
            a: {
              textDecorationThickness: "2px",
              textUnderlineOffset: "1px",
              textDecorationColor: theme("colors.blue.600")
            },
            h1: {
              color: theme("colors.black"),
              fontWeight: "900"
            },
            h2: {
              color: theme("colors.black"),
              fontWeight: "900"
            },
            h3: {
              color: theme("colors.black"),
              fontSize: "1.12em"
            },
            blockquote: {
              borderLeftColor: theme("colors.blue.600")
            },
            "blockquote p:first-of-type::before": false,
            "blockquote p:last-of-type::after": false,
            strong: {
              fontWeight: "900"
            },
            img: {
              borderRadius: "0.75rem"
            }
          }
        }
      })
    }
  },
  variants: {
    nightwind: ["hover"]
  },

  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("nightwind")
  ]
}
