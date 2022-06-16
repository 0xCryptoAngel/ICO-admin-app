<template>
    <div class="">
        <table class="w-full">
            <thead>
                <tr class="text-sm font-bold">
                    <th>Staking Time</th>
                    <th>Ending Time</th>
                    <th>Address</th>
                    <th>Amount</th>
                    <th>Category</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody class="divide-y">
                <CustomerRow
                    v-bind="$attrs"
                    v-for="(link, index) in applicationsData"
                    :key="index"
                    :link="link"
                />
            </tbody>
        </table>
    </div>
</template>
<script>
import CustomerRow from "./CustomerRow.vue";
export default {
    components: { CustomerRow },
    props: {
        applicationsData: { type: Array, required: true },
    },
};
</script>
