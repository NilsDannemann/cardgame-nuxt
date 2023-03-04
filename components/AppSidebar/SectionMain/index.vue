<script lang="ts" setup>
const props = defineProps({
  scrollable: {
    type: Boolean,
    default: true,
  },
})
// styles
const sidebarMain = 'scrollbar-custom py-3 border-b border-slate-900/10 overflow-y-scroll'
</script>

<template>
  <nav :class="[sidebarMain, scrollable ? 'max-h-100' : null]">
    <AppSidebarSectionMainFolder title="FOLDER" :open="true">

      <AppSidebarSectionMainFolder title="Folder" :showProgress="true" :open="false" :locked="false" :nested="true">
        <AppSidebarSectionMainItem title="Sub-Item" :completed="true" />
        <AppSidebarSectionMainItem title="Sub-Item" :completed="true" />
        <AppSidebarSectionMainItem title="Sub-Item" :completed="true" />
      </AppSidebarSectionMainFolder>

      <AppSidebarSectionMainFolder title="Folder" :showProgress="true" :open="true" :locked="true" nested="true">
        <AppSidebarSectionMainItem title="Sub-Item" :completed="true" />
        <AppSidebarSectionMainItem title="Sub-Item" :completed="true" />
        <AppSidebarSectionMainItem title="Sub-Item" :completed="true" />
      </AppSidebarSectionMainFolder>

      <AppSidebarSectionMainFolder  title="Folder" :showProgress="true" :open="true" :locked="true" nested="true">
        <AppSidebarSectionMainItem title="Sub-Item" :completed="true" />
        <AppSidebarSectionMainItem title="Sub-Item" :completed="true" />
        <AppSidebarSectionMainItem title="Sub-Item" :completed="true" />
      </AppSidebarSectionMainFolder>

    </AppSidebarSectionMainFolder>
  </nav>
</template>