<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ClassroomModuleDto } from "~/models";
const props = defineProps<{
  completed: Array<any>;
  modules: Array<ClassroomModuleDto>;
  active: string;
  activeSection: string;
}>();

const pending = computed(() => {
  return props.modules.filter((module) => module.id !== props.active);
});

const activeModule = computed(() => {
  return props.modules.find((module) => module.id === props.active);
});
</script>

<template>
  <!-- {{ props.completed }} {{ pending }} {{ activeModule }} -->
  <Tabs default-value="pending" class="w-full">
    <TabsList>
      <TabsTrigger value="pending"> Pending </TabsTrigger>
      <TabsTrigger value="completed"> Completed </TabsTrigger>
    </TabsList>

    <TabsContent class="w-full" value="pending">
      <div v-if="props.modules.length === 0" class="p-16 text-center space-y-2">
        <Empty class="w-52 mx-auto" />
        <p>😥 No Module Found</p>
      </div>

      <div class="flex flex-col gap-5 mt-3">
        <ModuleItem v-if="activeModule" :key="activeModule.id" :module="activeModule" :id="activeModule.id"
          :index="activeModule.index" :title="activeModule.title" :numberOfSections="activeModule.number_of_sections"
          status="active" :activeSection="props.activeSection" :totalDuration="activeModule.duration" />

        <ModuleItem v-for="module in pending" :key="module.id" :module="module" :id="module.id" :index="module.index"
          :title="module.title" :numberOfSections="module.number_of_sections" status="pending"
          :totalDuration="module.duration" />
      </div>
    </TabsContent>

    <TabsContent value="completed">

      <div v-if="props.completed.length === 0" class="p-16 text-center space-y-2">
        <Empty class="w-52 mx-auto" />
        <p>😥 No Completed Module Found</p>
      </div>

      <div v-else class="flex flex-col w-full gap-5 mt-3">
        <ModuleItem v-for="module in pending" :key="module.id" :module="module" :id="module.id" :index="module.index"
          :title="module.title" :numberOfSections="module.number_of_sections" status="completed"
          :totalDuration="module.duration" />
      </div>

    </TabsContent>
  </Tabs>
</template>
