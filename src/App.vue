<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <h2 class="center">Notes</h2>
    </nav>

    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>


<style>
.center {
  margin: auto;
  text-align: center;
  color: #fff;
}
</style>

<script>
export default {
  name: "app"
};
</script>
