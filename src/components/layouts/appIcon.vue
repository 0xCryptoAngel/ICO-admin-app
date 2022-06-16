<template>
  <router-link
    :to="{ name: 'dashboard' }"
    class="h-16 flex items-center justify-center space-x-3 min-w-64"
  >
    <SvgIcon class="w-8 h-8" name="solai"/>
    <div class="text-3xl font-black ml-2 font-Poppins">Sol.ai</div>
  </router-link>
</template>
