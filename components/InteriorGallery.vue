<script lang="ts" setup>
    const props = defineProps<{
        folder          : string,
        images          : string[],
        info           ?: string,
        isLastItem     ?: boolean,
        showInfo       ?: boolean,
        altText         : string,
        paginationOnTop?: boolean
    }>()

    const transition     = ref('slide');
    const selected_image = ref(0);
</script>

<template>
    <div class="gallery-wrapper flex flex-col" :class="{ reverse: paginationOnTop }">
        <figure class="relative image flex h-[45vh] w-fit" :class="[ paginationOnTop ? 'items-start' : 'items-end', isLastItem ? 'flex-row-reverse justify-end': '']">
            <template v-for="(image, index) of images">
                <nuxt-picture
                    v-show="selected_image == index"
                    :src="`/images/${folder}/${image}.webp`"
                    :imgAttrs="{
                        class: 'w-auto max-w-full max-h-[45vh] relative sm:w-auto',
                        alt: `${altText} (${images[selected_image]})`,
                        fetchpriority: 'low'
                    }"
                    legacyFormat="webp"
                />
                <div ></div>
            </template>
            <div v-if="info" class="relative z-[-1]">
                <!-- <Transition :name="`slide-${isLastItem ? 'left' : 'right'}`"> -->
                    <div v-show="showInfo"
                        class="
                            absolute p-6 bg-primary-variant wrapper-info max-w-lg w-max
                            2xl:p-8
                        "
                        :class="[isLastItem ? 'right-0' : 'left-0', paginationOnTop ? 'top-0' : 'bottom-0']"
                    >
                        <p class="
                            whitespace-pre-line font-normal
                            sm:text-base
                            2xl:text-xl
                        ">{{ info }}</p>
                    </div>
                <!-- </Transition> -->
            </div>
            <div class="absolute inset-0 flex">
                <button class="w-1/2 h-full" @click="selected_image = (selected_image + images.length - 1) % images.length"></button>
                <button class="w-1/2 h-full" @click="selected_image = (selected_image + 1) % images.length"></button>
            </div>
        </figure>
        <div v-if="images.length > 1" class="hidden sm:flex sm:items-center mt-[13px] pagination">
            <button v-for="(image, index) in images" :key="index"
                class="inline-flex mr-2 group" 
                :class="{ selected: selected_image == index }"
                :aria-label="`Image ${index + 1}`" 
                @click="selected_image = index"
            >
                <span aria-hidden="true" class="h-2 w-2 border rounded-full bg-transparent mx-1.5 group-[.selected]:bg-black first:ml-0"></span>
            </button>
        </div>
    </div>
</template>

<style scoped>
    .gallery-wrapper.reverse {
        flex-direction: column-reverse;
    }
    .gallery-wrapper.reverse .pagination {
        margin-top   : 0;
        margin-bottom: 13px;
    }
    .wrapper-info {
        transition: all .5s ease-in;
    }

    .slide-left-enter-from,
    .slide-left-leave-to {
        right: -10rem;
    }

    .slide-right-enter-from,
    .slide-right-leave-to {
        left: -10rem;
    }
</style>
