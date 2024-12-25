<script lang="ts">
    import { page } from '$app/state';
    import { onMount } from 'svelte';
    import * as XLSX from 'xlsx';

    let data: any;
    let fileName: string = "";

    const fetchAndParseExcel = async () => {
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
            data = XLSX.utils.sheet_to_json(worksheet);

        } catch (error) {
            console.error('Error fetching or parsing the Excel file:', error);
        }
    };

    onMount(() => {
        fileName = '/Rank-' + decodeURIComponent(page.url.pathname.slice(1)) + '.xlsx';
        fetchAndParseExcel();
    });
</script>

<div class="container mx-auto p-4 pb-[5rem]">
    <h1 class="text-2xl font-bold mb-4">{decodeURIComponent(page.url.pathname.slice(1))}</h1>
    {#if data}
        <div class="overflow-x-auto">
            <table class="table-auto w-full border-collapse border border-gray-200 shadow-md text-center">
                <thead>
                    <tr class="bg-gray-100 border-b border-gray-300">
                        {#each Object.keys(data[1]) as column}
                            <th class="px-4 py-2 font-medium text-gray-600">{column}</th>
                        {/each}
                    </tr>
                </thead>
                <tbody>
                    <tr class="bg-white border-b border-gray-200">
                        <td class="px-4 py-2"></td>
                        <td class="px-4 py-2"></td>
                        <td class="px-4 py-2"></td>
                        <td class="px-4 py-2"></td>
                        {#each Object.values(data[0]) as value}
                            <td class="px-4 py-2">{value}</td>
                        {/each}
                    </tr>
                    {#each data.slice(1) as row, rowIndex}
                        <tr class="{rowIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100">
                            {#each Object.values(row) as value}
                                <td class="px-4 py-2">{value}</td>
                            {/each}
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    {:else}
        <p class="text-gray-500">Loading...</p>
    {/if}
</div>