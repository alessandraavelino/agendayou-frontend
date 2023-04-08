<template>
  <div class="area">
    <ul class="circles">
      <li></li>
      <li></li>
      <li></li>
      <li></li>

      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>

      <li></li>
    </ul>

    <div
      class="window-height window-width row justify-around items-center"
      align="center"
    >
      <div>
        <img src="~assets/logo-login.svg" />
      </div>
      <div class="">
        <q-card class="my-card q-pa-md card" align="center">
          <h4>Fazer Login</h4>
          <q-card-section class="q-gutter-md" style="width: 360px">
            <q-input
              filled
              type="email"
              v-model="email"
              required
              label="E-mail"
            />
            <q-input
              filled
              v-model="senha"
              required
              label="Senha"
              :type="isPwd ? 'senha' : 'text'"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
            <q-btn
              color="primary"
              @click="login"
              type="submit"
              rounded
              label="Login"
            />
          </q-card-section>
          <q-row class="q-ma-md">
            <q-col class="col-6 q-pa-md" @click="cadastrarPage"
              >Cadastrar-se</q-col
            >
            <q-col class="col-6 q-pa-md">Esqueci a senha</q-col>
          </q-row>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      senha: "",
      isPwd: ref(true),
    };
  },
  methods: {
    async login() {
      console.log("clicado");
      try {
        const response = await axios.post("http://127.0.0.1:5000/login", {
          email: this.email,
          senha: this.senha,
        });

        localStorage.setItem("key", response.data.key);

        this.$router.push("/dashboard");
      } catch (error) {
        console.log(error);
        alert("Credenciais inválidas!");
      }
    },
    cadastrarPage() {
      this.$router.push("/cadastrar");
    },
  },
};
</script>

<style scoped>
* {
  overflow-y: hidden;
  overflow-x: hidden;
}

.area {
  background: #4e54c8;
  background: -webkit-linear-gradient(to left, #8f94fb, #4e54c8);
}

.circles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 98.3%;
}

.circles li {
  position: absolute;
  display: block;
  list-style: none;
  width: 20px;
  height: 20px;
  background: rgba(255, 255, 255, 0.2);
  animation: animate 25s linear infinite;
  bottom: -150px;
}

.circles li:nth-child(1) {
  left: 25%;
  width: 80px;
  height: 80px;
  animation-delay: 0s;
}

.circles li:nth-child(2) {
  left: 10%;
  width: 20px;
  height: 20px;
  animation-delay: 2s;
  animation-duration: 12s;
}

.circles li:nth-child(3) {
  left: 70%;
  width: 20px;
  height: 20px;
  animation-delay: 4s;
}

.circles li:nth-child(4) {
  left: 40%;
  width: 60px;
  height: 60px;
  animation-delay: 0s;
  animation-duration: 18s;
}

.circles li:nth-child(5) {
  left: 65%;
  width: 20px;
  height: 20px;
  animation-delay: 0s;
}

.circles li:nth-child(6) {
  left: 75%;
  width: 110px;
  height: 110px;
  animation-delay: 3s;
}

.circles li:nth-child(7) {
  left: 35%;
  width: 150px;
  height: 150px;
  animation-delay: 7s;
}

.circles li:nth-child(8) {
  left: 50%;
  width: 25px;
  height: 25px;
  animation-delay: 15s;
  animation-duration: 45s;
}

.circles li:nth-child(9) {
  left: 20%;
  width: 15px;
  height: 15px;
  animation-delay: 2s;
  animation-duration: 35s;
}

.circles li:nth-child(10) {
  left: 85%;
  width: 150px;
  height: 150px;
  animation-delay: 0s;
  animation-duration: 11s;
}

@keyframes animate {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
    border-radius: 0;
  }

  100% {
    transform: translateY(-1000px) rotate(720deg);
    opacity: 0;
    border-radius: 50%;
  }
}
.card {
  border-radius: 10px;
}
</style>
