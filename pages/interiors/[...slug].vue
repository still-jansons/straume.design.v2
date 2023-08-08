<script lang="ts" setup>
const route              = useRoute()
const {locale}           = useI18n()
const interior           = await queryContent(`${locale.value}/interiors/${route.params.slug}`).findOne()
const [prev, next]       = await queryContent().only(['_path', 'title']).findSurround(`/${locale.value}/interiors/${route.params.slug}`)
const is_mobile          = ref(true)
const interior_container = ref<HTMLDivElement>();

useHead({
    link: [
        {rel: 'canonical', href: `https://straume.design/${route.params.slug}`}
    ],
    title: `${interior.title} | Straume Design`,
    meta: [
        {name: 'description', content: interior.description}
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
        <div class="flex h-full">
            <div
                ref="interior_container"
                class="flex pt-[140px] pb-[140px] overflow-x-auto relative z-0 hide-scroll"
                @wheel="scrolling"
            >
                <div class="flex gap-[30px] sm:gap-10">
                    <figure
                        v-for = "(image, index) in interior.gallery.images"
                        :key  = "index"
                        class = "min-h-full first:pl-[30px] sm:first:pl-10"
                    >
                        <nuxt-picture
                            :imgAttrs="{
                                class  : 'max-w-[none] h-full max-h-[stretch]',
                                alt    : `${interior.title} (${image})`,
                                title  : `${interior.title} (${image})`,
                                loading: 'lazy'
                            }"
                            :src="`/images/interiors/${interior.gallery.folder}/${image}.webp`"
                        />
                    </figure>
                </div>
                <div class="flex flex-col justify-end min-w-[100vw] max-w-screen sm:min-w-[650px] pl-[30px] sm:pl-10 pr-[30px] sm:pr-[40] gap-6">
                    <h1 class="text-base font-bold 2xl:text-xl">{{ interior.title!.replace(/\s+/g, '\n') }}</h1>
                    <p class="whitespace-pre-line text-base 2xl:text-xl font-normal max-w-[500px]">{{ interior.description }}</p>
                    <div class="flex justify-between items-center">
                        <NuxtLink v-if="prev && prev._path.includes('/interiors/')" :to="prev._path.replace('/en', '')"
                                  class="group mr-5 text-base 2xl:text-xl max-w-[45%]">
                            <img alt="Instagram"
                                 class="inline-block align-text-top h-5 2xl:h-6 group-hover:-translate-x-1 transition-transform ease-in"
                                 src="~/assets/images/icons/arrow-left.svg"/>
                            {{ prev.title }}
                        </NuxtLink>
                        <NuxtLink v-if="next && next._path.includes('/interiors/')" :to="next._path.replace('/en', '')"
                                  class="group ml-auto text-base 2xl:text-xl max-w-[45%]">
                            {{ next.title }}
                            <img alt="Instagram"
                                 class="inline-block align-text-top h-5 2xl:h-6 group-hover:translate-x-1 transition-transform ease-in"
                                 src="~/assets/images/icons/arrow-right.svg"/>
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
