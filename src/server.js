import { ApolloServer, gql } from "apollo-server";
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import process from "process";

//немного данных для визуализации
var _phones = [
  { number: "5555", name: "John" },
  { number: "6666", name: "Bill" },
  { number: "7777", name: "Smith" },
  { number: "1234", name: "Sara" },
  { number: "12345", name: "Vera" },
];
//types for graphql
const typeDefs = gql`
  type Query {
    """
    Получить список телеофнов
    """
    Phones: [Phone]
  }
  type Phone {
    """
    Номер телефона
    """
    number: String
    """
    Имя владельца
    """
    name: String
  }
  input inputPhone {
    number: String!
    name: String
  }
  type Mutation {
    "Добавить запись"
    addPhone(input: inputPhone): [Phone]
    "Удалить запись"
    deletePhone(number: String): [Phone]
    "Обновить запись"
    updatePhone(number: String, name: String): [Phone]
  }
`;
//resolvers for graphql
const resolvers = {
  Phone: {
    name: (root) => {
      if (root.number === "5555") {
        return "*censored*";
      } else {
        return root.name;
      }
    },
  },
  Query: {
    Phones: () => {
      return _phones; // возвращает весь массив
    },
  },
  Mutation: {
    addPhone: (_, { input }) => {
      _phones.push(input); // вносим в массив запись
      return _phones;
    },
    deletePhone: (_, { number }) => {
      _phones.splice(
        _phones.findIndex((x) => x.number === number),
        1
      ); //находим элемент и удаляем
      return _phones;
    },
    updatePhone: (_, { number, name }) => {
      const numberi = _phones.findIndex((x) => x.number === number);
      const namei = _phones.findIndex((x) => x.name === name);
      const index = numberi > 0 ? numberi : namei;
      _phones.splice(index, 1, { number: number, name: name });
      return _phones;
    },
  },
};
//создаем новый Apollo сервер
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
});
//запускаем

const HOST = process.argv[2];
const PORT = process.argv[3];

server.listen({ host: HOST, port: PORT }).then(({ url }) => {
  console.log(`🚀   Apollo взлетел ${url}`);
});
