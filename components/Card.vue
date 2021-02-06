<template>
  <div class="card">
      <h5 class="cardtext">The tangy flavor of pineapple compliments the  salty cheese texture.</h5>
  </div>
</template>

<style>
.card {
  animation: .1s appear;
  margin: auto;
  background-color: rgb(230, 230, 230);
  height: 15rem;
  width: 10rem;
  border-radius: .7rem;
  margin: 1rem;
}

.card:hover {
  animation: .3s appear;
  background-color: rgb(210, 210, 210);
}

@keyframes appear {
  0% {
    opacity: 0;
  }
}

.cardtext {
  font-size: 100%;
  box-sizing: border-box;
  padding: 2rem;
  text-align: left;
}

</style>
