<script lang="ts" setup>
import AdminHeader from '~/components/admin/AdminHeader.vue';
definePageMeta({
    sanctum: {
        excluded: true,
    }
});

</script>

<template>
    <div class="min-h-screen flex flex-col">
        <AdminHeader />
        <AdminSettings />
    </div>
</template>