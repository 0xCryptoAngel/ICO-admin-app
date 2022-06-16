<template>
    <app-layout>
        <router-view />
    </app-layout>
</template>

<style lang="postcss">
table {
    @apply w-full text-sm text-left;
}
thead {
    @apply text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400;
}
tr th {
    @apply py-3;
}
tr th:first-child {
    @apply px-3;
}
tr td:first-child {
    @apply py-3;
}
tr td:first-child,
tr td:last-child {
    min-width: 5rem;
    @apply px-3;
}
.select {
    @apply border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block py-2 px-4 w-fit;
}
.button {
    @apply bg-blue-600 hover:bg-blue-700 focus:ring-blue-800 text-sm text-white  focus:outline-none focus:ring-4 font-medium rounded-full px-3 py-2 text-center;
    @apply disabled:cursor-not-allowed disabled:bg-gray-500 duration-150;
    @apply cursor-pointer;
}
.textarea {
    @apply block p-2.5 w-full text-sm text-gray-900 border border-gray-300  dark:border-gray-600 dark:placeholder-gray-400;
    resize: none;
}
.edit_button {
    @apply bg-cyan-600 hover:bg-cyan-800 focus:ring-cyan-800;
}
.delete_button {
    @apply bg-pink-500 hover:bg-pink-600 focus:ring-pink-800;
}
.info_button {
    @apply bg-emerald-500 hover:bg-emerald-600 focus:ring-emerald-800;
}
.trans_input {
    @apply outline-none w-full duration-150 text-gray-400 focus:text-gray-800 focus:bg-slate-500/20;
}
</style>
