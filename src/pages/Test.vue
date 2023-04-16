<template>
  <div>
    <q-form @submit="login">
      <q-input
        v-model="email"
        label="E-mail"
        type="email"
        required
        :rules="[val => !!val || 'Campo obrigatório', val => isValidEmail(val) || 'E-mail inválido']"
      />

      <q-input
        v-model="senha"
        label="Senha"
        type="password"
        required
        :rules="[val => !!val || 'Campo obrigatório', val => val.length >= 6 || 'Senha deve conter no mínimo 6 caracteres']"
        :append="{
          icon: isPwd ? 'mdi-eye' : 'mdi-eye-off',
          handler: () => {
            this.isPwd = !this.isPwd;
          }
        }"
      />

      <q-btn
        type="submit"
        label="Login"
        color="primary"
        :loading="isLoading"
        :disable="isLoading"
      />

      <q-btn
        label="Cadastrar"
        color="secondary"
        @click="cadastrarPage"
      />
    </q-form>
  </div>
</template>

<script>
import axios from "axios";
import { useQuasar } from "quasar";
import { ref } from "vue";

export default {
  name: "Login",

  data() {
    return {
      email: "",
      senha: "",
      isPwd: ref(true),
      isLoading: false,
    };
  },

  methods: {
    async login() {
      const $q = useQuasar();
      if (!this.$refs.form.validate()) {
        return;
      }

      try {
        this.isLoading = true;
        const response = await axios.post("http://127.0.0.1:5000/login", {
          email: this.email,
          senha: this.senha,
        });

        localStorage.setItem("key", response.data.key);

        this.$router.push("/dashboard");
      } catch (error) {
        console.log(error);
        this.$q.notify({
          message: "E-mail ou senha inválidos! Tente novamente!",
          color: "red",
        });
      } finally {
        this.isLoading = false;
      }
    },
    cadastrarPage() {
      console.log("lcicado");
      this.$router.push("/cadastrar");
    },
    isValidEmail(val) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
    },
  },
};
</script>
