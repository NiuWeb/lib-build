import { exec } from "child_process"
import { BuildOptions } from "./options"

/**
 * builds the typescript declarations
 */
export async function buildDeclarations({ watch, tsconfig }: BuildOptions) {
    console.log("Running typescript compiler")

    const cmd = [
        "npx tsc --declaration --emitDeclarationOnly",
        `--project "${tsconfig}"`,
        watch ? "--watch" : "",
    ].join(" ")

    const stream = exec(cmd)

    await new Promise<void>((resolve) => {
        stream.on("error", (out) => {
            console.error(out)
        })
        stream.on("close", () => {
            console.log("tsc completed")
            resolve()
        })

        stream.stdout?.on("data", out => console.log(out.toString()))
        stream.stderr?.on("data", out => console.error(out.toString()))
    })
}