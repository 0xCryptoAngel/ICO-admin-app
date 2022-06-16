
<template>
  <div class="flex flex-col w-100 space-y-5 bg-white rounded-3xl px-4 py-4">
    <div class="flex justify-start">
      <h1 class="text-lg font-bold">Введите информацию</h1>
    </div>
      <div class="flex flex-col">
        <div class="flex justify-between my-1">
          <div class="flex flex-col w-64">
            <div class="mb-2">Наименование</div>
            <input
              id="houseName"
              name="houseName"
              v-model="houseName"
              type="text"
              placeholder=" "
              required
              class="rounded-full border-1 py-2 px-4 "
            />
          </div>
          <div class="flex flex-col w-64">
            <div class="mb-2">Адрес</div>
            <input
              id="address"
              name="address"
              v-model="address"
              type="text"
              placeholder=" "
              required
              class="rounded-full border-1 py-2 px-4"
            />
          </div>
        </div>
        <div class="flex justify-between my-1">
          <div class="flex flex-col w-64">
            <div class="mb-2">Latitude</div>
            <input
              id="latitude"
              name="latitude"
              v-model="latitude"
              type="text"
              placeholder=" "
              required
              class="rounded-full border-1 py-2 px-4 "
            />
          </div>
          <div class="flex flex-col w-64">
            <div class="mb-2">Longitude</div>
            <input
              id="id"
              name="id"
              v-model="longitude"
              type="text"
              placeholder=" "
              required
              class="rounded-full border-1 py-2 px-4"
            />
          </div>
        </div>
        <div class="flex justify-start my-1">
          <div class="flex flex-col w-64">
            <div class="mb-2">ID склада в Вашей системе</div>
            <input
              id="id"
              name="id"
              type="text"
              v-model="systemId"
              placeholder=" "
              required
              class="rounded-full border-1 py-2 px-4 "
            />
          </div>
        </div>
        <div class="flex justify-end my-1">
          <dp-button
            text="Добавить"
            type="button"
            @click="createWareHouse()"
            class="
              text-white
              bg-purple-450
              bg-secondary
              disabled:opacity-50
            "
          />
        </div>
      </div>
    <p class="text-red-500 mt-1 w-full min-h-6">{{ errorMessage }}</p>
  </div>
</template>

<script>
import DpButton from '@/components/buttons/DpButton.vue'
import LoginInput from '@/components/inputs/LoginInput.vue'
import { ref } from '@vue/runtime-core'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  components: { DpButton, LoginInput },

  setup() {
    const store = useStore()
    const router = useRouter()
    const houseName = ref('')
    const address = ref('')
    const latitude = ref('')
    const longitude = ref('')
    const systemId = ref('')
    const errorMessage = ref('')
    const createWareHouse = async () => {
      try {
        errorMessage.value = ''
        const payload = {
          name: houseName.value,
          address: address.value,
          client_db_id: systemId.value,
          geom: {
              type: "Point",
              coordinates: [
              parseFloat(latitude.value),
              parseFloat(longitude.value)
            ]
          },
        }
        await store.dispatch('warehouse/createWareHouse', payload)
        router.push("/warehouses")

      } catch (err) {
        console.error(err)
        errorMessage.value = err?.message || err
      }
    }

    return {
      houseName,
      address,
      latitude,
      longitude,
      systemId,
      errorMessage,
      createWareHouse
    }
  },
}
</script>
