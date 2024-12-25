import fs from 'fs';
import path from 'path';
import type { RequestEvent } from '@sveltejs/kit';

export async function load() {
    const staticPath = path.resolve('static');
    try {
        // Read the contents of the static folder
        const files = fs.readdirSync(staticPath);
        return {files};
    } catch (error) {
        return {
            status: 500,
            error: new Error('Could not read directory')
        };
    }
}

export const actions = {
    default: async ({ request }: RequestEvent) => {
        const formData = await request.formData();
        const file = formData.get('file');

        if (!file || !(file instanceof File)) {
            return { status: 400, body: { error: 'Invalid file upload' } };
        }

        try {
            // Convert the file to a buffer
            const buffer = Buffer.from(await file.arrayBuffer());
            // Define the save path in the static folder
            const staticDir = path.join(process.cwd(), 'static');
            const savePath = path.join(staticDir, file.name);

            // Ensure the static folder exists
            await fs.promises.mkdir(staticDir, { recursive: true });

            // Save the file to the static folder
            await fs.promises.writeFile(savePath, buffer);

            return { 
                status: 200, 
                body: { 
                    message: `File uploaded successfully to static/${file.name}`,
                } 
            };
        } catch (err) {
            console.error('Error saving file:', err);
            return { 
                status: 500, 
                body: { error: 'Failed to save file' } 
            };
        }
    }
};

