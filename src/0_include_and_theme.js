
//include
Object.assign(window, MaterialUI);


//100vh
document.documentElement.style.setProperty(
    "--vh100", `${window.innerHeight}px`
);
window.addEventListener("resize", () =>
    document.documentElement.style.setProperty(
        "--vh100", `${window.innerHeight}px`
    )
);


//short variables
const green_hue = 158;
const pal = {
    yellow: "hsl(52, 100%, 50%)",
    green: "#30d865", // spotify light green'
    //darkgreen: "hsl(141, 100%, 33%)",
    darkgreen: `hsl(${green_hue}, 100%, 30%)`,
    gray: "hsla(0, 0%, 7%, 0.6)",
    lightgray: "hsl(0, 0%, 38%)",
    bgmain:  "hsl(162, 30%,  21%)",
    bglight: "hsl(162, 28%,  21.5%)",
    bgdark:  "hsl(162, 27%,  19%)",
    bgpaper: "hsl(162, 100%, 13%)",
    bgyellow:"hsl(52,  91%,  50%)",
    txtmain: "hsl(47,  100%, 61%)",
    txtdark: "hsla(47, 100%, 55%, 0.9)",
    bggray: "hsl(0, 0%, 45%)",
    bgloading: "hsla(0,0%,0%, 0.55)",
    spotify: {
        //green: "hsl(141, 73%, 42%)",
        green: `hsl(${green_hue}, 63%, 45%)`,
        black: "#121212",
        white: "#ffffff",
    },
};

const radius = 7;


//set theme
const theme = createTheme({

    palette: {
        mode: "dark",
        primary: {
            main: pal.yellow,
        },
        secondary: {
            main: pal.spotify.green,
        },
        background: {
            default: pal.bgmain,
            paper: pal.bgpaper,
        },
        text: {
            primary: "#ffd438ff",
        },
        divider: "#808080",
    },

    shape: {
        borderRadius: radius,
    },

    typography: {
        fontSize: 15,
        fontFamily: '"Nunito", "Roboto", "Helvetica", "Arial", sans-serif',
        button: {
            textTransform: "none"
        },
    },

    spacing: 9,

    components: {
        MuiTooltip: {
            defaultProps: {
                arrow: true,
                placement: "top",
            },
            styleOverrides: {
                tooltip: {
                    fontSize: 15,
                    background: pal.bggray,
                    padding: "0.8em",
                },
                arrow: {
                    color: pal.bggray,
                },
            }
        },
    },
});