<script setup lang="ts">
const route = useRoute();
const moduleId = computed(() => route.params.module as string);

const { data: sections, execute } = useLazyAsyncData("sections", () => SectionService().getSections(moduleId.value), {
    immediate: false, transform: (data) => {
        const activeSection = data?.find((section) => section.id === User.value?.active_section)

        return data?.map((section) => {
            section.status = activeSection?.id! === section.id ? "active" : activeSection?.index! > section.index ? "completed" : "pending";
            
            return section
        })
    }
});

const { data: User, pending } = useLazyAsyncData("User", () => {
    const data = MetaDataService().getMetaData()
    execute()
    return data
})

definePageMeta({
    layout: false
})

watchEffect( () => {
    if (!route.params.section && User.value) {
        navigateTo(`/classroom/${moduleId.value}/${User.value.active_section}`)
    }
})
</script>

<template>
    <NuxtLayout name="classroom">

        <NuxtPage />

        <template #sidebar>
            <div class="bg-foreground rounded-3xl p-5 space-y-3 mb-10">
                <p class="text-background text-left">Progress</p>
                <div class="space-y-1">
                    <p class="text-gray-400 text-right text-xs">
                        60% completed
                    </p>
                    <div class="h-1.5 rounded-lg overflow-hidden bg-gray-200">
                        <div class="w-[60%] h-full rounded-lg bg-primary"></div>
                    </div>
                </div>
            </div>

            <div class="mt-10 h-full">
                <p>Course Sections (5)</p>

                <div class="mt-5 space-y-3 h-[60vh] lg:h-[60%] overflow-y-auto">
                    <ClassroomSectionItem v-for="section in sections" :key="section.id" v-bind="section" />
                </div>

                <Button disabled class="mt-10 w-full">
                    <Icon class="text-xl mr-2" name="solar:question-square-line-duotone" />
                    Take Quiz
                </Button>
            </div>
        </template>
    </NuxtLayout>
</template>