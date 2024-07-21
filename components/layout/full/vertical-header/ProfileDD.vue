<script setup lang="ts">
import { UserIcon, MailIcon, ListCheckIcon } from "vue-tabler-icons";
import Swal from "sweetalert2";

const accessTokenCookie = useCookie("accessToken");
const userCookie = useCookie("user");

const handleLogout = () => {
  try {
    accessTokenCookie.value = null;
    userCookie.value = null;

    if (
      accessTokenCookie.value === null ||
      (accessTokenCookie.value === undefined && userCookie.value === null) ||
      userCookie.value === undefined
    ) {
      Swal.fire({
        icon: "success",
        title: "Logout Successful",
        text: "You have successfully logout.",
        showConfirmButton: false,
        timer: 1200,
      }).then(() => {
        navigateTo("/landing/community");
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong, please try again later.",
        showConfirmButton: false,
        timer: 1200,
      });
    }
  } catch (e) {
    console.error("Error Logout : ", e);
  }
};
</script>

<template>
  <!-- ---------------------------------------------- -->
  <!-- notifications DD -->
  <!-- ---------------------------------------------- -->
  <v-menu :close-on-content-click="false">
    <template v-slot:activator="{ props }">
      <v-btn
        class="profileBtn custom-hover-primary"
        variant="text"
        v-bind="props"
        icon
      >
        <v-avatar size="35">
          <img src="/images/users/avatar-1.jpg" height="35" alt="user" />
        </v-avatar>
      </v-btn>
    </template>
    <v-sheet rounded="md" width="200" elevation="10" class="mt-2">
      <v-list class="py-0" lines="one" density="compact">
        <v-list-item value="item1" active-color="primary">
          <template v-slot:prepend>
            <UserIcon stroke-width="1.5" size="20" />
          </template>
          <v-list-item-title class="pl-4 text-body-1"
            >My Profile</v-list-item-title
          >
        </v-list-item>
        <v-list-item value="item2" active-color="primary">
          <template v-slot:prepend>
            <MailIcon stroke-width="1.5" size="20" />
          </template>
          <v-list-item-title class="pl-4 text-body-1"
            >My Account</v-list-item-title
          >
        </v-list-item>
        <v-list-item value="item3" active-color="primary">
          <template v-slot:prepend>
            <ListCheckIcon stroke-width="1.5" size="20" />
          </template>
          <v-list-item-title class="pl-4 text-body-1"
            >My Task</v-list-item-title
          >
        </v-list-item>
      </v-list>
      <div class="pt-4 pb-4 px-5 text-center">
        <v-btn color="primary" variant="outlined" block @click="handleLogout()"
          >Logout</v-btn
        >
      </div>
    </v-sheet>
  </v-menu>
</template>
