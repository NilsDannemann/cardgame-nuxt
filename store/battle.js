import { defineStore } from 'pinia'

export const useBattleStore = defineStore('battle', {
  state: () => ({
    currentPlayer: null,
    turnTimerDuration: 30000,
    fieldGrid: {
      size: '4x3',
      columns: 12
    }, // It can be in future '2x2', '3x2', '4x2', '3x3', '4x3', '4x4' (cols x rows)
    slots: [],
    battleCounter: 0,
    counter: 0,
    cardPoolSize : 3,
    playerCards: {
      'A' : [],
      'B' : []
    },
    timer: null,
    cloneCard : null,
    showPreview : false
  }),
  actions: {
    updateShowPreview(value){
      this.showPreview = value
      if(!value){
        const previewElement = document.querySelector('.preview');
        if(previewElement){
          const newDiv = document.createElement('div');
          previewElement.parentNode.replaceChild(newDiv, previewElement);
        }
      }else{
        const uid = this.cloneCard.uid
        let test = document.getElementById(`${uid}`);
        test.style.display = 'none'
      }
    },
    removePreview(){
      const elementsToDelete = document.querySelectorAll(`.preview`);
      elementsToDelete.forEach((element) => {
        const parentElement = element.parentNode;
        parentElement.removeChild(element);
      });
      const elementsToDeletenew = document.querySelectorAll(`#uid`);
      elementsToDeletenew.forEach((element) => {
        const parentElement = element.parentNode;
        parentElement.removeChild(element);
      });
    },
    getNeighbouringIndexes(index){
      //Applicable for 4x3 
      const nIndexes = {
        0: {
          "top" : null,
          "right" : 1,
          "bottom" : 4,
          "left" : null
        },
        1: {
          "top" : null,
          "right" : 2 ,
          "bottom" : 5,
          "left" : 0
        },
        2: {
          "top" : null,
          "right" : 3,
          "bottom" : 6 ,
          "left" : 1
        },
        3: {
          "top" : null,
          "right" : null,
          "bottom" : 7,
          "left" : 2
        },
        4: {
          "top" : 0,
          "right" : 5,
          "bottom" : 8,
          "left" : null
        },
        5: {
          "top" : 1,
          "right" : 6,
          "bottom" : 9,
          "left" : 4
        },
        6: {
          "top" : 2,
          "right" : 7,
          "bottom" : 10,
          "left" : 5
        },
        7: {
          "top" : 3,
          "right" : null,
          "bottom" : 11,
          "left" : 6
        },
        8: {
          "top" : 4,
          "right" : 9,
          "bottom" : null,
          "left" : null
        },
        9: {
          "top" : 5,
          "right" : 10,
          "bottom" : null,
          "left" : 8
        },
        10: {
          "top" : 6,
          "right" : 11,
          "bottom" : null,
          "left" : 9
        },
        11: {
          "top" : 7,
          "right" : null,
          "bottom" : null,
          "left" : 10
        }  
      } 
      return nIndexes[index]
    },
    async updateSlotOnDragEnd() {
      const elementsToDelete = document.getElementsByClassName(`preview`);
      const parentElement = elementsToDelete[0].parentNode;
      const parentIndex = parentElement.getAttribute('index');
    
      const temp = JSON.parse(JSON.stringify(this.cloneCard))
      for(let slot = 0; slot < this.playerCards['A'].length; slot++){
        if(this.playerCards['A'][slot].uid === temp.uid){
          const index = this.playerCards['A'].indexOf(this.playerCards['A'][slot])
          this.playerCards['A'].splice(index, 1);
        }
      }
      for(let slot = 0; slot < this.playerCards['B'].length; slot++){
        if(this.playerCards['B'][slot].uid === temp.uid){
          const index = this.playerCards['B'].indexOf(this.playerCards['B'][slot])
          this.playerCards['B'].splice(index, 1);
        }
      }
   this.playerCards[this.currentPlayer] = this.playerCards[this.currentPlayer].filter(value => value.uid !== this.cloneCard.uid)
      this.slots[parentIndex] = this.cloneCard
      for(let slot = 0; slot <  this.slots.length; slot++){
        if(this.slots[slot].classes){
          delete this.slots[slot].classes
          this.slots[slot].key++
        }
      }
      this.battleCounter++
      this.slots[parentIndex].classes = 'card--dropped'
      const type = this.cloneCard.type
      const nIndexes = await this.getNeighbouringIndexes(parentIndex)
      const updateColor = type === 'A' ? 'red' : 'blue'
      if(nIndexes.top !== null){
        if(this.slots[nIndexes.top].type !== type && this.slots[nIndexes.top].type){
          if(this.slots[parentIndex].points[0] >= this.slots[nIndexes.top].points[2]){
            this.slots[nIndexes.top].type = type
            this.slots[nIndexes.top].color = updateColor
            // add flip animation 
            this.slots[nIndexes.top].classes = "card--flipped"
            this.slots[nIndexes.top].key = this.slots[nIndexes.top].key + 1
          }
        }
      }
      if(nIndexes.right !== null){
        if(this.slots[nIndexes.right].type !== type && this.slots[nIndexes.right].type){
          if(this.slots[parentIndex].points[1] >= this.slots[nIndexes.right].points[3]){
            this.slots[nIndexes.right].type = type
            this.slots[nIndexes.right].color = updateColor
            // add flip animation 
            this.slots[nIndexes.right].classes = "card--flipped"
            this.slots[nIndexes.right].key = this.slots[nIndexes.right].key + 1
          }
        }
      }
      if(nIndexes.bottom !== null){
        if(this.slots[nIndexes.bottom].type !== type && this.slots[nIndexes.bottom].type){
          if(this.slots[parentIndex].points[2] >= this.slots[nIndexes.bottom].points[0]){
            this.slots[nIndexes.bottom].type = type
            this.slots[nIndexes.bottom].color = updateColor
            // add flip animation 
            this.slots[nIndexes.bottom].classes = "card--flipped"
            this.slots[nIndexes.bottom].key = this.slots[nIndexes.bottom].key + 1
          }
        }
      }
      if(nIndexes.left !== null){
        if(this.slots[nIndexes.left].type !== type && this.slots[nIndexes.left].type){
          if(this.slots[parentIndex].points[3] >= this.slots[nIndexes.left].points[1]){
            this.slots[nIndexes.left].type = type
            this.slots[nIndexes.left].color = updateColor
            // add flip animation 
            this.slots[nIndexes.left].classes = "card--flipped"
            this.slots[nIndexes.left].key = this.slots[nIndexes.left].key + 1
          }
        }
      }
      const occupiedSlots = this.slots.filter( (value, index) => value.type );
      this.showPreview = false
      if(occupiedSlots.length === 12){
        await this.endGame();
        const a = this.slots.filter(value=> value.type === 'A').length
        const b = this.slots.filter(value=> value.type === 'B').length
        alert(`Player A: ${a}`);
        alert(`Player B: ${b}`);
        if(a===b){
          alert('Draw!');
        }
        else{
          const winner =  a > b ? 'A':'B'
          alert(`Player ${winner} Wins`);
        }
      }else{
        this.changePlayer()
      }
    },
    async endGame(){
      this.currentPlayer = null
      this.counter++
      clearInterval(this.timer);
      this.turnTimerDuration = 0
      return true
    },

    removeClonedDiv() {
      const elementsToDelete = document.querySelectorAll(`.cloned`);
      elementsToDelete.forEach((element) => {
        const parentElement = element.parentNode;
        parentElement.removeChild(element);
      });
    },
    async updatePlayerCards(playerA = false, playerB = false) {
      if (playerA) {
        this.playerCards.A = playerA
      }
      if (playerB) {
        this.playerCards.B = playerB
      }
    },
    startTimer() {
      this.counter++
      const vm = this
      this.timer = setInterval(function () {
        vm.counter++
        vm.updateCurrentPlayer()
      }, vm.turnTimerDuration);
    },
    updateCloneCard(id) {
      if (!id) {
        this.cloneCard = null;
        return
      }
      const filtered = this.playerCards[this.currentPlayer].filter(value => value.uid == id)
      this.cloneCard = filtered[0]
    },
    changePlayer() {
      this.updateCurrentPlayer();
      clearInterval(this.timer);
      this.startTimer();
    },
    updateSlots() {
      let tempSlots = []
      for (let step = 0; step < this.fieldGrid.columns; step++) {
        tempSlots.push({
          type: null,
          cardElement: step + 1
        })
      }
      this.slots = tempSlots
    },
    async cardPoints(){
      var total = 20;
      var parts = 4;
      var max = 9;
      var arr = new Array(parts);
      var sum = 0;
      do {
        for (var i = 0; i < parts; i++) {
            arr[i] = Math.random();
        }
        sum = arr.reduce((acc, val) => acc + val, 0);
        var scale = (total - parts) / sum;
        arr = arr.map(val => Math.min(max, Math.round(val * scale) + 1));
        sum = arr.reduce((acc, val) => acc + val, 0);
      } while (sum - total);
      return arr;
    },
    async checkPlayerCards(){
      const cardElements = ['fire','water','earth']
      for(let key in this.playerCards){
        if(this.playerCards[key].length < this.cardPoolSize){
          this.playerCards[key].push({
            cardElement: cardElements[Math.floor(Math.random()*cardElements.length)],
            points: await this.cardPoints(),
            type: key,
            color: key === 'A' ? 'red' : 'blue',
            uid: (Math.random().toString(36)+Math.random().toString(36)).replace(/\./g, "")
          })
        }
      }
    },
    async updateCurrentPlayer(player = false) {
      if (player) {
        this.currentPlayer = player
      } else {
        this.currentPlayer = this.currentPlayer === 'A' ? 'B' : 'A'
      }
      const cardElements = ['fire','water','earth']
      if(this.playerCards[this.currentPlayer].length < this.cardPoolSize){
        this.playerCards[this.currentPlayer].push({
          cardElement: cardElements[Math.floor(Math.random()*cardElements.length)],
          points: await this.cardPoints(),
          type: this.currentPlayer,
          color: this.currentPlayer === 'A' ? 'red' : 'blue',
          uid: (Math.random().toString(36)+Math.random().toString(36)).replace(/\./g, "")
        })
      }
    },
  }
})