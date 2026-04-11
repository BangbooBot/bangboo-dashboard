<script setup lang="ts">
import type { DropdownMenuItem, NavigationMenuItem } from '@nuxt/ui';

// Close menu on navigation
const route = useRoute();

const menuItems = computed<NavigationMenuItem[]>(() => [
    {
        label: 'Inicio',
        to: '/',
        icon: 'uil:home-alt'
    },
    {
        label: 'Comandos',
        to: '/commands',
        active: route.path.startsWith('/minhas-reservas'),
        icon: 'i-lucide-terminal'
    },
    {
        label: 'Status',
        to: '/status',
        active: route.path.startsWith('/minhas-reservas'),
        icon: 'i-lucide-info'
    },
]);

const colorMode = useColorMode()

const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set(_isDark) {
    colorMode.preference = _isDark ? 'dark' : 'light'
  }
})

const themeItems = ref<DropdownMenuItem[][]>([
    [
        { label: 'Light', icon: 'i-lucide-sun', onSelect: () => isDark.value = false },
    ],
    [
        { label: 'Dark', icon: 'i-lucide-moon', onSelect: () => isDark.value = true },
    ]
]);

const profileItems = ref<DropdownMenuItem[][]>([
    [
        { label: 'Perfil', icon: 'i-lucide-user', onSelect: () => navigateTo('/profile') },
    ],
    [
        { label: 'Sair', icon: 'i-lucide-log-out', color: 'error', onSelect: () => navigateTo('/login') },
    ]
]);
</script>

<template>
    <UHeader mode="slideover">
        <template #title>
            <NuxtLink to="/" class="flex items-center gap-2 transition-opacity hover:opacity-90">
                <img src="/images/bangboo/Penguinboo.png" alt="Bangboo" class="h-10 drop-shadow-sm drop-shadow-lime-600" />
                <span class="text-xl font-bold tracking-tight text-lime-500">Bangboo</span>
            </NuxtLink>
        </template>

        <UNavigationMenu :items="menuItems" />

        <template #right>
            <!-- Theme -->
            <UDropdownMenu :items="themeItems">
                <UButton :icon="isDark ? 'i-lucide-moon' : 'i-lucide-sun'" color="neutral"
                    variant="outline" class="rounded-full" />
            </UDropdownMenu>

            <!-- Login Button (Desktop) -->
            <UDropdownMenu :items="profileItems">
                <UButton icon="i-lucide-log-in" color="neutral" variant="outline" class="rounded-full" />
            </UDropdownMenu>
        </template>

        <template #body>
            <UNavigationMenu :items="menuItems" orientation="vertical" class="-mx-2.5" />
        </template>
    </UHeader>
</template>

<style scoped>
* {
    transition: all 200ms ease-out;
}
</style>