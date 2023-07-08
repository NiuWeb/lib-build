import { BuildOptions } from "./options"

import esbuild from "esbuild"
import nodeExternalsPlugin from "esbuild-node-externals"

/**
 * Builds the project using esbuild
 */
export async function buildEsbuild(opts: BuildOptions) {
    const { entry, output, sourcemap, externals, watch } = opts
    console.log("Running esbuild")
    const result = await esbuild.build({
        entryPoints: [entry],
        platform: "node",
        outdir: output,
        format: "esm",
        bundle: true,
        sourcemap: sourcemap ? "both" : false,
        plugins: [
            nodeExternalsPlugin({
                allowList: externals || []
            }),
        ],
        watch: !watch ? undefined : {
            onRebuild(error, result) {
                if (error) {
                    console.error("[ESBUILD ERROR]", error)
                }
                if (result) {
                    console.log("[ESBUILD]", result)
                }
            },
        }
    })
    console.log("esbuild complete")
    return result
}