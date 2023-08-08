<script lang="ts" setup>
    const {locale}          = useI18n()
    const route             = useRoute()
    const story             = await queryContent(`${locale.value}/stories/${route.params.slug}`).findOne();
    const [prev, next]      = await queryContent().only(['_path', 'title']).findSurround(`/${locale.value}/stories/${route.params.slug}`)
    const is_mobile         = ref(true)
    const mounted           = ref(false)
    const image_container   = ref<HTMLDivElement>();
    const content_container = ref<HTMLDivElement>();

    useHead({
        link: [
            {rel: 'canonical', href: `https://straume.design/${route.params.slug}`}
        ],
        title: `${story.title} | Straume Design`,
        meta: [
            {name: 'description', content: story.description}
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
    <!-- DESKTOP VIEW -->
    <div class="min-h-full sm:h-screen sm:overflow-hidden pt-[120px] sm:pt-[140px] sm:pb-[90px] sm:flex flex-col bg-secondary">
        <div
            ref    = "image_container"
            class  = "grid sm:flex grid-flow-col overflow-x-auto hide-scroll sm:flex-1 gap-[15px] px-[30px] sm:px-10"
            @wheel = "onImageScroll"
        >
            <div
                v-for = "(image, index) in story.gallery.images"
                :key  = "index"
                class = "relative group h-full flex sm:block flex-col"
            >
                <nuxt-picture
                    :imgAttrs="{
                        class: 'relative min-h-full w-auto min-w-[100%] max-w-none min-h-[30vh] max-h-[30vh] sm:max-h-full',
                        alt  : `${image.name}`,
                        title: `${image.name}`
                    }"
                    :src="`/images/stories/${story.gallery.folder}/${index + image.extension}`"
                />
                <span class="flex items-center relative sm:absolute bottom-0 left-0 right-0 p-[15px] text-xs bg-primary sm:opacity-0 sm:group-hover:opacity-100 h-full sm:h-auto flex-1">{{image.name}}</span>
            </div>
        </div>
        <div class="sm:h-[60%]">
            <div
                ref   = "content_container"
                class = "
                    min-h-full h-full text-base font-normal sm:columns-2xs gap-[30px] sm:gap-10 text-left px-[30px] sm:px-10 pt-[30px] sm:overflow-x-auto hide-scroll whitespace-break-spaces
                    2xl:text-xl 2xl:columns-md
                "
                @wheel = "onContentScroll"
            >
                <div class="mb-5 pb-5 border-b border-primary">
                    <h1 class="whitespace-pre-line font-semibold text-xl 2xl:text-2xl mb-2">{{ story.title }}</h1>
                    <p class="whitespace-pre-line font-normal text-sm text-primary-variant">{{ story.info }}</p>
                </div>
                <ContentRenderer :value="story"/>
                <div class="flex pt-5 sm:pt-2.5 mt-2.5 pb-5 border-t border-primary justify-end">
                    <NuxtLink
                        v-if  = "next && next._path.includes('/stories/')"
                        :to   = "next._path.replace('/en', '')"
                        class = "group text-base 2xl:text-xl font-medium text-ellipsis overflow-hidden"
                    >
                        {{ next.title }}
                        <img
                            alt   = "Instagram"
                            class = "inline-block align-text-top h-5 2xl:h-6 group-hover:translate-x-1 transition-transform ease-in"
                            src   = "~/assets/images/icons/arrow-right.svg"
                        />
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>
