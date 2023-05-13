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
}>()

</script>

<template>
    <NuxtLink :to="story._path.replace('/en', '')"
        class="
            px-[30px] min-w-[80vw] max-w-[80vw]
            sm:px-[40px] sm:min-w-[0px] sm:mr-[15vw] sm:flex sm:flex-col
        "
        :class="{ 'sm:flex-col-reverse': story.position == 'end' }"
        :style="`align-self: ${story.position};`"
    >
        <nuxt-picture :src="`/images/stories/${story.gallery.folder}/${story.cover_image + story.gallery.images[story.cover_image].extension}`"
            :imgAttrs="{
                class: 'h-full w-full sm:w-auto sm:max-w-[50vw] sm:max-h-[45vh]',
                alt: `${story.gallery.images[story.cover_image].name}`
            }"
        />
        <div class="mt-2 sm:mt-3 z-10" :class="{ 'mb-4': story.position == 'end' }">
            <h2 class="
                text-xl mb-2
                2xl:text-2xl
            ">{{story.title}}</h2>
            <div class="
                rounded-full border border-accent text-base px-4 py-1 text-center focus:bg-accent focus:text-white hover:bg-accent hover:text-white inline-flex
                2xl:text-xl
            ">Read</div>
        </div>
    </NuxtLink>
</template>