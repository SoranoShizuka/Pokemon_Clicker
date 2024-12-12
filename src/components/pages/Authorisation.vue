<template>
  <div class="container">
    <div class="authorisation">
    <div class="authorisation-enter">
      <Tabs/>
    </div>
  </div>
    <SignIn/>
  </div>
</template>
<script setup>
import Tabs from "../shared/Tabs.vue";
import SignIn from "../pages/SignIn.vue"
</script>
<style scoped>
.container {
  width: 440px;
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  gap: 10px;
  padding: 24px;
  margin: 20px 0;
  box-shadow: 0 0 16px 0 rgba(58, 58, 58, 0.1);
  background: #FFFFFF;

}
.authorisation {
  display: flex;
  border-bottom: 1px solid #EFEFEF;
}
.authorisation-enter {
  display: flex;
  gap: 32px;
  margin: 0 155px;
  text-align: center;
}
</style>