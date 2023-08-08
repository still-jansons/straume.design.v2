<script lang="ts" setup>
    const {t} = useI18n();
    const localePath = useLocalePath();

    useHead({
        link: [
            {rel: 'canonical', href: `https://straume.design${localePath('philosophy')}`}
        ],
        title: `${t('pages.philosophy.head-title')} | Straume Design`,
        meta: [
            {name: 'description', content: t('pages.philosophy.head-title')}
        ]
    })
</script>

<template>
    <div class="bg-primary-variant pt-[120px] pb-[40px] px-[30px] min-h-screen sm:flex sm:flex-col sm:justify-center sm:pb-[120px] sm:px-[50px] lg:px-[140px]">
        <h1 class="text-white font-medium text-3xl mb-[30px] sm:mb-[100px] 2xl:text-5xl">{{$t('pages.philosophy.title')}}</h1>
        <div class="sm:columns-2">
            <p v-for="index in 2" :key="index" class="text-left text-base mb-[20px] 2xl:text-2xl">
                {{ $t(`pages.philosophy.content.${index - 1}`) }}
            </p>
        </div>
    </div>
</template>
