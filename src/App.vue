<script setup>
import { ref } from "vue";
const newPhone = ref("");
//массив с данными, обычный массив
const phones = ref([]);
function addPhone() {
  //видимость переменных получаем через this
  phones.value.push(newPhone.value); //нам не надо заботится о выводе новых данных
  //как только элемент будет добавлен в массив, он появится в списке
  newPhone.value = ""; // затираем переменную ввода
}
</script>

<template>
  <div>
    <!-- Описываем поле вводы и вешаем обработчик на нажатие клавиши Enter -->
    <input
      placeholder="Введите номер"
      v-model="newPhone"
      @keyup.enter="addPhone"
    />
    <ul>
      <!-- Уже знакомый вывод списком-->
      <li v-for="phone in phones" :key="phone">{{ phone }}</li>
    </ul>
  </div>
</template>
