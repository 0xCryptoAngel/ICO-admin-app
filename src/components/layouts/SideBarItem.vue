<template>
  <router-link
    v-if="!item.subLinks"
    v-slot="{ isActive }"
    class="flex text-gray-900 text-base"
    active-class="text-primary font-bold"
    :to="{ name: `${item.pathName}` }"
  >
    <div
      :class="isActive ? 'border-primary rounded-r-md' : 'border-white'"
      class="flex border-2"
    />
    <div class="flex py-2 items-center px-5">
      <SvgIcon
        class="w-8 h-8"
        :name="isActive ? item.icon_active : item.icon"
      />
      <p class="pl-5">{{ item.title }}</p>
    </div>
  </router-link>
  <div v-else>
    <div @click="onClicked = !onClicked" class="cursor-pointer">
      <div class="flex py-2 items-center px-5">
        <SvgIcon
          class="w-8 h-8"
          :name="onClicked ? item.icon_active : item.icon"
        />
        <p class="pl-5">{{ item.title }}</p>
      </div>
    </div>
    <router-link
      v-show="onClicked"
      v-for="subItem in item.subLinks"
      v-slot="{ isActive }"
      class="flex text-gray-900 text-base"
      active-class="text-primary font-bold"
      :to="{ name: `${subItem.pathName}` }"
    >
      <div
        :class="isActive ? 'border-primary rounded-r-md' : 'border-white'"
        class="flex border-2"
      />
      <div class="flex py-2 items-center px-5">
        <p class="pl-5">{{ subItem.title }}</p>
      </div>
    </router-link>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { computed } from "vue";
import { ref } from "@vue/runtime-core";
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const onClicked = ref(false);
    // const onClick = () => {
    //   console.log(onClicked);
    //   onClicked.value = !onClicked.value;
    // };

    return {
      onClicked,
      // onClick,
    };
  },
};
</script>
