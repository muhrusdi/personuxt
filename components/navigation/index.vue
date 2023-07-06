<template>
  <p-sidebar fixed>
    <template #brand>
      <p-sidebar-brand>
        <h1>LOGO</h1>
      </p-sidebar-brand>
    </template>
    <p-sidebar-nav>
      <p-nav-item active>
        <template #icon>
          <PiDashboard16 />
        </template>
        Dashboard
      </p-nav-item>
      <p-nav-sub-item text="Documents" collapsible>
        <template #icon>
          <PiDocumentFilled16 />
        </template>
        <p-sidebar-nav>
          <p-nav-item>
            Need Action
          </p-nav-item>
          <p-nav-item>
            In Progress
          </p-nav-item>
          <p-nav-item>
            Others
          </p-nav-item>
        </p-sidebar-nav>
      </p-nav-sub-item>
    </p-sidebar-nav>
  </p-sidebar>
</template>

<script lang="ts" setup>
import PiDocumentFilled16 from '@privyid/persona-icon/vue/document-filled/16.vue'
import PiDashboard16 from '@privyid/persona-icon/vue/dashboard/16.vue'
</script>