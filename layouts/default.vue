<script setup lang="ts">

const head  = useLocaleHead({
    addDirAttribute    : true,
    identifierAttribute: 'id',
    addSeoAttributes   : true
})
</script>

<template>
    <div class="antialiased relative">
        <Html :lang="head.htmlAttrs?.lang" :dir="head.htmlAttrs?.dir">
            <AppHeader />
            <slot />
            <AppFooter />
        </Html>
    </div>
</template>
