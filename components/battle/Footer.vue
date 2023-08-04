<template>
  <div class="footer">
    <div class="footer__aside footer__aside--left">
      <div class="phase phase--1 phase--red phase--active">
        <div class="phase__step"></div>
        <div class="phase__step"></div>
        <div class="phase__step"></div>
        <div class="phase__step"></div>
      </div>
    </div>
    <div class="footer__stage">
      <button v-if="battleStore.turnTimerDuration" class="button button--end-turn" @click="emit('change-player')">
        <div class="button__countdown-label">End Turn</div>
        <div :style="`animation-duration:${battleStore.turnTimerDuration}ms`" :class="getCountDownProgressColor()" class="button__countdown-progress button__countdown-progress--animating"></div>
      </button>
    </div>
    <div class="footer__aside footer__aside--right">
      <div class="phase phase--blue">
        <div class="phase__step"></div>
        <div class="phase__step"></div>
        <div class="phase__step"></div>
        <div class="phase__step"></div>
      </div>
    </div>
</div>
</template>
<script setup>
import { useBattleStore } from '@/store/battle'

const battleStore = useBattleStore();
const emit = defineEmits(['change-player'])

function getCountDownProgressColor(){
  if(battleStore.currentPlayer == 'A')
  return 'button__countdown-progress--red'
  return 'button__countdown-progress--blue'
}

</script>
