<script setup lang="ts">
    const drawer_open = ref(false);
    const localePath  = useLocalePath();
</script>

<template>
    <div>
        <div class="fixed top-[30px] left-0 right-0 z-[100] flex items-center justify-between header-wrapper px-[30px] sm:px-[40px]">
            <NuxtLink :to="localePath('philosophy')">
                <img src="/logo.svg" alt="Logo" class="h-[54px]">
            </NuxtLink>
            <img src="/logo-text.svg" alt="straume" class="h-4 top-4 absolute left-[50%] -translate-x-[50%] hidden sm:block">
            <div class="relative ml-auto mr-6 sm:mr-0">
                <div class="flex items-center justify-center">
                    <a href="https://instagram.com/straume.design?igshid=YmMyMTA2M2Y=" target="_blank">
                        <img src="~/assets/images/icons/ig-dark.svg" alt="Instagram" class="h-8">
                    </a>
                    <a href="https://www.facebook.com/straume.design" target="_blank" class="ml-2">
                        <img src="~/assets/images/icons/fb-dark.svg" alt="Facebook" class="h-8">
                    </a>
                </div>
            </div>
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