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
    @apply text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400;
}
tr th {
    @apply py-3;
}
tr th:first-child {
    @apply px-3;
}
tr td:first-child,
tr td:last-child {
    min-width: 8rem;
    @apply px-3;
}
.select {
    @apply border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block py-2 px-4 w-fit;
}
.button {
    @apply my-1 text-sm text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full px-3 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800;
    @apply disabled:cursor-not-allowed disabled:bg-gray-500 duration-150;
}
.edit_button {
    @apply bg-cyan-600 hover:bg-cyan-800;
}
.delete_button {
    @apply bg-pink-500 hover:bg-pink-600;
}
</style>
