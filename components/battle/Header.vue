<template>
  <div class="header">
      <div class="header__aside header__aside--left">
          <img class="avatar avatar--red" src="@/assets/img/ui/player-avatar.svg" alt="Player-Avatar">
          <span>Player A</span>
      </div>
      <div class="header__stage">
          <div class="score score--red">
              <div class="score__dot score__dot--filled"></div>
              <div class="score__dot"></div>
              <div class="score__dot"></div>
          </div>
          <div>VS</div>
          <div class="score score--blue">
              <div class="score__dot score__dot--filled"></div>
              <div class="score__dot score__dot--filled"></div>
              <div class="score__dot"></div>
          </div>
      </div>
      <div class="header__aside header__aside--right">
          <img class="avatar avatar--blue" src="@/assets/img/ui/player-avatar.svg" alt="Player-Avatar">
          <span>Player B</span>
      </div>
    </div>
</template>