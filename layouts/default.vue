<script setup lang="ts">
const { t } = useI18n()
const head  = useLocaleHead({
    addDirAttribute    : true,
    identifierAttribute : 'id',
    addSeoAttributes   : true
})
</script>

<template>
    <div>
        <Html :lang="head.htmlAttrs?.lang" :dir="head.htmlAttrs?.dir">
            <AppHeader />
            <slot />
            <AppFooter />
        </Html>
    </div>
</template>
