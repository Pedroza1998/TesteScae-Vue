<template>
  <div id="app">
    <nav>
          <div class="nav-wrapper blue darken-1">
        <a href="#" class="brand-logo center">Teste Scae - Teste 1</a>
      </div>
    </nav>

    <div class="container">
      <table>
        <thead>
          <tr>
            <th></th>
            <th>createdAt</th>
            <th>NAME</th>
            <th>Zip-Code</th>
            <th>ADDRESS</th>
            <th>NUM</th>
            <th>Lat</th>
            <th>Long</th>
            <th>PHONE</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="empreendimento of empreendimentos"
            :key="empreendimento.id"
          >
            <td>{{ empreendimento.id }}</td>
            <td>{{ empreendimento.createdAt }}</td>
            <td>{{ empreendimento.name }}</td>
            <td>{{ empreendimento["zip-code"] }}</td>
            <td>{{ empreendimento.address }}</td>
            <td>{{ empreendimento.number }}</td>
            <td>{{ empreendimento.lat }}</td>
            <td>{{ empreendimento.long }}</td>
            <td>{{ empreendimento.phone }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Empreendimento from "./service/empreendimentos";

export default {
  name: "app",
  data() {
    return {
      empreendimento: {
        id: "",
        createdAt: "",
        name: "",
        ["zip-code"]: "",
        address: "",
        number: "",
        lat: "",
        long: "",
        image: "",
        phone: "",
      },
      empreendimentos: [],
      errors: [],
    };
  },

  mounted() {
    this.listar();
  },

  methods: {
    listar() {
      Empreendimento.listar()
        .then((resposta) => {
          this.empreendimentos = resposta.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    salvar() {
      if (!this.empreendimento.id) {
        Empreendimento.salvar(this.empreendimento)
          .then(() => {
            this.empreendimento = {};
            alert("Cadastrado com sucesso!");
            this.listar();
            this.errors = {};
          })
          .catch((e) => {
            this.errors = e.response.data.errors;
          });
      } else {
        Empreendimento.atualizar(this.empreendimento)
          .then(() => {
            this.empreendimento = {};
            this.errors = {};
            alert("Atualizado com sucesso!");
            this.listar();
          })
          .catch((e) => {
            this.errors = e.response.data.errors;
          });
      }
    },

    editar(empreendimento) {
      this.empreendimento = empreendimento;
    },

    remover(empreendimento) {
      if (confirm("Deseja excluir o empreendimento?")) {
        Empreendimento.apagar(empreendimento)
          .then(() => {
            this.listar();
            this.errors = {};
          })
          .catch((e) => {
            this.errors = e.response.data.errors;
          });
      }
    },
  },
};
</script>
