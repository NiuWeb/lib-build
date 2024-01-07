
/**
 * Options for the build function
 */
export interface BuildOptions {
    /** entry typescript file */
    entry: string
    /** directory to save output code in */
    output: string
    /** run the build in watch mode? defaults `false` */
    watch?: boolean
    /** generate sourcemaps? defaults `true` */
    sourcemap?: boolean
    /** generate type declarations? defaults `true` */
    declarations?: boolean
    /** default tsconfig file. Defaults `tsconfig.json` */
    tsconfig?: string
    /** name of the dependences to exclude from the bundle */
    externals?: string[]
    /** clear the output directory before build? defaults `true` */
    clear?: boolean
    /** generate the cjs build after the esbuild */
    cjs?: boolean
}

/**
 * get default options for the build function
 */
export const defaultOptions = (): Partial<BuildOptions> => ({
    watch: false,
    sourcemap: true,
    declarations: true,
    clear: true,
    externals: [],
    tsconfig: "tsconfig.json"
})