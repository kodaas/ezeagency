<script setup lang="ts">
import videojs from "video.js";
import "video.js/dist/video-js.css";

const props = defineProps<{
    options: object;
}>();

const player = ref<any>(null);
const videoPlayerRef = ref<any>(null);
const currentTime = ref<number>(2);

const InitializePlayer = () => {
    player.value = videojs(videoPlayerRef.value, props.options, () => {
        player.value.log("onPlayerReady", this);
        player.value.currentTime(currentTime.value);
    });

    player.value.on("seeking", (e: any) => {
        e.preventDefault();

        // if (player.value.currentTime() > currentTime.value)
        //     player.value.currentTime(currentTime.value);
    });

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
    <section class="w-full h-full">
        <video class="video-js w-full h-full" ref="videoPlayerRef"></video>
    </section>
</template>
