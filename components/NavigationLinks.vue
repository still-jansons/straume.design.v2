<script setup lang="ts">
    const localePath = useLocalePath()
    const links = [
        {
            title: 'routes.interiors',
            url  : '/interiors'
        },
        {
            title: 'routes.philosophy',
            url  : '/philosophy'
        },
        {
            title: 'routes.stories',
            url  : '/stories'
        },
        {
            title: 'routes.contacts',
            url  : '/contacts'
        },
    ]
</script>
<template>
    <div class="contents">
        <NuxtLink v-for="(link, index) in links" :key="index" :to="localePath(link.url)" class="link text-2xl mb-5 sm:mb-0 sm:text-xl 2xl:text-3xl" @click.native="$emit('on-link-change')">{{ $t(link.title) }}</NuxtLink>
    </div>
</template>



<!-- <style lang="scss" scoped>
.link {

    &::after {
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        bottom: -.15rem;
        background: #27221C;
        transition: height .2s ease-out;
        z-index: -1;
        height: 0;
    }

    &.nuxt-link-active::after {
        height: .14rem;
    }
}
</style> -->