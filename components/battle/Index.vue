<template>
  <main class="main">
    <PlayerCards type="A" />
    <div class="main__stage">
     <Field />
    </div>
    <PlayerCards type="B" />
  </main>
</template>
<script setup>
import PlayerCards from "./PlayerCards.vue"
import Field from "./Field/Index.vue"

</script>
