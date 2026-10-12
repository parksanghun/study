import { readFile, writeFile } from "node:fs/promises";

const htmlPath = new URL("../dist/index.html", import.meta.url);
const cssPath = new URL("../src/styles.css", import.meta.url);
const [html, css] = await Promise.all([readFile(htmlPath, "utf8"), readFile(cssPath, "utf8")]);
const inline = `<style data-inline-site-styles>\n${css}\n</style>`;
const output = html.replace("</head>", `${inline}</head>`);
await writeFile(htmlPath, output);
console.log("Inlined site CSS into dist/index.html");
