import * as esbuild from 'esbuild'
import child_process from "child_process";
let start = Date.now();
function buildDts(entryPoints, dir) {
    // try {
    //     child_process.execSync(`npx tsc ${entryPoints.join(" ")} --declaration --emitDeclarationOnly --outDir ${dir}`);
    // } catch (e) { }
    /// output
    try {
        let result = child_process.execSync(`npx tsc ${entryPoints.join(" ")} --declaration --emitDeclarationOnly --outDir ${dir}`);
        console.log(result.toString("utf-8"));
    } catch (e) {
        console.log(e.stdout.toString("utf-8"));
    }
}
const entryPoints = [
    "src/index.ts",
    "src/components.tsx"
];
const defaults = {
    minify: true,
    outdir: "dist/",
}
async function build(opt) {
    for (let i = 0; i < entryPoints.length; i++) {
        await esbuild.build({
            entryPoints: [entryPoints[i]],
            ...defaults,
            ...opt,
            bundle: i==0,
            external: i==0?["preact","."]:undefined,
        })
    }
}
console.log("Building CommonJS");
await build({
    format: "cjs",
    outExtension: { ".js": ".cjs" }
});
console.log("Building ESM");
await build({
    format: "esm",
    outExtension: { ".js": ".mjs" }
});
console.log("Building CommonJS DTS")
buildDts(entryPoints, "dist/");
console.log("built dts")
console.log("Build Complete in " + (Date.now() - start) + "ms")

