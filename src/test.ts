import { build } from "@src/build"

console.log(`Test file. Compile this by running:
    npx lib-build -e src/test.ts -o testdir
`)

console.log("If path aliases are working, this code should run")
console.log(typeof build)