<script lang="ts" setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  open: {
    type: Boolean,
    default: false,
  },
  locked: {
    type: Boolean,
    default: false,
  },
  nested: {
    type: Boolean,
    default: false,
  },
  showProgress: {
    type: Boolean,
    default: false,
  },
})
// styles
const folder = 'pl-5 py-3 pr-15 flex items-center relative hover:text-yellow-400 text-slate-900 font-semibold cursor-pointer'
const folderIconToggle = 'flex-none absolute right-3 text-4xl text-slate-300 hover:text-slate-900 transition'
const folderIconState = 'flex-none absolute left-4 text-xl text-slate-300 hover:text-slate-900'
const isNested = '!pl-11 pr-5'
const isOpen = 'transform rotate-90'
</script>

<template>
  <details :open="open" @click.prevent="open = !open">
    <summary :class="[folder, nested ? isNested : null]">
      <icon v-if="locked" :class="[folderIconState]" name="prime:unlock" />
      <span class="truncate">{{ title }}</span>
      <span v-if="showProgress" class="ml-auto mr-9">(0/8)</span>
      <icon :class="[folderIconToggle, open ? isOpen : null]" name="prime:angle-right" />
    </summary>
    <div @click.stop>
      <slot />
    </div>
  </details>
</template>