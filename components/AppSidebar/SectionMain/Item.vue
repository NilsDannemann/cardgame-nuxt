<script lang="ts" setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
})
// styles
const item = 'px-5 py-3 flex items-center relative hover:text-yellow-400 cursor-pointer'
const itemIconState = 'flex-none absolute left-4 text-xl text-slate-300 hover:text-slate-900'
const isNested = 'ml-6 !pl-11 pr-5'
</script>

<template>
  <NuxtLink to="#" :class="[item, isNested]">
    <icon v-if="completed" :class="[itemIconState]" name="prime:check" />
    <span class="truncate">
      {{ title }}
    </span>
  </NuxtLink>
</template>