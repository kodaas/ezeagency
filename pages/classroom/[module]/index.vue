<script setup lang="ts">
const route = useRoute();
const moduleId = computed(() => route.params.module as string);
const progress = computed(() => {
    const completed = sections.value?.filter(
        (section) => section.status === "completed"
    ).length;
    const total = sections.value?.length;

    return Math.round((completed! / total!) * 100);
});

const uniqueKey = ref(Math.random())

const {
    data: sections,
    execute,
    pending: pendingSection,
    refresh: refreshSection
} = useLazyAsyncData(
    "sections",
    () => SectionService().getSections(moduleId.value),
    {
        immediate: false,
        watch: [uniqueKey],
        transform: (data) => {
            const activeSection = data?.find(
                (section) => section.id === User.value?.active_section
            );

            return data?.map((section) => {
                section.status =
                    activeSection?.id! === section.id
                        ? "active"
                        : activeSection?.index! > section.index
                            ? "completed"
                            : "pending";
                return section;
            });
        },
    }
);


const {
    data: User,
    pending: pendingUser,
    execute: getUser,
    refresh: refreshUser
} = useLazyAsyncData(
    "User",
    () => {
        const data = MetaDataService().getMetaData();
        return data;
    },
    { immediate: false, watch: [uniqueKey]}
);


const pending = computed(() => pendingSection.value && pendingUser.value);

definePageMeta({
    layout: false,
});

onBeforeRouteUpdate(async () => {
    uniqueKey.value = Math.random()
    await refreshUser()
    await refreshSection()
})

onMounted(async () => {
    if (!route.params.section) navigateTo(`/classroom/${route.params.module}/${User.value?.active_section}`);
    await getUser();
    await execute();
});
</script>

<template>
    <NuxtLayout name="classroom">
        <NuxtPage />

        <template #sidebar>
            <div class="bg-foreground rounded-3xl p-5 space-y-3 mb-10">
                <p class="text-background text-left">Progress</p>
                <div class="space-y-1">
                    <p class="text-gray-400 text-right text-xs">
                        {{ progress }}% completed
                    </p>
                    <div class="h-1.5 rounded-lg overflow-hidden bg-gray-200">
                        <div :style="`width: ${progress}%`" class="h-full rounded-lg bg-primary"></div>
                    </div>
                </div>
            </div>

            <div class="mt-10 h-full">
                <p>Course Sections ({{ sections?.length }})</p>

                <div v-if="!pending" class="mt-5 space-y-3 h-[60vh] lg:h-[60%] overflow-y-auto">
                    <ClassroomSectionItem v-for="section in sections" :key="section.id + uniqueKey" :status="section.status!"
                        v-bind="section" />
                </div>
            </div>
        </template>
    </NuxtLayout>
</template>
