// import this after install `@mdi/font` package
import "@mdi/font/css/materialdesignicons.css";

import { createVuetify } from "vuetify";
import "vuetify/styles";
import colors from "vuetify/util/colors";

export default defineNuxtPlugin((app) => {
    const vuetify = createVuetify({
        theme: {
            themes: {
                dark: {
                    dark: true,
                    colors: {
                        primary: colors.blue.darken2,
                        secondary: colors.grey.darken3,
                        accent: colors.shades.black,
                        error: colors.red.accent2,
                        info: colors.blue.base,
                        success: colors.green.accent3,
                        warning: colors.amber.base,
                    },
                },
                light: {
                    dark: false,
                    colors: {
                        primary: colors.blue.lighten1,
                        secondary: colors.grey.lighten3,
                        accent: colors.shades.white,
                        error: colors.red.accent2,
                        info: colors.blue.base,
                        success: colors.green.accent3,
                        warning: colors.amber.base,
                    },
                },
            },
        },
    });
    app.vueApp.use(vuetify);
});
