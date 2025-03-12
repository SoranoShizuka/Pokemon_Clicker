<template>
  <div class="inventory_container">
    <p class="inventory_text">Inventory</p>
  </div>
</template>
<script></script>
<style scoped>
.inventory_container {
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 16px 0px #3a3a3a1a;
  border-radius: 16px;
  width: 25%;
}
.inventory_text {
  font-family: "Inter", sans-serif;
  margin: 40px 16px;
  font-size: 24px;
  font-weight: 700;
  line-height: 29px;
  color: #ffcc01;
  text-shadow:
    2px 2px 0 #365fac,
    -2px 2px 0 #365fac,
    2px -2px 0 #365fac,
    -2px -2px 0 #365fac,
    2px 0px 0 #365fac,
    -2px 0px 0 #365fac,
    0px 2px 0 #365fac,
    0px -2px 0 #365fac;
}
</style>
