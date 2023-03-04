<script lang="ts" setup>
import { useMouse } from '@vueuse/core'

// styles
const sidebarContainer = 'w-70 left-0 bg-white transition-all shadow-lg'
const sidebarContainerCollapsed = 'fixed -left-56 hover:left-0 z-15 shadow-2xl'
const sidebarContainerRevealed = '!left-0'

// sidebar toggle
const sidebarToggle = useState('sidebar.toggle')

// sidebar reveal on screen edge
const mouse = ref(useMouse())
</script>

<template>
  <aside :class="[sidebarContainer, sidebarToggle ? sidebarContainerCollapsed : '', !mouse.x ? sidebarContainerRevealed : '']">
    <AppSidebarSectionHeader />
    <AppSidebarSectionMain :scrollable="true" />
    <AppSidebarSectionMain :scrollable="false" />
    <AppSidebarSectionFooter />
  </aside>
</template>