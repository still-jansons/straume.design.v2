<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface interior {
    title  : string
    _path  : string
    gallery: {
        folder: string
        images: string[]
    }
    description: string
    position   : 'start' | 'center' | 'end'
}

defineProps<{
    interior    : interior
    isLastItem  : boolean
    selectedSlug: string | null
    itemIndex   : number
}>()

defineEmits(['slug-change'])

const is_mobile = ref(true)

onMounted(() => {
    is_mobile.value = screen.width < 640
    window.addEventListener('resize', () => is_mobile.value = screen.width < 640)
})

</script>

<template>
    <!-- DESKTOP VIEW -->
    <div
        class="
            hidden interior-wrapper px-[120px] max-h-[90vh]
            sm:flex sm:flex-col 
        "
        :class="[interior.position]"
        :style="`align-self: ${interior.position}; z-index: ${isLastItem && selectedSlug == interior._path ? 101 : 100 - itemIndex}`"
    >
        <InteriorGallery
            :folder          = "`interiors/${interior.gallery.folder}`"
            :images          = "interior.gallery.images"
            :info            = "interior.description"
            :isLastItem      = "isLastItem"
            :showInfo        = "selectedSlug == interior._path"
            :altText         = "interior.title"
            :paginationOnTop = "interior.position == 'end'"
        />
        <div class="title flex justify-between h-[90px] items-end">
            <NuxtLink :to="interior._path.replace('/en', '')"
                class="
                    text-xl mr-4
                    2xl:text-3xl
                "
            >{{ interior.title }}</NuxtLink>
            <button @click="$emit('slug-change', selectedSlug == interior._path ? null : interior._path)"
                class="
                    info uppercase text-xl
                    2xl:text-3xl
                "
                :class="{ 'active': selectedSlug == interior._path}">INFO</button>
        </div>
    </div>
    <!--  -->
    <!-- MOBILE VIEW -->
    <template>
        <NuxtLink :to="interior._path.replace('/en', '')"
            class="
                interior-wrapper flex flex-col px-[30px] min-w-[86vw] max-w-[86vw] snap-always snap-start
                sm:hidden
            "
            :class="interior.position"
            :style="`align-self: ${interior.position};`"
        >
            <InteriorGallery
                :folder  = "`interiors/${interior.gallery.folder}`"
                :images  = "[interior.gallery.images[0]]"
                :altText = "interior.title"
            />
            <div class="title flex my-2">
                <h2 class="text-xl">{{ interior.title }}</h2>
            </div>
        </NuxtLink>
    </template>
    <!--  -->
</template>
