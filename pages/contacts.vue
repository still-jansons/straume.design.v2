<script lang="ts" setup>
    const {t} = useI18n();
    const localePath = useLocalePath();

    useHead({
        link: [
            {rel: 'canonical', href: `https://straume.design${localePath('contacts')}`}
        ],
        title: `${t('pages.contacts.head-title')} | Straume Design`,
        meta: [
            {name: 'description', content: t('pages.contacts.head-title')}
        ]
    })
</script>

<template>
    <div id="containerContacts"
         class="px-[10vw] h-screen max-h-[stretch] w-screen bg-primary-variant flex flex-col justify-center">
        <div class="flex flex-col sm:flex-row items-center justify-between">
            <div class="mb-[40px] sm:mb-0 sm:mr-4">
                <h2 class="text-2xl">Annija Straume-Kokina</h2>
            </div>
            <address class="mb-[40px] sm:mb-0 sm:mr-4 sm:ml-4">
                <a class="not-italic text-2xl" href="mailto:annija@straume.design">annija@straume.design</a>
            </address>
            <div class="mb-[40px] sm:mb-0 sm:ml-4">
                <a class="text-2xl" href="tel:+37129901196">+371 29901196</a>
            </div>
        </div>
        <!-- <div class="relative">
            <div class="flex items-center justify-center absolute right-0 left-0 sm:mt-[10vh]">
                <a href="https://instagram.com/straume.design?igshid=YmMyMTA2M2Y=" target="_blank">
                    <img src="~/assets/images/icons/ig-dark-2.svg" alt="Instagram" class="h-8">
                </a>
                <a href="https://www.facebook.com/straume.design" target="_blank" class="ml-2">
                    <img src="~/assets/images/icons/fb-dark-2.svg" alt="Facebook" class="h-8">
                </a>
            </div>
        </div> -->
    </div>
</template>
