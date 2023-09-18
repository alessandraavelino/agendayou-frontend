<template>
  <div class="half">
    <div class="area" align="center">
      <div class="asset window-height q-pt-xl">
        <div class="bg-login q-pt-xl q-pr-md">
          <img
            class="q-mt-xl"
            style="width: 600px; height: 450px"
            src="~assets/bg-login.svg"
          />
        </div>
        <footer class="q-mt-xl" style="color: white">
          <span>Desenvolvido com ❤️ por Alessandra Avelino</span>
        </footer>
      </div>
    </div>
    
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "ImageLayout",
  props: {
    title: {
      type: String,
      required: true,
    },

    caption: {
      type: String,
      default: "",
    },

    to: {
      type: String,
      default: "#",
    },

    tabActive: {
      type: String,
      default: ""
    },

    icon: {
      type: String,
      default: "",
    },
  },
});
</script>

<style scoped>
.area {
  background: #4b56d2;
  background: -webkit-linear-gradient(to left, #8f94fb, #4b56d2);
  overflow: hidden;
}

.half {
  width: 50%;
  height: 100%;
  float: left;
  text-align: center;
  overflow: hidden;
}

@media only screen and (max-width: 600px) {
  .area {
    display: none;
  }
  .half {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .half {
    width: 100%;
  }

  .card {
    width: auto;
    margin: 0 20px;
  }

  .row {
    flex-direction: column;
  }

  .col {
    padding-right: 0;
    margin-bottom: 10px;
  }

  .q-input,
  .q-select {
    width: 100%;
  }

  .campos {
    width: 320px;
  }

  .content {
    margin-top: -50px;
  }

  
}

</style>