#! /usr/bin/env node
import { ArgumentParser } from "argparse"
import { BuildOptions, build } from "./build"
import { join } from "path"
// import { join } from "path"

const parser = new ArgumentParser({
    description: "Build a typescript project using esbuild and tsc"
})

parser.add_argument("-e", "--entry", { help: "entry typescript file", required: true })
parser.add_argument("-o", "--output", { help: "directory to save output code in", required: true })
parser.add_argument("-w", "--watch", { help: "run the build in watch mode?", default: false })
parser.add_argument("-c", "--clear", { help: "clear the output directory before build?", default: true })
parser.add_argument("-x", "--externals", { help: "name of the dependences to exclude from the bundle, comma separated" })
parser.add_argument("-t", "--tsconfig", { help: "default tsconfig file", default: "tsconfig.json" })

const parsed = parser.parse_args()
const args = { ...parsed } as BuildOptions

args.entry = join(process.cwd(), args.entry)
args.output = join(process.cwd(), args.output)
if (args.tsconfig) {
    args.tsconfig = join(process.cwd(), args.tsconfig)
}

args.externals = parsed.externals.split(",").map((e: string) => e.trim())

build(args)