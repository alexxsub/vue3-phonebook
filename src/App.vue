<script setup>
import { ref } from "vue";
const inputnumber = ref(null);
const newPhone = ref({
  number: "",
  name: "",
});
//массив с данными, обычный массив
const phones = ref([]);
function addPhone() {
  //видимость переменных получаем через this
  phones.value.push(newPhone.value); //нам не надо заботится о выводе новых данных
  //как только элемент будет добавлен в массив, он появится в списке
  newPhone.value = { number: "", name: "" }; // затираем переменную ввода
  inputnumber.value.focus();
}
</script>

<template>
  <div>
    <!-- Описываем поле вводы и вешаем обработчик на нажатие клавиши Enter -->
    <input
      ref="inputnumber"
      placeholder="Введите номер"
      v-model="newPhone.number"
    />
    <!--Добавляем еще одно поле ввода данных -->
    <input
      placeholder="Введите имя"
      v-model="newPhone.name"
      @keyup.enter="addPhone"
    />
    <ul>
      <!-- Уже знакомый вывод списком-->
      <li v-for="phone in phones" :key="phone">
        {{ phone.number }} {{ phone.name }}
      </li>
    </ul>
  </div>
</template>
