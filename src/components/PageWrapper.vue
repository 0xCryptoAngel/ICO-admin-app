<template>
    <div class="flex flex-col px-10 py-4">
        <h1 class="text-2xl font-bold">
            {{ $t(title) }}
        </h1>
        <slot />
    </div>
</template>

<script>
export default {
    props: {
        title: { type: String, required: true },
    },
};
</script>
