import tailwindCss from "@tailwindcss/vite";
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2025-05-15",
    devtools: { enabled: true },
    build: { transpile: ["vuetify"] },
    modules: [
        "@nuxt/ui",
        "@nuxt/image",
        "@nuxt/icon",
        (_options, nuxt) => {
            nuxt.hooks.hook("vite:extendConfig", (config) => {
                // @ts-expect-error
                config.plugins.push(vuetify({ autoImport: true }));
            });
        },
    ],
    css: ["~/assets/css/main.css"],
    plugins: ["~/plugins/vuetify.ts"],
    vite: {
        plugins: [tailwindCss()],
        vue: { template: { transformAssetUrls } },
    },
});
