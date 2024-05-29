<script setup lang="ts">
import videojs from "video.js";
import "video.js/dist/video-js.css";
import { useIntervalFn } from '@vueuse/core'
import { useToast } from "@/components/ui/toast/use-toast";
const { toast } = useToast()


const props = defineProps<{
    options: any,
    timestamp: number
    activeSectionStatus: 'pending' | 'active' | 'completed',
}>();

const emit = defineEmits(["videoEnded","updateTimestamp"]);

const player = ref<any>(null);
const videoPlayerRef = ref<any>(null);
const currentTime = ref<number>(632);
const isPlayerDirty = ref<boolean>(false);

const InitializePlayer = () => {
    player.value = videojs(videoPlayerRef.value, props.options, () => {
        player.value.log("onPlayerReady", this);
    });

    const { pause } = useIntervalFn(() => {
        emit("updateTimestamp", player.value.currentTime());
        currentTime.value = player.value.currentTime();
    }, 5000)

    player.value.on("ended", (e: any) => {
        pause();
        emit("videoEnded", currentTime.value);
    })

    player.value.on("seeking", (e: any) => {
        e.preventDefault();

        console.log(props.activeSectionStatus)

        if (player.value.currentTime() > currentTime.value && props.activeSectionStatus !== "completed"){
            player.value.currentTime(currentTime.value);
            toast({
                title: "Opps! 🤭, You can't skip,",
                description: "You have to fully complete this section",
                variant: "info",
            })
        }
    });

    player.value.on("play", (e: any) => {
        if (!isPlayerDirty.value) {
            player.value.currentTime(currentTime.value);
            isPlayerDirty.value = true;
        }
    })

    player.value.titleBar.update({
        title: "Section 3: Advantages",
    });
};

onMounted(() => {
    InitializePlayer();
});

onBeforeUnmount(() => {
    if (player.value) {
        player.value.log(player.value.currentTime());
        player.value.dispose();
    }
});
</script>

<template>
    <section class="shadow-md w-full overflow-hidden">
        <video class="video-js shadow-md w-full h-full" id="my-video" ref="videoPlayerRef"></video>
    </section>
</template>
