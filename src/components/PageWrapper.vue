<template>
    <div class="flex flex-col px-10 py-4">
        <div class="flex justify-between">
            <h1 class="text-2xl font-bold">
                {{ $t(title) }}
            </h1>
            <button
                class="flex gap-2 items-center button delete_button"
                @click="onLogout"
            >
                <img
                    src="https://www.svgrepo.com/show/177810/logout-arrows.svg"
                    class="w-4 h-4"
                />
                {{ $t("Log Out") }}
            </button>
        </div>
        <slot />
    </div>
</template>

<script>
export default {
    props: {
        title: { type: String, required: true },
    },
    setup() {
        const onLogout = () => {
            if (window.confirm("Do you really want to logout?")) {
                localStorage.clear();
                window.location.reload();
            }
        };
        return {
            onLogout,
        };
    },
};
</script>
