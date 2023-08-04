<template>
  <div class="container">
    <!-- Toss coin & decide starting player  -->
    <TossCoin @start-timer="battleStore.startTimer(); showBattle=true" />
    <div v-if="showBattle">
      <BattleHeader />
      <BattleMain />
      <BattleFooter :key="battleStore.counter" @change-player="battleStore.changePlayer()" />
    </div>
  </div>
</template>
<script setup>
import { onMounted } from 'vue'
import TossCoin from '@/components/battle/TossCoin.vue'
import BattleHeader from '@/components/battle/Header.vue'
import BattleMain from "@/components/battle/Index.vue"
import BattleFooter from "@/components/battle/Footer.vue"
import { useBattleStore } from '@/store/battle'

const battleStore = useBattleStore();
let showBattle = ref(false)


</script>