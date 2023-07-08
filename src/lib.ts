import { writeFile } from "fs/promises"
import { build } from "./build"
import { transformFileAsync } from "@babel/core"

build({
    entry: "src/cli.ts",
    output: "lib",
    watch: false,
    clear: true,
    sourcemap: false,
    declarations: false,
    externals: [],
    tsconfig: "tsconfig.build.json"
}).then(async () => {
    console.log("ES6 library build complete")
    console.log("transpiling to ES5...")

    const result = await transformFileAsync("lib/cli.js", {
        presets: ["@babel/preset-env"]
    })
    if (!result) {
        console.error("Error transpiling to ES5")
        return
    }

    const { code } = result

    if (!code) {
        console.error("Error transpiling to ES5")
        return
    }

    await writeFile("lib/cli.js", code)
    console.log("ES5 library build complete")
})