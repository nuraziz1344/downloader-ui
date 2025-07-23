<script setup lang="ts">
import { NuxtLink, UIcon } from '#components';

const theme = useState('theme', () => 'dark')

onMounted(() => {
    const storedTheme = window?.localStorage?.getItem('theme');
    if (storedTheme) {
        theme.value = storedTheme;
        document?.documentElement?.classList?.toggle('dark', theme.value === 'dark');
    }
});

const toggleTheme = () => {
    theme.value = theme.value === 'dark' ? 'light' : 'dark';
    window?.localStorage?.setItem('theme', theme.value);
    document?.documentElement?.classList?.toggle('dark', theme.value === 'dark');
};
</script>

<template>
    <v-app :theme="theme">
        <div class="h-screen w-screen overflow-x-hidden overflow-y-auto">
            <v-app-bar :elevation="2">
                <template v-slot:prepend>
                    <v-app-bar-nav-icon>
                        <NuxtLink to="/">
                            <NuxtImg :src="theme === 'dark' ? '/image/logo-white.svg' : '/image/logo.svg'" width="32"
                                height="32" alt="Logo" />
                        </NuxtLink>
                    </v-app-bar-nav-icon>
                </template>

                <v-app-bar-title>
                    <NuxtLink to="/">
                        Media Downloader
                    </NuxtLink>
                </v-app-bar-title>

                <template v-slot:append>
                    <div class="flex items-center gap-4 mr-4">
                        <v-tooltip text="Download" location="bottom">
                            <template v-slot:activator="{ props }">
                                <NuxtLink href="/" v-bind="props">
                                    <UIcon name="mdi-cloud-download" class="size-8" />
                                </NuxtLink>
                            </template>
                        </v-tooltip>
                        <v-tooltip text="Jadwal Sholat" location="bottom">
                            <template v-slot:activator="{ props }">
                                <NuxtLink href="/jadwal-sholat" v-bind="props">
                                    <UIcon name="i-material-symbols-prayer-times" class="size-8" />
                                </NuxtLink>
                            </template>
                        </v-tooltip>
                        <v-tooltip text="Toggle Theme" location="bottom">
                            <template v-slot:activator="{ props }">
                                <UIcon name="i-mdi-theme-light-dark" class="size-8 cursor-pointer" v-bind="props"
                                    @click="toggleTheme" />
                            </template>
                        </v-tooltip>
                    </div>
                </template>
            </v-app-bar>
            <v-main>
                <slot />
            </v-main>
        </div>
    </v-app>
</template>
