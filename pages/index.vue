<template>
    <v-container class="mt-5">
        <v-row justify="center">
            <v-col cols="12" md="8">
                <div class="text-center mb-8">
                    <h1 class="text-h3 sm:text-h2 font-weight-bold">
                        Media Post Downloader
                    </h1>
                    <p class="text-body-1 text-gray-600 dark:text-gray-300 mt-2">
                        Paste a social media post link below to get download options.
                    </p>
                </div>

                <div class="mb-6">
                    <v-text-field v-model="videoUrl" label="Social Media Post URL" placeholder="https://..."
                        variant="solo" :prepend-inner-icon="formIcon"
                        :append-inner-icon="videoUrl ? 'mdi-magnify' : 'mdi-clipboard-search-outline'"
                        @click:append-inner="fetchVideoInfo" @keyup.enter="fetchVideoInfo" clearable
                        :disabled="isLoading">
                    </v-text-field>
                </div>

                <v-alert v-if="error" type="error" variant="tonal" title="An Error Occurred" :text="error" closable
                    class="mb-6"></v-alert>

                <v-slide-y-transition>
                    <div v-if="videoInfo && !isLoading">
                        <v-card class="bg-grey-darken-4">
                            <v-row no-gutters>
                                <v-col cols="12" sm="4">
                                    <NuxtImg :src="videoInfo.thumbnail" aspect-ratio="16/9" cover
                                        class="rounded-l-lg sm:rounded-l-lg sm:rounded-r-0" />
                                </v-col>
                                <v-col cols="12" sm="8">
                                    <v-card-title class="text-wrap">
                                        {{ videoInfo.title }}
                                    </v-card-title>
                                    <v-card-subtitle>
                                        {{ videoInfo.author }}
                                    </v-card-subtitle>

                                    <v-tabs v-model="tab" color="primary" class="mt-2">
                                        <v-tab value="video">
                                            <v-icon start>mdi-video</v-icon>
                                            Video
                                        </v-tab>
                                        <v-tab value="audio">
                                            <v-icon start>mdi-music-note</v-icon>
                                            Audio
                                        </v-tab>
                                    </v-tabs>

                                    <v-window v-model="tab">
                                        <v-window-item value="video">
                                            <v-list lines="two" class="bg-transparent">
                                                <v-list-item v-for="format in videoInfo.formats.video"
                                                    :key="format.quality" :href="format.url" target="_blank">
                                                    <template #prepend>
                                                        <v-icon color="grey-lighten-1">mdi-monitor-screenshot</v-icon>
                                                    </template>
                                                    <v-list-item-title class="font-weight-bold">
                                                        {{ format.quality }}
                                                    </v-list-item-title>
                                                    <v-list-item-subtitle>
                                                        {{ format.container }} - {{ format.size }}
                                                    </v-list-item-subtitle>
                                                    <template #append>
                                                        <v-btn variant="tonal" color="blue"
                                                            size="small">Download</v-btn>
                                                    </template>
                                                </v-list-item>
                                            </v-list>
                                        </v-window-item>

                                        <v-window-item value="audio">
                                            <v-list lines="one" class="bg-transparent">
                                                <v-list-item v-for="format in videoInfo.formats.audio"
                                                    :key="format.quality" :href="format.url" target="_blank">
                                                    <template #prepend>
                                                        <v-icon color="grey-lighten-1">mdi-volume-high</v-icon>
                                                    </template>
                                                    <v-list-item-title>
                                                        {{ format.quality }} - {{ format.size }}
                                                    </v-list-item-title>
                                                    <template #append>
                                                        <v-btn variant="tonal" color="green"
                                                            size="small">Download</v-btn>
                                                    </template>
                                                </v-list-item>
                                            </v-list>
                                        </v-window-item>
                                    </v-window>
                                </v-col>
                            </v-row>
                        </v-card>
                    </div>
                </v-slide-y-transition>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import { NuxtImg } from '#components'
import { computed, ref } from 'vue'

// --- Regular Expressions for URL Validation ---
const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/
const tiktokRegex = /^(https?:\/\/)?(www\.)?(tiktok)\.com\/.+$/
const instagramRegex = /^(https?:\/\/)?(www\.)?instagram\.com\/.+$/
const twitterRegex = /^(https?:\/\/)?(www\.)?twitter\.com\/.+$/
const facebookRegex = /^(https?:\/\/)?(www\.)?facebook\.com\/.+$/

// --- State Management ---
const videoUrl = ref('')
const videoInfo = ref<VideoInfo | null>(null)
const isLoading = ref(false)
const error = ref<string | null>(null)
const tab = ref('video') // Default tab
const formIcon = computed(() => {
    if (youtubeRegex.test(videoUrl.value)) {
        return 'mdi-youtube'
    } else if (instagramRegex.test(videoUrl.value)) {
        return 'mdi-instagram'
    } else if (twitterRegex.test(videoUrl.value)) {
        return 'mdi-twitter'
    } else if (facebookRegex.test(videoUrl.value)) {
        return 'mdi-facebook'
    } else if (tiktokRegex.test(videoUrl.value)) {
        return 'mdi-tiktok'
    }
    return 'mdi-link'
})

// --- TypeScript Interfaces ---
interface VideoFormat {
    quality: string;
    container: string;
    size: string;
    url: string;
}
interface VideoInfo {
    title: string;
    author: string;
    thumbnail: string;
    formats: {
        video: VideoFormat[];
        audio: VideoFormat[];
    };
}

// --- Computed Properties ---
const isUrlValid = computed(() => {
    return youtubeRegex.test(videoUrl.value) || tiktokRegex.test(videoUrl.value) ||
        instagramRegex.test(videoUrl.value) || twitterRegex.test(videoUrl.value) ||
        facebookRegex.test(videoUrl.value);
})

// --- Functions ---
async function fetchVideoInfo() {
    if (!videoUrl.value) {
        videoUrl.value = await navigator.clipboard.readText().catch(() => '');
    }

    if (!isUrlValid.value) {
        error.value = "Please enter a valid YouTube URL."
        return
    }

    // Reset state
    isLoading.value = true
    error.value = null
    videoInfo.value = null

    try {
        // dummy
        videoInfo.value = {
            title: "Sample Video Title",
            author: "Sample Author",
            thumbnail: "https://placehold.co/640",
            formats: {
                video: [
                    {
                        quality: "720p",
                        container: "mp4",
                        size: "500MB",
                        url: "https://example.com/video-720p.mp4"
                    }
                ],
                audio: [
                    {
                        quality: "128kbps",
                        container: "mp3",
                        size: "5MB",
                        url: "https://example.com/audio-128kbps.mp3"
                    }
                ]
            }
        }
    } catch (e: any) {
        // Menangkap error dari server atau network
        error.value = e.data?.message || "Failed to fetch video information. The API might be down or the URL is invalid."
    } finally {
        // Memastikan loading state selalu berhenti
        isLoading.value = false
    }
}
</script>

<style scoped>
/* Tailwind CSS bisa digunakan di sini untuk customisasi tambahan jika diperlukan */
</style>