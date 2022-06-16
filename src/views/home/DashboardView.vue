<template>
  <div class="bg-gray-40">
    <page-wrapper title="Dashboard">
      <div>
        <div class="grid grid-cols-4 gap-4">
          <div class="bg-white rounded-md p-4 flex items-center">
            <img src="../../assets/svgIcons/user_icon.svg" class="w-12 mr-4" />
            <div>
              <p class="text-gray-400">Number of Real Users</p>
              <p class="text-slate-900 text-2xl">8282</p>
            </div>
          </div>
          <div class="bg-white rounded-md p-4 flex items-center">
            <img src="../../assets/svgIcons/user_icon.svg" class="w-12 mr-4" />
            <div>
              <p class="text-gray-400">Number of Virtual Users</p>
              <p class="text-slate-900 text-2xl">8282</p>
            </div>
          </div>
          <div class="bg-white rounded-md p-4 flex items-center">
            <img src="../../assets/svgIcons/user_icon.svg" class="w-12 mr-4" />
            <div>
              <p class="text-gray-400">Number of Total Authorized User</p>
              <p class="text-slate-900 text-2xl">8282</p>
            </div>
          </div>
          <div class="bg-white rounded-md p-4 flex items-center">
            <img src="../../assets/svgIcons/user_icon.svg" class="w-12 mr-4" />
            <div>
              <p class="text-gray-400">
                USDC Balance Total amount of authorized users' earnings
              </p>
              <p class="text-slate-900 text-2xl">8282</p>
            </div>
          </div>
          <div class="bg-white rounded-md p-4 flex items-center">
            <img src="../../assets/svgIcons/user_icon.svg" class="w-12 mr-4" />
            <div>
              <p class="text-gray-400">Number of authorized users today</p>
              <p class="text-slate-900 text-2xl">8282</p>
            </div>
          </div>
        </div>
      </div>
    </page-wrapper>
  </div>
</template>

<script>
import PageWrapper from "@/components/PageWrapper.vue";
export default {
  components: {
    PageWrapper,
  },

  setup() {},
};
</script>
