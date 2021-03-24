import { writable } from 'svelte/store';

export let search_store = writable('');
export let darkmode_store = writable(false);
