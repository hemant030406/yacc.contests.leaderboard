import * as XLSX from 'xlsx';

export async function load({ params, fetch }: { params: { contest: string }, fetch: typeof globalThis.fetch }) {
    console.log(params.contest);
    let data = await fetchAndParseExcel('Rank-' + params.contest + '.xlsx', fetch);
    return {data};
}

const fetchAndParseExcel = async (fileName: string, fetch: typeof globalThis.fetch) => {
    try {
        // Fetch the Excel file from the static folder
        const response = await fetch(fileName);
        if (!response.ok) {
            throw new Error(`Failed to fetch the file: ${response.statusText}`);
        }

        // Read the response as a binary array
        const arrayBuffer = await response.arrayBuffer();

        // Parse the binary data using XLSX
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });

        // Access the desired sheet (e.g., 'Sheet1')
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];

        // Convert the sheet data to JSON
        return XLSX.utils.sheet_to_json(worksheet);

    } catch (error) {
        console.error('Error fetching or parsing the Excel file:', error);
    }
};