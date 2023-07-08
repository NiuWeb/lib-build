import { BuildOptions, defaultOptions } from "./options"
import { existsSync } from "fs"
import klawSync from "klaw-sync"
import rimraf from "rimraf"
import { buildEsbuild } from "./esbuild"
import { buildDeclarations } from "./declarations"


/**
 * Builds a typescript project using esbuild and tsc
 */
export async function build(opts: BuildOptions) {
    opts = { ...defaultOptions(), ...opts }


    console.log("Building typescript project with options:", opts)

    // clear before build
    if (opts.clear && existsSync(opts.output)) {
        console.log(`Clearing output directory at ${opts.output}`)
        const lib = klawSync(opts.output)
        lib.forEach(({ path }) => (
            rimraf.sync(path)
        ))
        console.log("Clear completed")
    }

    const promises: Promise<unknown>[] = []

    promises.push(buildEsbuild(opts))
    if (opts.declarations) {
        promises.push(buildDeclarations(opts))
    }

    await Promise.all(promises)
}