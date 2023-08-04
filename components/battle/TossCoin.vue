<template>
  <div class="overlay" :class="{'overlay--hidden' : overlayHidden}" v-if="showOverlay">
    <div class="overlay__left">
      <div class="overlay__coinslot"></div>
    </div>
    <div class="overlay__right">
      <div class="overlay__coinslot"></div>
    </div>
    <div :class="{'coin': true, 'hidden' : coinHidden, 'heads': isHeads, 'tails': isTails }">
      <div class="coin__side-a"></div>
      <div class="coin__side-b"></div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useBattleStore } from '@/store/battle'

let isHeads = ref(false)
let isTails = ref(false)
let showOverlay = ref(true)
let overlayHidden = ref('')
let coinHidden = ref(false)

const battleStore = useBattleStore();
const emit = defineEmits(['start-timer'])

onMounted(() => {
  var cointossResult = Math.random();
  // Execute toin coss
  setTimeout(function(){
    if(cointossResult <= 0.5) {
      isHeads.value = true
      battleStore.updateCurrentPlayer('A')
    } else {
      isTails.value = true
      battleStore.updateCurrentPlayer('B')
    }
  }, 100);
  // Remove coin
  setTimeout(function(){
    coinHidden.value = true
  }, 3000);

  // Fade-out overlay
  setTimeout(function(){
    overlayHidden.value = true
  }, 3500);
  
  // Remove overlay & Start first countdown
  setTimeout(function(){
    showOverlay.value = false
    emit('start-timer')
  }, 3650);
  
})
</script>