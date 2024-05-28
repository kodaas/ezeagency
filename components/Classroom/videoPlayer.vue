<script setup lang="ts">
import videojs from "video.js";
import "video.js/dist/video-js.css";
import { useIntervalFn } from '@vueuse/core'


const props = defineProps<{
    options: any,
    timestamp: number
    section_id: string,
    active_section?: string,
}>();

const emit = defineEmits(["videoEnded"]);

const player = ref<any>(null);
const videoPlayerRef = ref<any>(null);
const currentTime = ref<number>(632);
const isPlayerDirty = ref<boolean>(false);

const InitializePlayer = () => {
    player.value = videojs(videoPlayerRef.value, props.options, () => {
        player.value.log("onPlayerReady", this);
    });

    const { pause } = useIntervalFn(() => {
        currentTime.value = player.value.currentTime();
    }, 5000)

    player.value.on("ended", (e: any) => {
        pause();
        emit("videoEnded", currentTime.value);
    })

    player.value.on("seeking", (e: any) => {
        e.preventDefault();

        if (player.value.currentTime() > currentTime.value)
            player.value.currentTime(currentTime.value);
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
