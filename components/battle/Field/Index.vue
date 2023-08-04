<template>
  <div :key="battleStore.battleCounter"> 
  <!-- // fieldGrid may be '2x2', '3x2', '4x2', '3x3', '4x3', '4x4' (cols x rows) -->
    <div class="battlefield battlefield--4x3">
      <div v-for="(slot, index) in battleStore.slots" :key="index" :class="`battlefield__slot battlefield__slot--filled battlefield__slot--${slot.color}`" :id="`field-box-${index}`" :index="index"  :uid="slot.uid">
      <div
       v-if="!slot.type">
      </div>
      <!-- :key => update flip card animation  -->
      <div v-else :key="`c-${slot.uid}-${slot.key}`" :class="`card card--${slot.cardElement} card--${slot.color} ${slot.classes}`">
        <div class="card__inner">
          <div class="card__front">
            <div class="card__dmg">
              <div v-for="(point, index) in slot.points" :key="`p-${index}-${point}`" :class="`card__dmg-${pointPositions[index]}`">
                {{point}}
                <div class="card__dmg-element"></div>
              </div>
            </div>
          </div>
          <div class="card__back">
            <div class="card__dmg">
              <div v-for="(point, index) in slot.points" :key="`p-${index}-${point}`" :class="`card__dmg-${pointPositions[index]}`">
                {{point}}
                <div class="card__dmg-element"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>
<script setup>
import { useBattleStore } from '@/store/battle'

const battleStore = useBattleStore();
const pointPositions = ['top', 'right', 'bottom', 'left']
onMounted(() => {
  battleStore.updateSlots();
})

onUpdated(() => {
  let item = document.querySelector('body');
  item.addEventListener('dragover', handleDragOverbody, false);
})

function handleDragOverbody(event) {
  if (!battleStore.cloneCard) {
    return
  }

  let clonedUID = document.getElementById(battleStore.cloneCard.uid);
  const target = clonedUID.cloneNode(true);
  target.className = "cloned clone-" + clonedUID
  target.id = "clone-" + clonedUID
  target.style.opacity = 1

  if (event.clientX) {
    target.distX = event.clientX;
    target.distY = event.clientY;
  } else {
    target.distX = event.touches[0].clientX;
    target.distY = event.touches[0].clientY;
  }

  target.style.position = 'absolute'
  target.style.display = 'block'
  target.style.left = target.distX - 80 + "px";
  target.style.top = target.distY - 80 + "px";

  battleStore.removeClonedDiv();

  target.className = "cloned clone-" + clonedUID
  document.body.appendChild(target);

  const otherDivs = document.querySelectorAll('.battlefield__slot');

  let mostCoveringDiv = null;
  let maxOverlapArea = 0;
  const movingDiv = document.querySelector('.cloned');

  for (const otherDiv of otherDivs) {
    const uid = otherDiv.getAttribute('uid');
    if (!uid) {
      const otherRect = otherDiv.getBoundingClientRect();
      const movingRect = movingDiv.getBoundingClientRect();
      // Check for overlapping in horizontal and vertical axes
      const horizontalOverlap = movingRect.right >= otherRect.left && movingRect.left <= otherRect.right;
      const verticalOverlap = movingRect.bottom >= otherRect.top && movingRect.top <= otherRect.bottom;
      // If both horizontal and vertical overlap are true, it means the divs are overlapping
      if (horizontalOverlap && verticalOverlap) {
        const overlapArea = calculateOverlapArea(movingRect, otherRect);
        // Update the most covering area and div if the current overlap area is greater
        if (overlapArea > maxOverlapArea) {
          maxOverlapArea = overlapArea;
          mostCoveringDiv = otherDiv;
        }
      }
    }
  }

  if (mostCoveringDiv) {
    battleStore.removePreview();
  
    const dataHtml = document.getElementById(battleStore.cloneCard.uid)
    const target = document.getElementById(mostCoveringDiv.id);

    target.innerHTML = dataHtml.innerHTML
    const childElements = target.children;

    for (const child of childElements) {
      child.classList.add('preview');
      child.style.opacity = .4
      battleStore.updateShowPreview(true)
    }
  }else{
    const otherDiv = document.querySelector('.main__aside--active');
    const otherRect = otherDiv.getBoundingClientRect();
      const movingRect = movingDiv.getBoundingClientRect();
      // Check for overlapping in horizontal and vertical axes
      const horizontalOverlap = movingRect.right >= otherRect.left && movingRect.left <= otherRect.right;
      const verticalOverlap = movingRect.bottom >= otherRect.top && movingRect.top <= otherRect.bottom;
      // If both horizontal and vertical overlap are true, it means the divs are overlapping
      if (horizontalOverlap && verticalOverlap) {
        const overlapArea = calculateOverlapAreaX(movingRect, otherRect, true);
        if (overlapArea) {
          mostCoveringDiv = true;
        }
      }
      if(mostCoveringDiv){
        battleStore.updateShowPreview(false)
         let test = document.getElementById(`${battleStore.cloneCard.uid}`);
        test.style.display = 'block'
      }
  }
}

function calculateOverlapAreaX(rect1, rect2) {
  const overlapX = Math.max(0, Math.min(rect1.right, rect2.right) - Math.max(rect1.left, rect2.left));
  if(overlapX > 120){
    return true
  }
  return 0
}

function calculateOverlapArea(rect1, rect2) {
  const overlapX = Math.max(0, Math.min(rect1.right, rect2.right) - Math.max(rect1.left, rect2.left));
  const overlapY = Math.max(0, Math.min(rect1.bottom, rect2.bottom) - Math.max(rect1.top, rect2.top));
  return overlapX * overlapY;
}

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