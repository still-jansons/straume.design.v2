<script setup lang="ts">
const { t, locale } = useI18n();
const localePath    = useLocalePath();
const mounted       = ref(false);

useHead({
    link: [
        { rel: 'canonical', href: `https://straume.design${localePath('stories')}` }
    ],
    title: `${t('pages.stories.head-title')} | Straume Design`,
    meta: [
        { name: 'description', content: t('pages.stories.head-description') }
    ]
})

onMounted(() => {
    setTimeout(() => {
        mounted.value = true;
    }, 1000);
});

</script>

<template>
    <div class="h-screen max-h-[stretch] bg-secondary">
        <div class="h-full flex pt-[120px] pb-[40px] sm:pt-0 sm:pb-0 overflow-x-auto overflow-y-hidden hide-scroll snap-x snap-mandatory">
            <div class="
                flex flex-col self-center pl-[30px] min-w-[80vw] max-w-[80vw] snap-start
                sm:self-auto sm:justify-between sm:p-[150px_0px_250px_100px] sm:min-w-[80vw] sm:max-w-[80vw] sm:z-10
                md:p-[150px_0px_200px_140px] md:min-w-[60vw] md:max-w-[60vw]
                lg:min-w-[50vw] lg:max-w-[50vw]
                2xl:min-w-[40vw] 2xl:max-w-[40vw]
            ">
                <h1 class="
                    mb-[30px]
                    text-3xl
                    sm:mb-[40px]
                    xl:text-3xl
                    2xl:text-5xl
                ">{{ $t('pages.stories.title') }}</h1>
                <p class="
                    text-base
                    font-normal
                    sm:w-[70%]
                    2xl:text-2xl
                ">{{ $t('pages.stories.content') }}</p>
            </div>
            <div class="
                flex h-full z-auto
                sm:ml-[-5vw] sm:pt-[55px] sm:pb-[140px]
                2xl:ml-[-5vw]
            ">
                <ContentList :path="`${locale}/stories`" v-slot="{ list }">
                    <Story v-for="(story, index) in list" :key="story._path"
                        :story="story"
                        :index="index"
                    />
                </ContentList>
            </div>
        </div>
    </div>
</template>
