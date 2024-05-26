<template>
    <div
        @click="download()"
        class="flex items-center space-x-4 rounded-md border p-4 cursor-pointer hover:scale-105 active:scale-100 transition-all ease-in-out"
    >
        <Icon class="text-gray-500 text-2xl" :name="iconName" />

        <div class="flex-1 space-y-1">
            <p class="text-sm font-medium leading-none trim">{{ fileName }}</p>
            <p class="text-sm text-muted-foreground">
                {{ fileSize }}
            </p>
        </div>

        <Icon v-if="pending" class="text-xl" name="svg-spinners:ring-resize" />
        <Icon
            v-else
            class="text-gray-500 text-2xl"
            name="solar:download-minimalistic-broken"
        />
    </div>
</template>

<script setup lang="ts">
import { useToast } from "@/components/ui/toast/use-toast";
const { toast } = useToast();
const supabase = useSupabaseClient();
const route = useRoute();
const pending = ref(false);

const props = defineProps({
    document: {
        type: Object,
        required: true,
    },
});

const iconName = computed(() => {
    const mimetype = props.document.metadata.mimetype;
    if (mimetype.startsWith("image/")) {
        return "vscode-icons:file-type-image";
    } else if (mimetype.startsWith("text/")) {
        return "vscode-icons:default-file";
    } else if (mimetype.startsWith("application/pdf")) {
        return "vscode-icons:file-type-pdf2";
    } else if (mimetype.startsWith("application/msword")) {
        return "vscode-icons:file-type-word";
    } else if (
        mimetype.startsWith(
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        )
    ) {
        return "vscode-icons:file-type-word";
    } else if (mimetype.startsWith("application/vnd.ms-excel")) {
        return "vscode-icons:file-type-excel";
    } else if (
        mimetype.startsWith(
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        )
    ) {
        return "vscode-icons:file-type-excel";
    } else if (mimetype.startsWith("application/vnd.ms-powerpoint")) {
        return "vscode-icons:file-type-powerpoint2";
    } else if (
        mimetype.startsWith(
            "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        )
    ) {
        return "vscode-icons:file-type-powerpoint2";
    } else {
        return "vscode-icons:default-file";
    }
});

const fileName = computed(() => props.document.name);

const fileSize = computed(() => {
    const sizeInMB = props.document.metadata.size / (1024 * 1024);
    return sizeInMB.toFixed(2) + " MB";
});

const download = async () => {
    if (pending.value) {
        return false;
    }

    pending.value = true;

    const { data, error } = await supabase.storage
        .from("Resources")
        .download(`${route.params.section as string}/${props.document.name}`);

    if (error) {
        toast({
            title: "Error",
            description: error.message,
            variant: "destructive",
        });

        pending.value = false;
        return false;
    }

    const blob = new Blob([data], { type: "application/octet-stream" });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = props.document.name;

    a.click();

    URL.revokeObjectURL(url);

    toast({
        title: "Succes",
        description: "File downloaded successfully!",
        variant: "success",
    });

    pending.value = false;
};
</script>
