<script setup lang="ts">
import { NuxtLink, UIcon } from '#components';

</script>

<template>
    <v-app>
        <div class="h-screen w-screen overflow-x-hidden overflow-y-auto">
            <v-app-bar :elevation="2">
                <template v-slot:prepend>
                    <v-app-bar-nav-icon>
                        <v-icon>mdi-heart</v-icon>
                    </v-app-bar-nav-icon>
                </template>

                <v-app-bar-title>My App</v-app-bar-title>

                <template v-slot:append>
                    <div class="flex items-center gap-4 mr-4">
                        <NuxtLink href="/youtube" class="mr-4">
                            <UIcon name="i-mdi-youtube" class="size-8" />
                        </NuxtLink>
                        <NuxtLink href="/tiktok">
                            <UIcon name="i-ic-baseline-tiktok" class="size-8" />
                        </NuxtLink>
                        <NuxtLink href="/instagram">
                            <UIcon name="i-ic-baseline-instagram" class="size-8" />
                        </NuxtLink>
                        <NuxtLink href="/facebook">
                            <UIcon name="i-ic-baseline-facebook" class="size-8" />
                        </NuxtLink>
                        <NuxtLink href="/twitter">
                            <UIcon name="i-mdi-twitter" class="size-8" />
                        </NuxtLink>
                        <NuxtLink href="/jadwal-sholat">
                            <UIcon name="i-material-symbols-prayer-times" class="size-8" />
                        </NuxtLink>
                    </div>
                </template>
            </v-app-bar>
            <v-main>
                <v-container>
                    <slot />
                </v-container>
            </v-main>
        </div>
    </v-app>
</template>
