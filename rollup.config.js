import commonjs from '@rollup/plugin-commonjs';
import image from 'rollup-plugin-image-files';
import pkg from './package.json';
import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';

export default {
    input: 'src/index.ts',
    output: [
        {
            file: pkg.main,
            format: 'cjs',
            exports: 'named',
            sourcemap: true,
        },
    ],
    plugins: [
        resolve(),
        image(),
        typescript({
            rollupCommonJSResolveHack: true,
            exclude: [
                '**/__tests__/**',
                '**/*.stories.tsx',
            ],
            clean: true,
            tsconfig: './tsconfig.build.json',
            useTsconfigDeclarationDir: true,
            tsconfigOverride: {
                declaration: false,
            },
        }),
        commonjs({
            include: ['node_modules/**'],
            namedExports: {
                'node_modules/react/react.js': [
                    'Children',
                    'Component',
                    'PropTypes',
                    'createElement',
                ],
                'node_modules/react-dom/index.js': ['render'],
            },
        }),
    ],
};
