<template>
    <section class="w-screen h-screen bg-foreground grid grid-cols-4 p-5">
        <aside class="text-background">
            <Sidebar />
        </aside>

        <main class="bg-background col-span-3 rounded-xl p-5">
            <h1>Main content</h1>
            <slot />
        </main>
    </section>
</template>