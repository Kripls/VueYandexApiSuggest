<template>
    <transition name="fade">
        <div v-show="is_show" class="modal" :style="{maxWidth: max_width}">
            <div class="input-block" v-click-outside="clearHints">
                <label>
                    <input type="text" v-model="temporary_address.value" @keydown="get_hint($event)" @focusin="active_hints = 1" placeholder="Начните вводить...">
                </label>
                <div v-if="error.length > 0" class="error">
                    {{error}}
                </div>
                <ul class="list-hints" v-show="hints.length > 0 && active_hints">
                    <li class="list-hints__address" @mouseover="active_address = key" @mouseleave="active_address = null" :class="{active: active_address === key}" v-for="(obj, key) in hints" :key="key">
                        <label>
                            {{obj.value}}
                            <input type="text" :value="obj.value" @click="() => {saveTemporaryAddress(obj);clearHints;}" hidden>
                        </label>
                    </li>
                </ul>
            </div>
            <button @click.prevent="saveAddress">
                Сохранить
            </button>
            <i class="modal__close" @click="hideModal"></i>
        </div>
    </transition>
</template>

<script>
    export default {
        name: "Modal",
        props: {
            max_width: {
                type: String,
                default: () => {
                    return '460px';
                }
            }
        },
        data() {
          return {
              temporary_address: {
                  displayName: '',
                  hl: [],
                  type: '',
                  value: ''
              },
              active_address: null,
              active_hints: 0,
              error: ''
          }
        },
        methods: {
            saveTemporaryAddress(obj) {
              this.temporary_address = obj;
            },
            clearHints() {
                this.$store.dispatch('CLEAR_HINTS');
                this.active_hints = 0;
            },
            hideModal() {
                this.$store.dispatch('SWITCH_ACTIVE_MODAL', 0);
                this.clearHints();
                this.saveTemporaryAddress({
                    displayName: '',
                    hl: [],
                    type: '',
                    value: ''
                });
                this.error = '';
            },
            get_hint(e) {
                this.$store.dispatch('GET_HINTS', e.target.value);
            },
            saveAddress() {
                if(this.temporary_address.value.length > 0) {
                    if(this.address !== this.temporary_address.value) {
                        this.$store.dispatch('SAVE_ADDRESS', this.temporary_address);
                        this.hideModal();
                    } else {
                        this.error = 'Данный адрес уже введен!';
                    }
                } else {
                    this.error = 'Введите корректный адрес!';
                }

            }
        },
        computed: {
            is_show() {
                return this.$store.getters.IS_MODAL;
            },
            hints() {
                if(this.$store.getters.HINTS.length > 0) return this.$store.getters.HINTS;
                return this.$store.getters.OLD_HINTS;
            },
            address() {
                return this.$store.getters.ADDRESS;
            }
        }
    }
</script>

<style scoped>
.list-hints__address label {
    display: block;
    position: relative;
    cursor: pointer;
    padding: 10px;
}
.modal {
    padding: 40px;
    box-shadow: 0px 0px 10px -2px #ffffff;
    border-radius: 5px;
    background: #091322;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-wrap: wrap;
}
.modal__close {
    position: absolute;
    right: 5px;
    top: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    cursor: pointer;
}
.modal__close:before, .modal__close:after {
    content: '';
    display: block;
    width: 3px;
    background: #ffffffad;
    height: 20px;
    border-radius: 100%;
    transform: rotate(45deg);
    position: absolute;
    transition: all .3s;
}
.modal__close:after {
    transform: rotate(-45deg);
}
.modal__close:hover:before,
.modal__close:hover:after {
    background: #ffffff;
}
.fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
    opacity: 0;
}
input[type="text"] {
    background: #091322;
    border: 1px solid #ffffff;
    border-radius: 5px;
    font-size: 15px;
    padding: 10px;
    box-shadow: 0px 0px 5px 0px #ffffff;
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
.list-hints {
    padding: 0;
    margin: 0;
    position: absolute;
    top: 100%;
    left: 0;
    background: #ffffff;
}
.list-hints__address {
    color: #091322;
    list-style-type: none;
    font-family: sans-serif;
    font-weight: bold;
}
.list-hints__address.active {
    color: #7ebb07;
}
.input-block {
    position: relative;
    margin-right: 10px;
}
.error {
    padding: 10px 0;
    color: #d80000;
    font-family: sans-serif;
    font-weight: bold;
}
</style>