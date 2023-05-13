<script setup lang="ts">
const route              = useRoute()
const { locale }         = useI18n()
const interior           = await queryContent(`${locale.value}/interiors/${route.params.slug}`).findOne()
const is_mobile          = ref(true)
const interior_container = ref<HTMLDivElement>();

useHead({
    link: [
        { rel: 'canonical', href: `https://straume.design/${route.params.slug}` }
    ],
    title: `${interior.title} | Straume Design`,
    meta: [
        { name: 'description', content: interior.description }
    ]
})

const scrolling = (e: any) => {
    e.preventDefault();
    interior_container.value!.scrollLeft += e.deltaX;
    interior_container.value!.scrollLeft += e.deltaY;
}

onMounted(() => {
    is_mobile.value = (screen.width < 640);
    window.addEventListener("resize", () => is_mobile.value = (screen.width < 640));
});
</script>

<template>
    <div class="h-screen max-h-[stretch] bg-secondary">
        <!-- MOBILE VERSION -->
        <div v-if="is_mobile" class="flex sm:hidden justify-center flex-col h-full pt-[120px] pb-[40px]">
            <div class="pl-[30px] w-[85%] z-20 relative mb-[-1.1rem]">
                <h1 class="whitespace-pre-line text-3xl">{{ interior.title!.replace(/\s+/g, '\n') }}</h1>
            </div>
            <div class="fixed right-0 inset-y-0 bg-secondary w-[80px] z-0"></div>
            <div class="flex items-center overflow-x-auto overflow-y-hidden hide-scroll z-10">
                <div class="px-[30px] min-w-[70vw] relative pt-[60px] pb-[60px]">
                    <p class="whitespace-pre-line text-base font-normal">{{ interior.description }}</p>
                </div>
                <figure v-for="(image, index) in interior.gallery.images" :key="index" class="px-[30px] h-[50vh] scroll-smooth">
                    <img
                        :src="`/images/interiors/${interior.gallery.folder}/${image}.webp`"
                        class="max-w-none h-full"
                        :alt="`${interior.title} (${image})`"
                        loading="lazy"
                    />
                </figure>
            </div>
        </div>
        <!--  -->
        <!-- DESKTOP VERSION -->
        <div v-if="!is_mobile" class="hidden sm:grid h-full grid-cols-[minmax(350px,_20%)_1fr]">
            <div class="bg-primary px-[40px] py-[140px] flex flex-col justify-between h-full relative shadow-[6px_0_15px_-3px_rgba(0,0,0,0.1),0_0_6px_-4px_rgba(0,0,0,0.1)] z-10">
                <h1 class="
                    whitespace-pre-line text-3xl
                    2xl:text-5xl
                ">{{ interior.title!.replace(/\s+/g, '\n') }}</h1>
                <p class="whitespace-pre-line text-base 2xl:text-xl font-normal">{{ interior.description }}</p>
            </div>
            <div @wheel="scrolling" ref="interior_container" class="flex pt-[140px] pb-[140px] overflow-x-auto relative z-0 hide-scroll">
                <figure v-for="(image, index) in interior.gallery.images" :key="index" class="min-h-full px-[30px]">
                    <nuxt-picture :src="`/images/interiors/${interior.gallery.folder}/${image}.webp`"
                        :imgAttrs="{
                            class: 'max-w-[none] h-full max-h-[stretch]',
                            alt: `${interior.title} (${image})`,
                            loading: 'lazy'
                        }"
                    />
                </figure>
            </div>
        </div>
    </div>
</template>