<script setup lang="ts">

const { t, locale }       = useI18n();
const localePath          = useLocalePath();
const selected_slug       = ref<string | null>(null);
const interiors_container = ref<HTMLDivElement>();

useHead({
    link: [
        { rel: 'canonical', href: `https://straume.design${localePath('interiors')}` }
    ],
    title: `${t('pages.interiors.head-title')} | Straume Design`,
    meta: [
        { name: 'description', content: t('pages.interiors.head-description') }
    ]
})

const scrolling = (e: any) => {
    e.preventDefault();
    interiors_container.value!.scrollLeft += e.deltaX;
    interiors_container.value!.scrollLeft += e.deltaY;
}

</script>

<template>
    <div class="h-screen max-h-[stretch]">
        <div @wheel="scrolling" ref="interiors_container"
            class="
                h-full flex pt-[120px] pb-[60px] overflow-x-auto hide-scroll overflow-y-auto
                sm:pt-[55px] sm:pb-[100px]
            "
        >
            <ContentList :path="`${locale}/interiors`" v-slot="{ list }">
                <Interior v-for="(interior, index) in list" :key="interior._path"
                    :item-index    = "index as number"
                    :interior      = "interior"
                    :is-last-item  = "(index > 0 && index + 1 === list.length)"
                    :selected-slug = "selected_slug"
                    @slug-change   = "selected_slug = $event"
                />
            </ContentList>
        </div>
    </div>
</template>
