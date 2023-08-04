<template>
  <aside class="main__aside" :class="`main__aside--${currentSide} ${getMainClasses}`">
    <div class="card-pool player-card">
      <div v-for="(element, index) in battleStore.playerCards[props.type]" :key="element.uid" draggable="true" class="card" @dragstart="handleDragStart" @dragend="handleDragEnd" :id="element.uid">
        <div :style="[index !== (battleStore.cardPoolSize -1) ? 'margin-bottom: 1.4285714286rem;' : '']"
        :class="`card card--${currentColor} card--${element.cardElement}`" >
          <div class="card__inner">
            <div class="card__front">
              <div class="card__dmg">
                <div :class="{
                  'card__dmg-top': index === 0,
                  'card__dmg-right': index === 1,
                  'card__dmg-bottom': index === 2,
                  'card__dmg-left': index === 3
                }" v-for="(point, index) in element.points" :key="`${point}-${Math.random()}`">
                  {{ point }}
                  <div class="card__dmg-element"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="deck" :class="type === 'A' ? 'deck--red' : 'deck--blue'">Deck</div>
  </aside>
</template>
<script setup>
import { useBattleStore } from '@/store/battle'
import draggable from 'vuedraggable'
import { onMounted } from "vue";

const props = defineProps({
  type: String
})

const battleStore = useBattleStore();

onMounted(() => {
  updateCards()
})

async function handleDragEnd(event) {
  const x = event.clientX || event.changedTouches[0].clientX;
  const y = event.clientY || event.changedTouches[0].clientY;

  const uid = event.target.id;
  if(battleStore.showPreview){
    await battleStore.updateSlotOnDragEnd()
  }
  //removing cloned card from vuex
  battleStore.updateCloneCard()
  // removing html of cloned card
  battleStore.removeClonedDiv()
}

function handleDragStart(e) {
  battleStore.updateCloneCard(e.target.id)
  // hide image of dragged div/grabbed 
  const draggedDiv = e.target;
  const dragImage = new Image();
  dragImage.src = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';
  e.dataTransfer.setDragImage(dragImage, 0, 0);
}

let updateCards = async () => {
  let tempCards = []
  for (let step = 0; step < battleStore.cardPoolSize; step++) {
    tempCards.push({
      cardElement: cardElements[Math.floor(Math.random() * cardElements.length)],
      points: await battleStore.cardPoints(),
      type: props.type,
      color: props.type === 'A' ? 'red' : 'blue',
      key: 0,
      uid: ('u' + Math.random().toString(36) + Math.random().toString(36)).replace(/\./g, "")
    })
  }
  let playerA = false
  let playerB = false
  if (props.type === 'A') {
    playerA = tempCards
  }
  if (props.type === 'B') {
    playerB = tempCards
  }
  battleStore.updatePlayerCards(playerA, playerB);
}

const currentSide = props.type === 'A' ? 'left' : 'right'
const currentColor = props.type === 'A' ? 'red' : 'blue'

const cardElements = ['fire', 'water', 'earth']

const getMainClasses = computed(() => {
  const type = props.type
  if ((type === 'A' && battleStore.currentPlayer === 'A') || (type === 'B' && battleStore.currentPlayer === 'B')) {
    return ' main__aside--active'
  }
  return ''
})

</script>

<style scoped>
.card__inner {
  background-image: url("@/assets/img/cards/card-bg.jpg");
}

.card__front {
  background-image: url("@/assets/img/cards/creatures/warrior-long-range-1-2.png");
}

.card__back {
  background-image: url("@/assets/img/cards/creatures/warrior-long-range-1-2.png");
}
</style>