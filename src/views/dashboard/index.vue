<script lang="ts" setup>
import { computed, onBeforeMount, ref } from "vue"
import { useUserStore } from "@/store/modules/user"
import AdminDashboard from "./admin/index.vue"
import EditorDashboard from "./editor/index.vue"

const currentRole = ref("10")
const roles = computed(() => {
  return useUserStore().roles
})
onBeforeMount(() => {
  if (!roles.value.includes("10")) {
    currentRole.value = "editor"
  }
})
</script>

<template>
  <component :is="currentRole === '10' ? AdminDashboard : EditorDashboard" />
</template>
