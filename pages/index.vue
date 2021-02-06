<template>
  <div class="container">
    <h1 class="title">
        pineapple belongs on pizza
    </h1>
    <Logo class="player avi"/>
    <Logo class="opponent avi"/>
    <Logo class="judge avi"/>
    <div class="scorecard">
        <h3>lums</h3>
        <h3>opponent</h3>
        <h4>score</h4>
        <h4>score</h4>
    </div>
    <div class="table">
      <Argument/>
    </div>
    <Hand />
    
    <footer>
      <NuxtLink class="linky" to="/about">about</NuxtLink>
    </footer>
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
  padding-top: 1rem;
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

.avi {
  width: 7rem;
  height: 7rem;
  position: absolute;
}
.player {
  
  bottom: 3rem;
  left: 5rem;
}

.opponent {
  top: 3rem;
  right: 5rem;
}

.judge {
  top: 17em;
  left: 4em;
}

.scorecard {
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr;
  min-width: 14rem;
  font-size: 1rem;
  padding: 0%;
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

.links {
  padding-top: 15px;
}

.linky {
  font-size: 110%;
  text-decoration: none;
  color: #526488;
  background-color: rgb(179, 179, 179);
  padding:1rem;
  border-radius: .6rem;
}

.linky:hover {
  color: black;
  background-color: whitesmoke;
}

</style>
