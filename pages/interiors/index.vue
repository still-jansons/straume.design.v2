<script setup lang="ts">
    const { t, locale } = useI18n();
    const localePath    = useLocalePath();
    const selected_slug = ref(null);

    useHead({
        link: [
            { rel: 'canonical', href: `https://straume.design${localePath('interiors')}` }
        ],
        title: `${t('pages.interiors.head-title')} | Straume Design`,
        meta: [
            { name: 'description', content: t('pages.interiors.head-title') }
        ]
    })
</script>

<template>
    <div class="h-screen max-h-[stretch]">
        <div class="
            h-full flex pt-[120px] pb-[60px] overflow-x-auto overflow-y-hidden hide-scroll scroll-smooth snap-x snap-mandatory
            sm:pt-[55px] sm:pb-[140px]
        ">
            <ContentList :path="`${locale}/interiors`" v-slot="{ list }">
                <Interior v-for="(interior, index) in list" :key="interior._path"
                    :item-index    = "index as number"
                    :interior      = "interior"
                    :is-last-item  = "(index > 0 && index + 1 === list.length)"
                    :selected-slug = "selected_slug as string"
                    @slug-change   = "selected_slug = $event"
                />
            </ContentList>
        </div>
    </div>
</template>