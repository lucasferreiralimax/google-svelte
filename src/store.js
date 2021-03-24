import { writable } from 'svelte/store';

export let search_store = writable('');
export let darkmode_store = writable(false);
export let keyboard_store = writable(false);
