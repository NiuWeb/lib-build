import { join } from "path"
import { BuildOptions } from "./options"
import { transformFileAsync } from "@babel/core"
import { writeFile } from "fs/promises"

export async function buildBabel(opts: BuildOptions) {
    console.log("Generating CJS build with babel...")
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const entryFilename = opts.entry.split("/").pop()!.replace(/\.tsx?$/, ".js")
    const outputFilename = join(opts.output, entryFilename)
    const outputTransformed = outputFilename.replace(/\.js$/, ".cjs.js")

    const result = await transformFileAsync(outputFilename, {
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

    await writeFile(outputTransformed, code)
    console.log("CJS build complete")
}