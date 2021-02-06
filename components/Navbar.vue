<template>
    <div class="navbar">
        <NuxtLink class="linky" to="/decks">decks</NuxtLink>
        <NuxtLink class="linky" to="/about">about</NuxtLink>
    </div>
</template>

<style>
    .hand {
        display: flex;
        flex-direction: row;
    }

.navbar {
  position: fixed;
  display: flex;
  justify-content: space-evenly;
  left: 0;
  bottom: 0;
  width: 100%;
  padding-top: .5rem;
  padding-bottom: .5rem;
  background-color: rgba(200, 200, 200, 1);
  color: black;
  text-align: center;
}

</style>