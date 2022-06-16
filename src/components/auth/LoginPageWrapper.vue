<template>
  <div class="flex min-h-screen justify-center bg-gray-40">
    <div class="flex flex-col my-auto space-y-8  w-100">
      <div class="flex items-center flex-col space-y-4">
        <div class="text-2xl font-bold">Добро пожаловать!</div>
        <div class="flex items-center">
          <SvgIcon class="w-10 h-10" name="solai"/>
          <div class="text-3xl font-black ml-2 font-Poppins">Sol.ai</div>
        </div>
      </div>
      <div class="flex flex-col items-center rounded-2xl mx-2 bg-white">
        <slot />
      </div>
    </div>
  </div>
</template>