module.exports = {
    preset: 'ts-jest',
    runner: 'jest-electron/runner',
    testEnvironment: 'jest-electron/environment',
    testPathIgnorePatterns: [
        'build/',
        'lib',
    ],
    moduleNameMapper: {
        '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'identity-obj-proxy',
    },
    collectCoverageFrom: [
        'src/api/**/*.{js,jsx,ts,tsx}',
        '!<rootDir>/node_modules/',
        '!**/index.ts',
    ],
};
