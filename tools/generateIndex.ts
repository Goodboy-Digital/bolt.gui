import fs from 'fs';
import micromatch from 'micromatch';
import path from 'path';
import tsconfig from '../tsconfig.json';

// Read exclude list from tsconfig
const excludeList = tsconfig.exclude || [];

excludeList.push('**/__tests__/**', '**/assets/**', '**/__stories__/**');

const args = {};

process.argv.forEach((val) =>
{
    args[val] = true;
});

// loop through a directory and every time a folder is found
function traverseDir(dir: string): void
{
    fs.readdirSync(dir).forEach((file) =>
    {
        const fullPath = path.join(dir, file);

        // Ignore files and folders listed in tsconfig exclude list
        if (micromatch.isMatch(fullPath, excludeList)) return;

        if (fullPath.match)
        {
            if (fs.lstatSync(fullPath).isDirectory())
            {
                // if its a directory then we should check if there is an index file
                // if there is we should remove it and replace it with a new one
                const directoryList = getDirectoryList(fullPath);

                if (directoryList.length)
                {
                    const indexLocation = path.join(fullPath, './index.ts');

                    // deleting the old file
                    fs.existsSync(indexLocation) && fs.unlinkSync(indexLocation);

                    writeIndexFile(indexLocation, directoryList);

                    traverseDir(fullPath);
                }
            }
        }
    });
}

function getDirectoryList(dir: string)
{
    const fileNames: string[] = [];

    fs.readdirSync(dir).forEach((file) =>
    {
        if (file === 'index.ts') return;

        const fullPath = path.join(dir, file);

        // lets ignore any folder that is empty..
        if (fs.lstatSync(fullPath).isDirectory() && !fs.readdirSync(fullPath).length) return;

        // also ignore files listed in tsconfig exclude files
        if (micromatch.isMatch(fullPath, excludeList)) return;

        const splitName = file.split('.');

        if (splitName.length > 2)
        {
            console.warn(`[generateIndex] Skipping file: ${file} please manually check if this is needed`);

            return;
        }

        if (splitName[0].length)
        {
            fileNames.push(splitName[0]);
        }
    });

    return fileNames;
}

function writeIndexFile(dir: string, dirList: string[])
{
    let contents = '';

    dirList.forEach((item) =>
    {
        contents += `export * from './${item}';\n`;
    });

    fs.writeFile(dir, contents, { flag: 'w' }, (err) =>
    {
        if (err) console.error(err);
    });
}

traverseDir(path.join(__dirname, '../src'));

const watch = !!args['-w'];

if (watch)
{
    // eslint-disable-next-line no-console
    console.log('[generateIndex] watching for file changes, don\'t rewrite the index files... we will do it for you!');

    fs.watch('./src', { recursive: true }, (action, filename) =>
    {
        if (path.basename(filename) === 'index.ts') return;

        if (action === 'rename')
        {
            traverseDir(path.join(__dirname, '../src'));
        }
    });
}
