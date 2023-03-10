/*eslint-env node*/
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import vueI18n from "@intlify/vite-plugin-vue-i18n";
import NodeGlobalsPolyfillPlugin from "@esbuild-plugins/node-globals-polyfill";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),

        vueI18n({
            // if you want to use Vue I18n Legacy API, you need to set `compositionOnly: false`
            compositionOnly: false,
            runtimeOnly: false,

            // you need to set i18n resource including paths !
            include: path.resolve(__dirname, "./locales/**"),
        }),
        createSvgIconsPlugin({
            // Specify the icon folder to be cached
            iconDirs: [path.resolve(process.cwd(), "./src/assets/svgIcons")],
            // Specify symbolId format
            symbolId: "icon-[dir]-[name]",
        }),

        NodeGlobalsPolyfillPlugin({
            buffer: true,
        }),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "./runtimeConfig": "./runtimeConfig.browser",
            process: "process/browser",
            stream: "stream-browserify",
            zlib: "browserify-zlib",
            util: "util",
            assert: "assert",
        },
    },
    define: {
        global: "globalThis",
    },
});
