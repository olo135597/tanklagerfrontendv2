<script setup>
import { defineProps, defineEmits, ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import apiService from "../apiService";  // Corrected import

const props = defineProps({
  isOpen: Boolean,
});

const emit = defineEmits(["modal-close", "tank-created"]);
const target = ref(null);
onClickOutside(target, () => emit("modal-close"));

const tankName = ref("");
const tankCapacity = ref("");

const submitHandler = async (event) => {
  event.preventDefault();
  try {
    await apiService.createOilTank({  // Corrected method call
      name: tankName.value,
      capacity: parseFloat(tankCapacity.value),
    });
    emit("modal-close");
    emit("tank-created");
  } catch (error) {
    console.error("Error creating tank:", error);
  }
};
</script>

<template>
  <div v-if="isOpen" class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container" ref="target">
        <div class="modal-header">
          <h1><p>Create Tank</p></h1>
        </div>
        <form @submit="submitHandler">
          <div class="modal-body">
            <h2>
              <p class="modal-subtitle">Name</p>
            </h2>
            <input v-model="tankName" class="modal-input" required />
            <h2>
              <p class="modal-subtitle">Capacity</p>
            </h2>
            <input v-model="tankCapacity" class="modal-input" type="number" required />
            <div>
              <button type="submit" class="modal-submit">Submit</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);



}

.modal-header{
  display: flex;
  justify-content: center;
  background: var(--color-box-sec);
  border-radius: 20px;
}

.modal-header p {
  color: #1A1A1A;
}
.modal-wrapper {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
 
}
.modal-container {
  margin: 3rem;
  width: 60%;
  height: 80%;
  padding: 20px 30px;
  background-color: #efe8c1;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
}

.modal-body {
padding: 1rem;

  width: 100%;
  display: flex;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  gap: 1rem;
}

.modal-subtitle {
  color: var(--color-box);
  font-weight: 700;
}

.modal-input {
  padding: 0.5rem;
  border: 3px solid #ccc;
  -webkit-transition: 0.5s;
  transition: 0.5s;
  outline: none;
 margin-left: 2rem;
  margin-right: 2rem;

  border-radius: 5px;
}

.modal-input:focus {
 border: solid;
  border-color: var(--color-box);
}

.modal-submit {
  appearance: none;
  background-color: var(--color-box);
  border: 2px solid #1A1A1A;
  border-radius: 15px;
  box-sizing: border-box;
  color: #C7D3DD;
  cursor: pointer;
  display: inline-block;
  font-family: Roobert,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
  font-size: 16px;
  font-weight: 600;
  line-height: normal;
  margin-top: 2rem;
  min-height: 60px;
  min-width: 0;
  outline: none;
  padding: 0.7rem 3rem;
  text-align: center;
  text-decoration: none;
  transition: all 300ms cubic-bezier(.23, 1, 0.32, 1);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  width: 50%;
  will-change: transform;
}

.modal-submit:disabled {
  pointer-events: none;
}

.modal-submit:hover {
  box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
  transform: translateY(-2px);
}

.modal-submit:active {
  box-shadow: none;
  transform: translateY(0);
}
</style>