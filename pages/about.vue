<template>
  <div class="container">
    <h1 class="title">
        about
    </h1>
    <p>add a description here. maybe later, when there is more to talk about.</p>
    <NuxtLink class="linky" to="/">go back</NuxtLink>
  </div>
</template>

<script>
export default {}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-top: 2rem;
  align-items: center;
  text-align: center;
}

.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 50px;
  color: #35495e;
  letter-spacing: 1px;
  top: 0%;
}

.scorecard {
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr;
  padding: 1rem;
}


.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.table {
  background-color: antiquewhite;
  width: 60%;
  height: 20rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 4rem;
}

p {
  font-size: 2rem;
}

.links {
  padding-top: 15px;
}

</style>
