<template>
    <!-- eslint-disable-next-line vue/singleline-html-element-content-newline -->
    <label
        :for="`toggle_${id}`"
        class="inline-flex relative items-center cursor-pointer"
    >
        <input
            :id="`toggle_${id}`"
            :checked="value"
            type="checkbox"
            class="sr-only peer"
            @change="onChange"
        />
        <div
            :class="`${
                type === 'success'
                    ? 'bg-gray-700 peer-checked:bg-blue-600'
                    : 'peer-checked:bg-gray-700 bg-pink-600'
            } w-7 h-4 after:h-3 after:w-3 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:transition-all`"
        ></div>
    </label>
</template>

<script>
export default {
    props: {
        id: {
            type: String,
            default: "0",
        },
        type: {
            type: String,
            default: "success",
        },
        value: {
            type: Boolean,
            default: true,
        },
    },

    emits: ["toggled"],
    setup(props, { emit }) {
        const onChange = (e) => {
            emit("toggled", e.target.checked);
        };
        return { onChange };
    },
};
</script>
