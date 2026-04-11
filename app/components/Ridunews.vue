<script setup lang="ts">

</script>

<template>
    <UCard variant="subtle" class="max-w-[480px] w-full" :ui="{
        root: 'rounded-2xl bg-zinc-100 dark:bg-zinc-900 shadow-xl ring-1 ring-zinc-200 dark:ring-zinc-800',
        body: 'p-4 sm:p-6',
        header: 'p-4 sm:px-6 sm:pt-6 sm:pb-2 border-none',
        footer: 'p-4 sm:px-6 sm:pb-6 sm:pt-2 border-none'
    }">
        <template #header>
            <section class="flex flex-col items-start gap-3 w-full">
                <div class="bg-zinc-200 dark:bg-zinc-800 px-4 py-1.5 rounded-full flex items-center shadow-inner">
                    <span class="text-xs font-bold tracking-wider text-zinc-700 dark:text-zinc-300 uppercase">Ridu News</span>
                </div>
                <div class="w-full bg-zinc-200 dark:bg-zinc-800/80 px-4 py-3 rounded-xl flex items-center border border-zinc-300 dark:border-zinc-700">
                    <h1 class="text-2xl sm:text-3xl font-black tracking-tight text-zinc-900 dark:text-zinc-100">BANGBOO BOT</h1>
                </div>
            </section>
        </template>

        <div class="flex flex-col gap-y-4">
            <!-- Hero Info Card Section -->
            <section class="bg-zinc-200 dark:bg-zinc-800 px-4 py-5 grid grid-cols-1 sm:grid-cols-2 gap-6 rounded-xl border border-zinc-300 dark:border-zinc-700/50">
                <div class="w-full flex justify-center items-center">
                    <div class="relative w-full max-w-[180px] aspect-square flex justify-center items-center rounded-2xl border-4 border-zinc-50 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-900 shadow-inner overflow-hidden isolate">
                        <NuxtImg src="/images/bangboo/18.png" class="h-[85%] object-contain relative -top-3" alt="Bangboo" />
                        <div class="absolute bottom-0 w-full bg-zinc-200/90 dark:bg-zinc-800/95 backdrop-blur py-2 flex justify-center items-center border-t border-zinc-300 dark:border-zinc-700 rounded-b-xl z-10">
                            <p class="font-extrabold text-lg sm:text-xl text-zinc-900 dark:text-zinc-100 tracking-wide">
                                ENN ENNEN
                            </p>
                        </div>
                    </div>
                </div>

                <div class="w-full flex flex-col justify-center items-start gap-y-3">
                    <h1 class="font-[Anton] text-xl sm:text-[22px] leading-tight text-zinc-900 dark:text-zinc-50 uppercase tracking-wide">
                        Small body, big helper!
                    </h1>
                    <p class="font-medium text-sm text-zinc-700 dark:text-zinc-300 text-justify leading-relaxed">
                        Todo servidor precisa de um coelho autônomo para guiá-lo até mesmo nos cantos mais escuros. Moderação, Comandos divertidos, Notificação, Segurança e muito mais!
                    </p>
                </div>
            </section>

            <!-- Features & Stats Section -->
            <section class="bg-zinc-200 dark:bg-zinc-800 py-6 px-4 rounded-xl flex flex-col items-center gap-6 border border-zinc-300 dark:border-zinc-700/50">
                <div class="flex flex-wrap justify-center gap-4 sm:gap-6 w-full">
                    <div class="flex flex-col items-center gap-y-2 min-w-[70px]">
                        <UIcon name="i-lucide-scan-eye" class="w-8 h-8 opacity-80 dark:opacity-100" />
                        <h5 class="text-xs sm:text-sm font-bold text-zinc-700 dark:text-zinc-300 text-center">Moderação</h5>
                    </div>
                    <div class="flex flex-col items-center gap-y-2 min-w-[70px]">
                        <UIcon name="i-lucide-user-round-key" class="w-8 h-8 opacity-80 dark:opacity-100" />
                        <h5 class="text-xs sm:text-sm font-bold text-zinc-700 dark:text-zinc-300 text-center">Cargos</h5>
                    </div>
                    <div class="flex flex-col items-center gap-y-2 min-w-[70px]">
                        <UIcon name="i-lucide-languages" class="w-8 h-8 opacity-80 dark:opacity-100" />
                        <h5 class="text-xs sm:text-sm font-bold text-zinc-700 dark:text-zinc-300 text-center">Idioma</h5>
                    </div>
                    <div class="flex flex-col items-center gap-y-2 min-w-[70px]">
                        <UIcon name="i-lucide-gift" class="w-8 h-8 opacity-80 dark:opacity-100" />
                        <h5 class="text-xs sm:text-sm font-bold text-zinc-700 dark:text-zinc-300 text-center">Sorteios</h5>
                    </div>
                    <div class="flex flex-col items-center gap-y-2 min-w-[70px]">
                        <UIcon name="i-lucide-twitch" class="w-8 h-8 opacity-80 dark:opacity-100" />
                        <h5 class="text-xs sm:text-sm font-bold text-zinc-700 dark:text-zinc-300 text-center">Twitch</h5>
                    </div>
                </div>

                <div class="flex flex-wrap justify-center items-center gap-8 border-t border-zinc-300 dark:border-zinc-700 pt-5 w-full mt-2">
                    <div class="flex flex-col items-center gap-y-2">
                        <div class="min-w-[80px] h-10 px-3 rounded-xl flex justify-center items-center bg-zinc-300 dark:bg-zinc-700 text-base font-extrabold text-zinc-900 dark:text-zinc-100 shadow-inner border border-zinc-400/50 dark:border-zinc-600/50">400+</div>
                        <h5 class="text-sm font-bold text-zinc-700 dark:text-zinc-300">Servidores</h5>
                    </div>
                    <div class="flex flex-col items-center gap-y-2">
                        <div class="min-w-[80px] h-10 px-3 rounded-xl flex justify-center items-center bg-zinc-300 dark:bg-zinc-700 text-base font-extrabold text-zinc-900 dark:text-zinc-100 shadow-inner border border-zinc-400/50 dark:border-zinc-600/50">20+</div>
                        <h5 class="text-sm font-bold text-zinc-700 dark:text-zinc-300">Comandos</h5>
                    </div>
                </div>
            </section>
        </div>

        <template #footer>
            <section class="flex flex-col sm:flex-row gap-4 justify-between items-center w-full">
                <UButton target="_blank" to="https://discord.gg/your-invite-link" size="lg" color="neutral" variant="solid" aria-label="Discord" class="rounded-full" >
                    Convide-me agora
                </UButton>
                <div class="flex items-center gap-2">
                    <UButton target="_blank" to="https://discord.gg/your-invite-link" icon="i-simple-icons-discord" size="lg" color="neutral" variant="ghost" aria-label="Discord" class="rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800" />
                    <UButton target="_blank" to="https://github.com/BangbooBot" icon="i-simple-icons-github" size="lg" color="neutral" variant="ghost" aria-label="GitHub" class="rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800" />
                </div>
            </section>
        </template>
    </UCard>
</template>