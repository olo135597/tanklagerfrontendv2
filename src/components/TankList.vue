<script setup>
import { ref, onMounted } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faOilCan, faSquarePlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import apiService from "../apiService";  // Corrected import
import ModalComponent from "../components/CreateModal.vue";

const isModalOpened = ref(false);
const tanks = ref([]);

const openModal = () => {
  isModalOpened.value = true;
};

const closeModal = () => {
  isModalOpened.value = false;
};

const loadTanks = async () => {
  try {
    const response = await apiService.getOilTanks();  // Corrected method call
    tanks.value = response.data;
  } catch (error) {
    console.error("Error fetching oil tanks:", error);
  }
};

const handleTankCreated = () => {
  loadTanks();
  closeModal();
};

onMounted(() => {
  loadTanks();
});


const deleteTank = async (id) => {
  try {
    await apiService.deleteOilTank(id);
    loadTanks();
  } catch (error) {
    console.error("Error deleting tank:", error);
  }
};
</script>

<template>
  <div>
    <div class="tank-list">
      <div class="tank-list-top">
        <font-awesome-icon :icon="faOilCan" :size="'3x'" />
        <h1 class="tank-list-title">Tankliste</h1>
        <button @click="openModal" class="modal-button">
          <font-awesome-icon class="plus-icon" :icon="faSquarePlus" :size="'3x'" />
        </button>
        <ModalComponent :isOpen="isModalOpened" @modal-close="closeModal" @tank-created="handleTankCreated" />
      </div>
      <div class="tank-list-main">
        <table class="tank-list-table">
          <thead>
          <tr>
            <th>Name</th>
            <th>Creation Date</th>
            <th>Capacity</th>
            <th>Oil Amount</th>
            <th>Maintenance</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="tank in tanks" :key="tank.id">
            <td>{{ tank.name }}</td>
            <td>{{ tank.creationDate }}</td>
            <td>{{ tank.capacity }}</td>
            <td>{{ tank.oilAmount }}</td>
            <td>{{ tank.maintenance }}</td>
            <td>
              <button @click="deleteTank(tank.id)" class="delete-button"> <font-awesome-icon class="trash-icon" :icon="faTrashCan" :size="'2x'" /> </button> 
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tank-list{
  display: flex;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  background: var(--color-box-sec);
  margin-top: 1rem;
  flex-direction: column;
  width: 80%;
  padding: 1rem;
  border-radius: 25px;
}
.tank-list-top{
  display: flex;
  justify-content: space-between;
  border-radius: 25px;
 
}
 .tank-list-top div{
   display: flex;
   flex-direction: row;
   justify-content: space-between;



 }
 .tank-list-table td {
   color: #C7D3DD;
 }
 .tank-list-title{
   display: flex;
   justify-content: center;
   color: #1A1A1A;
 }
 .tank-list-title h1{
   font-weight: 500;
 }

 .plus-icon{
   display: flex;
   align-items: flex-end;
   margin-right: 0;
   transition: 0.7s;
   margin: 0.5rem;
 }
.plus-icon:hover {
  transform: rotate(360deg) scale(1.3);

}
 .tank-list-main{
   display: flex;
   justify-content: center;
   margin-top: 1rem;
   background: var(--color-box);
   border-radius: 15px;
   padding: 1rem;
 }
 .tank-list-table{
   font-family: "Arial Black";
   border-collapse: collapse;
   width: 100%;
   color: var(--color-background);
 }


.tank-list-table tr:nth-child(even){background-color: #1c0e40;}

.tank-list-table th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: var(--color-spec);
  color: var(--color-box);
}

.tank-list-table tr:hover {
  background-color: rgba(130, 145, 180, 0.89);
  transition: 0.2s;
}

.modal-button {
  background-color: transparent;
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
  overflow: hidden;
  outline: none;
}

</style>