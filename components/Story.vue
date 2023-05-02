<script lang="ts" setup>

defineProps<{
    story: {
        title  : string
        _path  : string
        gallery: {
            folder: string
            images: {
                name     : string,
                extension: string
            }[]
        }
        cover_image: number
        position   : 'start' | 'center' | 'end'
    }
    index: number | string
}>()
</script>

<template>
    <div class="contents">
        <NuxtLink :to="story._path.replace('/en', '')"
            class="
                snap-always snap-start
                px-[30px] min-w-[86vw] max-w-[86vw]
                sm:px-[40px] sm:min-w-[0px] sm:mr-[20vw] sm:flex sm:flex-col
            "
            :class="{ 'sm:flex-col-reverse': story.position == 'end' }"
            :style="`align-self: ${story.position};`"
        >
            <nuxt-picture :src="`/images/stories/${story.gallery.folder}/${story.cover_image + story.gallery.images[story.cover_image].extension}`"
                :imgAttrs="{
                    class: 'h-full w-full sm:w-auto sm:max-w-[50vw] sm:max-h-[50vh] 2xl:max-h-[60vh]',
                    alt: `${story.gallery.images[story.cover_image].name}`,
                    loading: 'lazy'
                }"
            />
            <div class="mt-2 sm:mt-3 z-10" :class="{ 'mb-4': story.position == 'end' }">
                <h2 class="
                    text-xl mb-2
                    2xl:text-3xl
                ">{{story.title}}</h2>
                <NuxtLink :to="story._path.replace('/en', '')" class="
                    rounded-full border border-accent text-base px-4 py-1 text-center focus:bg-accent focus:text-white hover:bg-accent hover:text-white
                    2xl:text-xl
                ">Read</NuxtLink>
            </div>
        </NuxtLink>
    </div>
</template>