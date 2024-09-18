import * as esbuild from 'esbuild'
import child_process from "child_process";
let start=Date.now();
function buildDts(entryPoints, dir) {
    // try {
    //     child_process.execSync(`npx tsc ${entryPoints.join(" ")} --declaration --emitDeclarationOnly --outDir ${dir}`);
    // } catch (e) { }
    /// output
    try{
        let result=child_process.execSync(`npx tsc ${entryPoints.join(" ")} --declaration --emitDeclarationOnly --outDir ${dir}`);
        console.log(result.toString("utf-8"));
    }catch(e){
        console.log(e.stdout.toString("utf-8"));
    }
}
const defaults = {
    entryPoints: [
        "src/index.ts",
        "src/components.tsx"
    ],
    bundle: true,
    minify: true,
    external: ["preact"],
    outdir: "dist/",
}
console.log("Building CommonJS");
await esbuild.build({
    ...defaults,
    format: "cjs",
    outExtension: { ".js": ".cjs" }
});
console.log("Building CommonJS DTS")
buildDts(defaults.entryPoints, "dist/");
console.log("Building ESM");
await esbuild.build({
    ...defaults,
    format: "esm",
    outExtension: { ".js": ".mjs" }
});
// console.log("Building ESM DTS");
// buildDts(defaults.entryPoints, "dist/esm");
console.log("Build Complete in " + (Date.now() - start) + "ms")