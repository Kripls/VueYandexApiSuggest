<template>
  <div id="app">
    <Form />
    <Modal max_width="450px"/>
  </div>
</template>

<script>
import Form from "@/components/Form";
import Modal from "@/components/Modal";
export default {
  name: 'App',
  components: {
    Form, Modal
  }
}
</script>

<style>
#app {
  background: #091322;
  height: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
  body {
    margin: 0;
  }
  * {
    outline: none;
    box-sizing: border-box;
  }
</style>
