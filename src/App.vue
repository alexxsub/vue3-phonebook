<script setup>
import { ref, onMounted } from "vue";
const inputnumber = ref(null);
const newPhone = ref({
  number: "",
  name: "",
});
//массив с данными, обычный массив
const phones = ref([]);
const editmode = ref(false); //флаг режима, режим true - правка данных, false -ввод новых
const index = ref(-1); //индекс редактируемого элемента
function addPhone() {
  //видимость переменных получаем через this
  phones.value.push(newPhone.value); //нам не надо заботится о выводе новых данных
  //как только элемент будет добавлен в массив, он появится в списке
  newPhone.value = { number: "", name: "" }; // затираем переменную ввода
  inputnumber.value.focus();
}
function savePhone() {
  //сохраняем данные, только если индекс имеется, т.е. >-1
  if (index.value > -1) {
    Object.assign(phones.value[index.value], newPhone.value);
    resetPhone(); //очищаем все поля
  }
}
function deletePhone(item) {
  //ищем выбранный элемент массива и удаляем
  const index = phones.value.indexOf(item);
  phones.value.splice(index, 1);
}
function resetPhone() {
  //тут обнуляем переменные и приводим все в исходное состояние
  newPhone.value = { number: "", name: "" }; // затираем переменную ввода
  inputnumber.value.focus();
  editmode.value = false;
  index.value = -1;
}
function setPhone(item) {
  //вычисляем индекс и сохраняем в переменной
  index.value = phones.value.indexOf(item);
  //для вывода данных в полях, выводим их в связных переменных
  newPhone.value = Object.assign({}, item);
  //включаем режим редактирования, появляются кнопки
  editmode.value = true;
}
onMounted(() => {
  // инициализация демо данными
  phones.value = [
    {
      number: "8903888777666",
      name: "Петя",
    },
    {
      number: "8920888333222",
      name: "Вася",
    },
    {
      number: "8909222333888",
      name: "Маша",
    },
  ];
});
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
    <button v-show="editmode" @click="savePhone">Сохранить</button>
    <button v-show="editmode" @click="resetPhone">Отмена</button>
    <ul>
      <!-- Уже знакомый вывод списком-->

      <li v-for="phone in phones" v-bind:key="phone.number">
        <a href="#" @click="setPhone(phone)">{{ phone.number }}</a>
        {{ phone.name }}
        <button @click="deletePhone(phone)">x</button>
      </li>
    </ul>
  </div>
</template>
