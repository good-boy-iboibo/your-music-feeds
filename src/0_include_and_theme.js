
//include
Object.assign(window, MaterialUI);

//short variables
const pal = {
    yellow: "hsl(52, 100%, 50%)",
    green: "#30d865", // spotify light green'
    darkgreen: "hsl(141, 100%, 33%)",
    gray: "hsla(0, 0%, 7%, 0.6)",
    lightgray: "hsl(0, 0%, 38%)",
    bgmain:  "hsl(162, 30%,  21%)",
    bglight: "hsl(162, 28%,  21.5%)",
    bgdark:  "hsl(162, 27%,  19%)",
    bgpaper: "hsl(162, 100%, 13%)",
    bgyellow:"hsl(52,  91%,  50%)",
    txtmain: "hsl(47,  100%, 61%)",
    txtdark: "hsla(47, 100%, 55%, 0.9)",
    spotify: {
        green: "hsl(141, 73%, 42%)",
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
        fontFamily: "Nunito",
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
        },
    },
});