<script lang="ts">
    import { page } from '$app/state';

    export let data: any;

    const bgColors = ['bg-gold', 'bg-silver', 'bg-bronze'];
    
</script>

<div class="mx-auto p-4 pb-[5rem]">
    <h1 class="text-2xl font-bold mb-4">{decodeURIComponent(page.url.pathname.slice(1))}</h1>
    {#if data.data}
        <div class="overflow-x-auto">
            <table class="table-auto w-full border-collapse border border-gray-200 shadow-md text-center">
                <thead>
                    <tr class="bg-gray-100 border-b border-gray-300">
                        {#each Object.keys(data.data[1]) as column}
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
                        {#each Object.values(data.data[0]) as value}
                            <td class="px-4 py-2">{value}</td>
                        {/each}
                    </tr>
                    {#each data.data.slice(1) as row, rowIndex}
                        <tr class=" {rowIndex < 3 ? bgColors[rowIndex] : rowIndex % 2 === 0 ? 'bg-gray-50 hover:bg-gray-100' : 'bg-white hover:bg-gray-100'}">
                            {#each Object.values(row) as value, colIndex}
                                {#if colIndex >= 2}
                                <td class="px-4 py-2">{value.split('(')[0]}<span style="color: red;">{value.split('(').length > 1 ? '(' : ''}{value.split('(')[1]}</span></td>
                                {:else}
                                <td class="px-4 py-2">{value}</td>
                                {/if}
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