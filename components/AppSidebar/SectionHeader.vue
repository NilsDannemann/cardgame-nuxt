<script lang="ts" setup>
// styles
const header = ''
const headerIconToggle = 'absolute transition transform'
const headerItem = 'pl-11 py-3 pr-15 flex items-center relative hover:bg-slate-100 cursor-pointer'
const headerItemIcon = 'flex-none absolute left-4 text-xl text-slate-300 hover:text-slate-900'

// toggle sidebar
const sidebarToggle = useState('sidebar.toggle', () => false)
</script>

<template>
  <div :class="header">
    <div class="p-4 flex items-center justify-between">
      <div class="w-full flex items-center overflow-hidden">
        <span class="w-7 h-7 mr-2 flex flex-none items-center justify-center rounded-full bg-slate-600 text-sm text-white uppercase">
          u
        </span>
        <span class="pr-2 font-semibold text-slate-900 truncate">
          username
        </span>
      </div>
      <button 
        class="w-7 h-7 ml-auto flex flex-none items-center justify-center text-4xl text-slate-300 hover:text-slate-900"
        @click="sidebarToggle = !sidebarToggle"
      >
        <icon :class="[headerIconToggle, sidebarToggle ? 'rotate-180' : null]" name="prime:angle-double-left" />
      
      </button>
    </div>
    <div :class="headerItem">
      <icon :class="headerItemIcon" name="prime:chevron-right" />
      <span class="truncate">Search</span>
    </div>
  </div>
</template>