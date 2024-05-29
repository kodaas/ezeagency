<script setup lang="ts">
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useMediaQuery } from "@vueuse/core";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/toast/use-toast";
import type { ClassroomModuleDto } from "~/models";

definePageMeta({
    layout: false,
});

const { toast } = useToast()
const showNav = ref(false);
const route = useRoute();

const { data: videoData, pending: videoPending, execute: executeVideoData } = useLazyAsyncData("videoData", () =>
    VideoService().getVideo(route.params.section as string), { immediate: false }
);

const { data: activeSection, pending: activeSectionPending, execute: executeActiveSection } = useLazyAsyncData("activeSection", () => SectionService().getSection( route.params.module as string, route.params.section as string), { immediate: false })

const { data: modules, pending: modulePending, execute: executeModules } = useLazyAsyncData("module", () => ModuleService().getModules(), { immediate: false })

const { data: User, pending: UserPending, execute: executeUser } = useLazyAsyncData("User", () => MetaDataService().getMetaData(), { immediate: false })

const pending = ref(true)

const videoEnded = ($event: number) => {
    const { data, error } = useAsyncData("VideoEnded", () => MetaDataService().updateMetaData({ video_timestamp: Number($event), active_section: videoData.value?.next_section_id }))

    if (error.value) {
        toast({
            title: "Error",
            description: error.value.message,
            variant: "destructive",
        });

        return
    }


    showNav.value = true
}

const updateTimestamp = ($event: number) => {

}

const next = () => {
    if (videoData.value?.next_section_id) navigateTo(`/classroom/${route.params.module}/${videoData.value.next_section_id}`)
}

const nextModule = async () => {
    const { data: nextModule, error } = await useAsyncData("nextModule", () => ModuleService().getNextModule(route.params.module as string))

    if (error.value) {
        toast({
            title: "Error",
            description: "Failed to Update Data",
            variant: "destructive",
        });
    }


    const totalModule = modules.value?.length || 0
    const totalCompleted = User.value?.number_of_completed_modules! + 1
    const { data: updatedUser, error: updateUserError } = await useAsyncData("UpdatedUser", () => MetaDataService().updateMetaData({
        video_timestamp: 0,
        active_section: nextModule.value?.section_id || null,
        active_module: nextModule.value?.id || null,
        progress: (totalCompleted / totalModule) * 100,
        number_of_completed_modules: totalCompleted, 
        number_of_certificate: User.value?.number_of_certificate! + 1,
    }))


    if (updateUserError.value) {
        toast({
            title: "Error",
            description: "Failed to Update Data",
            variant: "destructive",
        })

        return
    }

    // console.log(updatedUser)

    window.location.replace(window.location.origin)

    // navigateTo("/")
    // window.location.reload()
}

const options = ref<object | null>(null)

onMounted(async () => {
    if (!route.params.section) navigateTo(`/classroom/${route.params.module}`);

    pending.value = true

    await executeUser()
    await executeModules()
    await executeActiveSection()
    await executeVideoData()

    options.value = {
        sources: [
            {
                src: videoData.value?.src,
                type: videoData.value?.format,
            },
        ],
        controls: true,
        loop: false,
        autoplay: false,
        preload: "auto",
        fluid: true,
        poster: videoData.value?.poster,
        aspectRatio: '16:9'
    }

    pending.value = false
});
</script>

<template>
    <AspectRatio v-if="pending" :ratio="16 / 9" class="bg-muted rounded-3xl overflow-hidden">
        <Loader class="w-full h-full grid place-items-center" />
    </AspectRatio>

    <AspectRatio v-else :ratio="16 / 9" class="bg-muted rounded-3xl overflow-hidden">
        <ClassroomVideoPlayer :activeSectionStatus="activeSection?.status!" @updateTimestamp="updateTimestamp" @videoEnded="videoEnded"
            :timestamp="User?.video_timestamp!" :options="options" />
    </AspectRatio>



    <nav class="mt-5" v-if="showNav">
        <Button v-if="videoData?.next_section_id !== videoData?.section_id" @click="next()">Next Section</Button>
        <!-- <NuxtLink v-else :to="module?.quiz_url" target="_blank"> -->
        <Button v-else @click="nextModule()" class="w-full">
            <Icon class="text-xl mr-2" name="solar:question-square-line-duotone" />
            Take Quiz
        </Button>
        <!-- </NuxtLink> -->
    </nav>

    <section class="mt-8 overflow-y-auto">
        <Tabs default-value="overview" class="w-full min-h-screen overflow-y-auto">
            <TabsList>
                <TabsTrigger value="overview"> Overview </TabsTrigger>
                <TabsTrigger value="resources"> Resources </TabsTrigger>
                <TabsTrigger value="questions"> Questions </TabsTrigger>
            </TabsList>

            <TabsContent class="min-h-screen overflow-y-auto" value="overview">
                <ClassroomOverview />
            </TabsContent>

            <TabsContent value="resources">
                <ClassroomResources />
            </TabsContent>

            <TabsContent value="questions">
                <ClassroomQuestions />
            </TabsContent>
        </Tabs>
    </section>
</template>
