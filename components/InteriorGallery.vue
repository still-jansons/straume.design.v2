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
        <figure class="image flex" :class="{ 'flex-row-reverse': isLastItem }">
            <template v-for="(image, index) of images">
                <nuxt-picture v-show="selected_image == index"
                    :src="`/images/${folder}/${image}.webp`" 
                    :imgAttrs="{
                        class: 'w-auto max-w-full max-h-[45vh] relative sm:w-auto sm:max-w-none sm:h-[45vh] ',
                        alt: `${altText} (${images[selected_image]})`
                    }" 
                />
            </template>
            <div v-if="info" class="relative z-[-1]">
                <transition :name="`slide-${isLastItem ? 'left' : 'right'}`">
                    <div v-show="showInfo"
                        class="
                            absolute bottom-0 p-6 bg-primary-variant wrapper-info
                            2xl:p-8
                        "
                        :class="isLastItem ? 'right-0' : 'left-0'"
                    >
                        <p class="
                            whitespace-pre font-normal
                            sm:text-base
                            2xl:text-2xl
                        ">{{ info }}</p>
                    </div>
                </transition>
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
        margin-top   : 0px;
        margin-bottom: 13px;
    } 

    .slide-right-enter-active,
    .slide-right-leave-active,
    .slide-left-enter-active,
    .slide-left-leave-active {
        transition: all .5s ease;
    }

    .slide-right-enter,
    .slide-right-leave-active,
    .slide-left-enter,
    .slide-left-leave-active {
        opacity: 0;
    }

    .slide-left-enter {
        right: -6rem;
    }

    .slide-right-enter {
        left: -6rem;
    }

    .slide-left-leave-active {
        right: -6rem;
    }

    .slide-right-leave-active {
        left: -6rem;
    }
</style>
