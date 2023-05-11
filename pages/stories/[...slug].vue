<script lang="ts" setup>
const { locale }        = useI18n()
const route             = useRoute()
const story             = await queryContent(`${locale.value}/stories/${route.params.slug}`).findOne();
const is_mobile         = ref(true)
const mounted           = ref(false)
const image_container   = ref<HTMLDivElement>();
const content_container = ref<HTMLDivElement>();

useHead({
    link: [
        { rel: 'canonical', href: `https://straume.design/${route.params.slug}` }
    ],
    title: `${story.title} | Straume Design`,
    meta: [
        { name: 'description', content: story.description }
    ]
})

const onImageScroll = (e: any) => {
    e.preventDefault();
    image_container.value!.scrollLeft += e.deltaX;
    image_container.value!.scrollLeft += e.deltaY;
}

const onContentScroll = (e: any) => {
    e.preventDefault();
    content_container.value!.scrollLeft += e.deltaX;
    content_container.value!.scrollLeft += e.deltaY;
}

onMounted(() => {
    setTimeout(() => {
        mounted.value = true;
    }, 1000);

    is_mobile.value = (screen.width < 640);
    console.log(is_mobile.value);
    window.addEventListener("resize", () => is_mobile.value = (screen.width < 640));
})
</script>
<template>
    <!-- MOBILE VIEW -->
    <div v-if="is_mobile" class="sm:hidden w-screen min-h-full bg-secondary pt-[120px]">
        <div class="px-[30px] pb-[30px]">
            <h1 class="text-3xl">{{ story.title }}</h1>
        </div>
        <div class="relative flex items-center overflow-x-auto">
            <div v-for="(image, index) in story.gallery.images" :key="index"
                 class="pl-[30px] last:pr-[30px]">
                <nuxt-picture :src="`/images/stories/${story.gallery.folder}/${index + image.extension}`"
                    :imgAttrs="{
                        class: 'h-[30vh] max-w-none',
                        alt: `${image.name}`,
                        loading: 'lazy'
                    }"
                />
                <span class="text-xs p-[10px_15px] bg-primary block">{{ image.name }}</span>
            </div>
        </div>
        <div class="p-[30px] text-base text-left font-normal">
            <ContentRenderer :value="story" />
        </div>
        <div class="p-[30px] bg-primary">
            <p class="whitespace-pre-line text-base">{{ story.info }}</p>
        </div>
    </div>
    <!--  -->
    <!-- DESKTOP VIEW -->
    <div v-if="!is_mobile" class="hidden sm:grid h-screen grid-cols-[minmax(300px,_20%)_1fr] bg-secondary">
        <div class="bg-primary px-[40px] pt-[140px] pb-[100px] flex flex-col justify-between h-full relative shadow-[6px_0_15px_-3px_rgba(0,0,0,0.1),0_0_6px_-4px_rgba(0,0,0,0.1)] z-10">
            <h1 class="whitespace-pre-line text-2xl 2xl:text-5xl">{{ story.title!.replace(/\s+/g, '\n') }}</h1>
            <p class="whitespace-pre-line text-base font-normal 2xl:text-xl">{{ story.info }}</p>
        </div>
        <div class="h-screen overflow-hidden pt-[140px] pb-[100px] flex flex-col">
            <div @wheel="onImageScroll" ref="image_container"  class="flex overflow-x-auto hide-scroll flex-1">
                <div v-for="(image, index) in story.gallery.images" :key="index" 
                    class="relative group h-full pl-[30px]"
                    :class="{ 'pr-[30px]': story.gallery.images.length == index + 1 }"
                >
                    <nuxt-picture :src="`/images/stories/${story.gallery.folder}/${index + image.extension}`"
                        :imgAttrs="{
                            class: 'relative min-h-full max-h-full w-auto min-w-[100%] max-w-none',
                            alt: `${image.name}`,
                            loading: 'lazy'
                        }" />
                    <span class="block absolute bottom-0 left-[30px] right-0 p-[15px] text-xs bg-primary opacity-0 group-hover:opacity-100"
                          :class="{ 'right-[30px]': story.gallery.images.length == index + 1 }">{{ image.name }}</span>
                </div>
            </div>
            <div class="h-[60%]">
                <div @wheel="onContentScroll" ref="content_container" class="
                    h-full text-base font-normal columns-2xs gap-[30px] text-left px-[30px] pt-[30px] overflow-x-auto hide-scroll
                    2xl:text-xl 2xl:columns-md
                ">
                    <ContentRenderer :value="story" />
                </div>
            </div>
        </div>
    </div>
</template>
