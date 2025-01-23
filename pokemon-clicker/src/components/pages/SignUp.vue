<template>
  <form @submit.prevent="submitSignUp">
    <Label title="companyName" :required="true">
      <span class="text">Company name</span>
      <input
        type="text"
        placeholder="input company name"
        v-model="signUpData.companyName"
        required
      />
    </Label>
    <Label title="userName" :required="true">
      <span class="text">User name</span>
      <input
        type="text"
        placeholder="input user name"
        v-model="signUpData.userName"
        required
      />
    </Label>
    <Label title="email" :required="true">
      <span class="text">Email</span>
      <input
        type="text"
        placeholder="input email"
        v-model="signUpData.email"
        required
      />
    </Label>
    <Label title="password" :required="true">
      <span class="text">Password</span>
      <input
        type="password"
        placeholder="input password"
        v-model="signUpData.password"
        required
      />
    </Label>
    <Button type="submit" :disabled="loading">
      <span>{{ loading ? "Submitting..." : "Sign Up" }}</span>
    </Button>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Button from "../shared/Button.vue";
import Label from "../shared/Label.vue";

export default defineComponent({
  components: { Label, Button },
  name: "SignUp",
  setup() {
    const signUpData = ref({
      companyName: "",
      userName: "",
      email: "",
      password: "",
    });
    const loading = ref(false);

    const submitSignUp = async () => {
      loading.value = true;

      // проверяю, что все поля заполнены
      if (
        !signUpData.value.companyName ||
        !signUpData.value.userName ||
        !signUpData.value.email ||
        !signUpData.value.password
      ) {
        alert("Please fill all fields.");
        loading.value = false;
        return;
      }
      try {
        const response = await fetch(
          "https://cafe-admin-api-production.up.railway.app/auth/sign-up",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(signUpData.value), // Передаем значения
          },
        );

        console.log(response);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Registration failed");
        }

        const result = await response.json();
        console.log("Registration successful:", result);

        alert("Registration successful!");
        signUpData.value = {
          companyName: "",
          userName: "",
          email: "",
          password: "",
        };
      } catch (error: any) {
        console.error("Error during registration:", error.message);
        alert(`Error: ${error.message}`);
      } finally {
        loading.value = false;
      }
    };

    return {
      signUpData,
      submitSignUp,
      loading,
    };
  },
});
</script>

<style scoped>
form {
  display: flex;
}
input {
  margin: 10px 0;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 2px;
  gap: 24px;
  width: 95%;
}
.input-error {
  border-color: red;
}
.error {
  color: red;
  font-size: 12px;
}
.text {
  color: black;
}
button {
  background-color: #365fac;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #224f9e;
}
</style>
