<script setup>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
import TankList from './components/TankList.vue'
</script>

<template>
  <header>
    <div class="text-header">
      <h1>Tanklager Organisator</h1>
    </div>

  </header>
  <main>
    <TankList />
  </main>
</template>

<style scoped>
.text-header {
  margin: 1rem;
  background: var(--color-spec);
  padding: 1rem;
  border-radius: 15px;

}
.text-header h1 {
  font-weight: 700;
  font-family: Arial;
  color: #1A1A1A;
}
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {

    place-items: center;

  }

  .logo {
    margin: 0 2rem 0 0;
  }

}
</style>
