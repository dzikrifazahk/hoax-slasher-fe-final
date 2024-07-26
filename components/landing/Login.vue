<template>
  <div
    class="w-full lg:w-1/2 bg-[#C0244F] flex flex-col bg-gradient-to-br from-[#32193C] via-[#32193C] via-40% to-custom-light-opacity rounded-xl border border-[#9C88FF] hover:shadow-[0_35px_80px_-15px_rgba(0,0,0,100)] shadow-[0_35px_60px_-15px_rgba(0,0,0,100)]"
  >
    <div class="p-5 text-white flex-col">
      <!-- email -->
      <div class="flex flex-col items-center">
        <p class="font-bold text-lg">Please Login Here</p>
        <p class="font-thin">With Your Account</p>
      </div>
      <div>
        <span class="font-poppins">Email</span>
        <label class="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            class="h-4 w-4 opacity-70"
          >
            <path
              d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z"
            />
            <path
              d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z"
            />
          </svg>
          <input type="text" class="grow" v-model="email" placeholder="Email" />
        </label>
      </div>
      <!-- password -->
      <div>
        <span class="font-poppins">Password</span>
        <label class="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            class="h-4 w-4 opacity-70"
          >
            <path
              fill-rule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clip-rule="evenodd"
            />
          </svg>
          <input type="password" v-model="password" class="grow" placeholder="Password" />
        </label>
      </div>
      <!-- checkbox -->
      <div class="flex flex-col gap-2">
        <div class="w-full">
          <div class="form-control flex items-end w-full">
            <label class="label cursor-pointer">
              <input
                type="checkbox"
                defaultChecked
                class="checkbox border [--chkbg:theme(colors.red.500)] [--chkfg:orange] checked:border-indigo-800"
              />
              <span class="label-text pl-2 text-white"> Remember me </span>
            </label>
          </div>
          <button class="btn w-full bg-[#FA3454] border-none text-white" @click="handleSubmit()">
            Submit
          </button>
        </div>
      </div>

      <!-- forgot password -->
      <div class="flex items-center justify-center my-4">
        <div class="flex-grow border-t border-gray-300"></div>
        <span class="mx-4 text-white">Or</span>
        <div class="flex-grow border-t border-gray-300"></div>
      </div>
      <div class="flex justify-end text-white text-sm">
        <span class="font-thin">Lupa Password? &nbsp;</span>
        <span class="font-bold underline cursor-pointer"> Klik Disini </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import api from "~~/services/api";
import { CommonApiResponse } from "~~/services/types/common";
import { LoginResultI, UserLoginResultsI } from "~~/services/types/login";
import Swal from 'sweetalert2';

const email = ref("");
const password = ref("");


const handleSubmit = async () => {
  try {
    const body = {
      email: email.value,
      password: password.value,
    };

    const response = await api.post<CommonApiResponse<LoginResultI>>(
      "/auth/login",
      body
    );
    
    console.log(response.data.data)
    if(response.data.data.token){
      const token = useCookie('accessToken');
      const user = useCookie<UserLoginResultsI>('user');

      token.value = response.data.data.token;
      user.value = response.data.data.user;

      Swal.fire({
        icon: 'success',
        title: 'Login Successful',
        text: 'You have successfully logged in.',
        showConfirmButton: false,
        timer: 1200
      }).then(() => {
        navigateTo("/");
      });
    }
  } catch (error) {
    console.log(error);
  }
};
</script>
<style scoped>
/* Optional: Add some styles to handle the responsiveness if needed */
@media (max-width: 1024px) {
  .hidden-on-mobile {
    display: none;
  }
}
</style>
