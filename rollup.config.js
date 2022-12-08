/** rollup解析及编译TS插件 */
import typescript from '@rollup/plugin-typescript';
// const typescript = require("@rollup/plugin-typescript");

/** 解析代码中依赖的node_modules */
import * as resolve from '@rollup/plugin-node-resolve';

/** rollup文件夹清除插件 */
import {cleandir} from 'rollup-plugin-cleandir';
// const { cleandir } = require("rollup-plugin-cleandir");


export default {
    input: 'src/index.ts', // 入口文件：string | string[]
    output: {
        dir: "./lib",           // 输出文件夹
        // file: 'dist.js',     // 输出文件
        format: 'cjs',          // 输出格式：cjs - CommonJS；ujs
    },
    plugins: [ // 插件组
        // 打包前清除目标文件
        cleandir('./lib'),
        // 解析TS
        typescript({
            module: "esnext",
            exclude: ["./node_modules/**"],
        }),
        resolve.default({
            extensions: [".js", ".ts", ".json"],
            modulesOnly: true,
            preferredBuiltins: false,
        }),
    ]
};
