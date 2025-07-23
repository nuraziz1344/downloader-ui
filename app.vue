<template>
    <v-app>
        <Transition name="fade">
            <SplashScreen v-if="isLoading" />
        </Transition>

        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </v-app>
</template>

<script setup lang="ts">
import { ref, Transition } from 'vue';
import SplashScreen from './components/SplashScreen.vue';

const isLoading = ref(true)

onMounted(() => isLoading.value = false)
</script>

<style>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

body {
    background-color: #090e1a;
}
</style>
