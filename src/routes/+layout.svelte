<script lang="ts">
    import Header from "$lib/components/Header.svelte";
import "../app.css";
    import { onMount } from "svelte";

    let isOpen = false;
    export let data: any; // Array of contest names
    let contests: string[] = [];

    function toggleDropdown() {
        isOpen = !isOpen;
    }

    function closeDropdown() {
        isOpen = false;
    }

    onMount(() => {
        for (let file of data.files) {
            if (file.endsWith(".xlsx")) {
                contests.push(file.replace(".xlsx", "").replace("Rank-", "")); // Extract the contest name
            }
        }
    });
</script>

<Header />

<div class="flex flex-col items-center gap-5">
    <div class="main inline-block text-left mt-5" on:click|self={closeDropdown}>
        <!-- Dropdown Button -->
        <button
            type="button"
            class="inline-flex w-full justify-center gap-x-2 rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-gray-300 hover:bg-gray-100 focus:outline-none"
            on:click|preventDefault={toggleDropdown}
        >
            Contest LeaderBoard
            <svg
                class="h-5 w-5 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19 9l-7 7-7-7"
                />
            </svg>
        </button>

        <!-- Dropdown Menu -->
        {#if isOpen}
            <div
                class="menu absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
                <div class="py-1" role="menu">
                    {#each contests as contest}
                        <a
                            href="/{contest}"
                            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                            role="menuitem"
                            on:click={() => {
                                isOpen = false;
                                // window.location.reload();
                            }}
                        >
                            {contest}
                        </a>
                    {/each}
                </div>
            </div>
        {/if}
    </div>
</div>

<slot></slot>

<style>
    .menu {
        left: 50%;
        transform: translate(-50%, 0);
    }
</style>
