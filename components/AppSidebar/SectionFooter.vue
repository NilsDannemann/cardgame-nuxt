<script lang="ts" setup>
// styles
const sidebarFooter = 'my-3'
const sidebarFooterItem = 'pl-11 py-3 pr-15 flex items-center relative hover:bg-slate-100 cursor-pointer'
const sidebarFooterItemIcon = 'flex-none absolute left-4 text-xl text-slate-300 hover:text-slate-900'
</script>

<template>
  <div :class="sidebarFooter">
    <div :class="sidebarFooterItem">
      <icon :class="sidebarFooterItemIcon" name="prime:question-circle" />
      <span class="truncate">Hilfe & Support</span>
    </div>
  </div>
</template>