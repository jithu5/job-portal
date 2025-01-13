/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                Oswald: ["Oswald", "sans-serif"],
                Abel: ["Abel", "sans-serif"],
                BarlowSemiCondensed: ["Barlow Semi Condensed", "sans-serif"],
                BebasNeue: ["Bebas Neue", "sans-serif"],
            },
            colors: {
                primary: "#EDEAEB",
                secondary: "#020204",
                third: "#9263f3",
                white: "#FFFFFF",
            },
            fontSize: {
                "10xl": "135px",
                "11xl": "155px",
            },
            rotate:{
                "9": "rotateX(90deg)",
                "180": "rotate(180deg)",
                "270": "rotate(270deg)"
            },
            width:{
                480:"480px"
            },
            height:{
                650:"650px"
            }
        },
    },
    plugins: [],
};
