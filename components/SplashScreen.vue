<template>
    <div class="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-900">
        <div class="!p-8 bg-white rounded-full animate-pulse">
            <NuxtImg src="/image/logo.png" alt="Media Downloader Logo" class="w-48 rounded-xl h-auto" />
        </div>

        <div class="mt-12">
            <span class="loader block"></span>
        </div>
    </div>
</template>

<style scoped>
.animate-pulse {
    animation: pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
    50% {
        opacity: 0.5;
    }
}

.loader {
    border: 4px solid rgba(255, 255, 255, 0.3);
    border-top: 4px solid #ffffff;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>