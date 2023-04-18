<script setup lang="ts">
    const drawer_open = ref(false);
    const localePath  = useLocalePath();
</script>

<template>
    <div>
        <div class="fixed top-[30px] left-0 right-0 z-[100] flex justify-between header-wrapper px-[30px] sm:px-[40px]">
            <NuxtLink :to="localePath('philosophy')">
                <img src="/logo.svg" alt="Logo" class="h-[54px]">
            </NuxtLink>
            <img src="/logo-text.svg" alt="straume" class="h-4 top-4 absolute left-[50%] -translate-x-[50%] hidden sm:block">
            <button class="drawer-toggle sm:hidden" :class="{ active: drawer_open }" @click="drawer_open = !drawer_open">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
        <nav class="
            bg-primary-variant fixed min-h-screen inset-0 flex flex-col items-center justify-center overflow-y-hidden z-[90]
            sm:hidden" 
            :class="{ hidden: !drawer_open }"
        >
            <NavigationLinks @on-link-change="drawer_open = false" />
        </nav>
    </div>
</template>