<script setup lang="ts">
import { ref, shallowRef, onMounted } from "vue";
import sidebarItems from "@/components/layout/full/vertical-sidebar/sidebarItem";
import { Menu2Icon } from "vue-tabler-icons";
import { UserLoginResultsI } from "~~/services/types/login";
const sidebarMenu = shallowRef(sidebarItems);
const sDrawer = ref(true);

const user = ref<UserLoginResultsI | null>(null);

onMounted(() => {
  const userCookie = useCookie<UserLoginResultsI>("user");
  const rawValue = userCookie.value;

  if (rawValue) {
    try {
      user.value = rawValue;
    //   console.log('User cookie value:', rawValue);
    } catch (error) {
      console.error("Error handling user cookie:", error);
    }
  } 
//   else {
//     console.error("User cookie is missing or empty");
//   }
});
</script>

<template>
  <!------Sidebar-------->
  <v-navigation-drawer
    left
    elevation="0"
    app
    class="leftSidebar"
    v-model="sDrawer"
  >
    <!---Logo part -->
    <div class="pa-5">
      <LayoutFullLogo />
    </div>
    <!-- ---------------------------------------------- -->
    <!---Navigation -->
    <!-- ---------------------------------------------- -->
    <div>
      <perfect-scrollbar class="scrollnavbar">
        <v-list class="pa-6">
          <!---Menu Loop -->
          <template v-for="(item, i) in sidebarMenu">
            <!---Item Sub Header -->
            <LayoutFullVerticalSidebarNavGroup
              :item="item"
              v-if="item.header"
              :key="item.title"
            />

            <!---Single Item-->
            <LayoutFullVerticalSidebarNavItem
              :item="item"
              v-else
              class="leftPadding"
            />
            <!---End Single Item-->
          </template>
        </v-list>
      </perfect-scrollbar>
    </div>
  </v-navigation-drawer>
  <!------Header-------->
  <v-app-bar elevation="0" height="70">
    <div class="d-flex align-center justify-space-between w-100">
      <div>
        <v-btn
          class="hidden-lg-and-up ms-md-3 ms-sm-5 ms-3 text-muted"
          @click="sDrawer = !sDrawer"
          icon
          variant="flat"
          size="small"
        >
          <Menu2Icon size="20" stroke-width="1.5" />
        </v-btn>
        <!-- Notification -->
        <LayoutFullVerticalHeaderNotificationDD />
      </div>
      <div class="flex">
        <!-- Upgrade button -->
        <div>
          <p class="font-thin font-poppins flex justify-end">Hallo!</p>
          <p class="font-bold font-poppins">{{ user?.name ?? '-'}}</p>
          <!-- <p class="font-bold font-poppins">{{ user?.user?.name ?? '-'}}</p> -->
        </div>
        <!-- User Profile -->
        <LayoutFullVerticalHeaderProfileDD />
      </div>
    </div>
  </v-app-bar>
</template>
