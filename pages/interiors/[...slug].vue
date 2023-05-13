<script setup lang="ts">
const route              = useRoute()
const { locale }         = useI18n()
const interior           = await queryContent(`${locale.value}/interiors/${route.params.slug}`).findOne()
const [prev, next]       = await queryContent().only(['_path', 'title']).findSurround(`/${ locale.value }/interiors/${ route.params.slug }`)
const is_mobile          = ref(true)
const interior_container = ref<HTMLDivElement>();

console.log(prev, next);

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
        <!-- <div v-if="is_mobile" class="flex sm:hidden justify-center flex-col h-full pt-[120px] pb-[40px]">
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
                        :title="`${interior.title} (${image})`"
                        loading="lazy"
                    />
                </figure>
            </div>
        </div> -->
        <!--  -->
        <!-- DESKTOP VERSION -->
        <!-- <div v-if="!is_mobile" class="hidden sm:grid h-full grid-cols-[minmax(350px,_20%)_1fr]"> -->
        <div class="flex h-full">
            <!-- <div class="bg-primary px-[40px] py-[140px] flex flex-col justify-between h-full relative shadow-[6px_0_15px_-3px_rgba(0,0,0,0.1),0_0_6px_-4px_rgba(0,0,0,0.1)] z-10">
                <h1 class="
                    whitespace-pre-line text-3xl
                    2xl:text-5xl
                ">{{ interior.title!.replace(/\s+/g, '\n') }}</h1>
                <p class="whitespace-pre-line text-base 2xl:text-xl font-normal">{{ interior.description }}</p>
            </div> -->
            <div @wheel="scrolling" ref="interior_container" class="flex pt-[140px] pb-[140px] overflow-x-auto relative z-0 hide-scroll">
                <div class="flex gap-[30px] sm:gap-10">
                    <figure v-for="(image, index) in interior.gallery.images" :key="index" class="min-h-full first:pl-[30px] sm:first:pl-10">
                        <nuxt-picture :src="`/images/interiors/${interior.gallery.folder}/${image}.webp`"
                            :imgAttrs="{
                                class: 'max-w-[none] h-full max-h-[stretch]',
                                alt: `${interior.title} (${image})`,
                                title: `${interior.title} (${image})`,
                                loading: 'lazy'
                            }"
                        />
                    </figure>
                </div>
                <div class="flex flex-col justify-end min-w-[100vw] max-w-screen sm:min-w-[650px] pl-[30px] sm:pl-10 pr-[30px] sm:pr-[40] gap-6">
                    <h1 class="
                        text-base font-bold
                        2xl:text-xl
                    ">{{ interior.title!.replace(/\s+/g, '\n') }}</h1>
                    <p class="whitespace-pre-line text-base 2xl:text-xl font-normal max-w-[500px]">{{ interior.description }}</p>
                    <div class="flex justify-between items-center">
                        <NuxtLink v-if="prev && prev._path.includes('/interiors/')" :to="prev._path.replace('/en', '')" class="group mr-5 text-base 2xl:text-xl max-w-[45%]">
                            <img src="~/assets/images/icons/arrow-left.svg" alt="Instagram" class="inline-block align-text-top h-5 2xl:h-6 group-hover:-translate-x-1 transition-transform ease-in" />
                            {{ prev.title }}
                        </NuxtLink>
                        <NuxtLink v-if="next && next._path.includes('/interiors/')" :to="next._path.replace('/en', '')" class="group ml-auto text-base 2xl:text-xl max-w-[45%]">
                            {{ next.title }}
                            <img src="~/assets/images/icons/arrow-right.svg" alt="Instagram" class="inline-block align-text-top h-5 2xl:h-6 group-hover:translate-x-1 transition-transform ease-in" />
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>