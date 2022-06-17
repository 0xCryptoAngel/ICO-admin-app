<template>
    <!-- eslint-disable-next-line vue/singleline-html-element-content-newline -->
    <span
        class="cursor-grab"
        title="click to copy full text"
        @click="onClick"
        >{{ shortText }}</span
    >
</template>

<script>
export default {
    props: {
        shortText: {
            type: String,
            default: "",
        },
        longText: {
            type: String,
            default: "",
        },
        copiable: {
            type: Boolean,
            default: true,
        },
    },

    setup(props) {
        const onClick = () => {
            navigator.clipboard.writeText(props.longText);
            alert("Text copied to Clipboard!");
        };
        return { onClick };
    },
};
</script>
