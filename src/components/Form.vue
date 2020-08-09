<template>
  <div class="form">
    <input :value="address" readonly @click="showModal()" type="text">
    <button @click.prevent="showModal()">Добавить адрес</button>
  </div>
</template>

<script>
export default {
  name: 'Form',
  computed: {
    address() {
      return this.$store.getters.ADDRESS;
    }
  },
  methods: {
    showModal() {
      this.$store.dispatch('SWITCH_ACTIVE_MODAL', 1);
    }
  }
}
</script>
<style scoped>
  input[type="text"] {
    background: #091322;
    border: 1px solid #ffffff;
    border-radius: 5px;
    font-size: 15px;
    padding: 10px;
    box-shadow: 0px 0px 5px 0px #ffffff;
    margin-right: 10px;
    color: #ffffff;
    cursor: pointer;
  }
  button {
    background: #ffffff36;
    border: 1px solid #ffffff;
    border-radius: 5px;
    font-size: 15px;
    padding: 10px;
    box-shadow: 0px 0px 5px 0px #ffffff;
    margin-right: 10px;
    color: #7ebb07;
    cursor: pointer;
  }
</style>
