import fs from 'fs';
import path from 'path';
import { FOLDER_URL } from '$lib/urls';

export async function load() {
    const localFolderPath = path.resolve(FOLDER_URL);
    const staticFolderPath = path.resolve('static');

    try {
        const subfolders = fs.readdirSync(localFolderPath).filter(subfolder =>
            fs.statSync(path.join(localFolderPath, subfolder)).isDirectory()
        );

        // Object to store files from each subfolder
        let files: any = [];

        for (const subfolder of subfolders) {
            if (subfolder != 'Roadmap Contests' && subfolder != 'Training Contests') continue;
            const subfolderPath = path.join(localFolderPath, subfolder);
            const contests = fs.readdirSync(subfolderPath).filter(file =>
                fs.statSync(path.join(subfolderPath, file)).isFile()
            );

            for (const contestFile of contests) {
                const filePath = path.join(subfolderPath, contestFile);
                const newFileName = path.basename(filePath); 
                const newFilePath = path.join(staticFolderPath, newFileName);

                fs.copyFileSync(filePath, newFilePath);
            }

            files = [...files, ...contests]; 
        }
        console.log(files);
        return { files };
    } catch (error) {
        return {
            status: 500,
            error: new Error(`Could not read directories: ${error.message}`)
        };
    }
}

