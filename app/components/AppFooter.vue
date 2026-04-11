<script lang="ts" setup>
const date = new Date()
const year = date.getFullYear()
</script>

<template>
    <UFooter>
        <template #left>
            
        </template>
        <div class="flex flex-col justify-center items-center gap-y-4">
            <div class="flex items-center gap-2">
                <!--<img src="/images/bangboo/Penguinboo.png" alt="Bangboo" class="h-10 drop-shadow-sm drop-shadow-lime-600" />-->
                <span class="text-xl font-bold tracking-tight">Bangboo</span>
            </div>
            <p class="text-sm">Copyright © {{ new Date().getFullYear() }}.</p>
            <UButton icon="i-simple-icons-github" color="neutral" variant="ghost" to="https://github.com/BangbooBot"
                target="_blank" aria-label="GitHub" />
        </div>

        <template #right>
            
        </template>
    </UFooter>
</template>