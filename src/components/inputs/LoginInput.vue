<template>
  <div class="flex flex-col">
    <div class="mb-2">{{ label }}</div>
    <input
      :id="id"
      v-model="message"
      :name="id"
      :type="inputType"
      placeholder=" "
      required
      @focus="handleFocus(true)"
      @blur="handleFocus(false)"
      class="rounded-full border-1 py-2 px-4"
    />
    
  </div>
</template>

<script>
import { useModelWrapper } from '@/utils/modelWrapper'
import { ref } from '@vue/reactivity'
import { computed } from '@vue/runtime-core'

export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    placeholder: { type: String, required: true },
    label: { type: String, required: true },
    modelValue: { type: String, required: true },
  },

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const focus = ref(false)
    const showPassword = ref(false)
    const message = useModelWrapper(props, emit)

    const inputType = computed(() =>
      props.type === 'password' && showPassword.value ? 'text' : props.type,
    )
    const labelValue = ref(props.placeholder)
    const handleFocus = (value) => {
      focus.value = value
      if (value || message.value?.length > 0) labelValue.value = props.label
      else labelValue.value = props.placeholder
    }

    return {
      message,
      focus,
      labelValue,
      handleFocus,
      showPassword,
      inputType,
    }
  },
}
</script>