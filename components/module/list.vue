<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ClassroomModuleDto } from "~/models";
const props = defineProps<{
  modules: Array<ClassroomModuleDto>;
  active: string;
  activeSection: string;
}>();


const activeModule = computed(() => {
  return props.modules.find((module) => module.id === props.active);
});

const pending = computed(() => {
  return props.modules.filter((module) => (module.id !== props.active && module.index > activeModule.value?.index!));
});

const newCompleted = computed(() => {
  if (props.active || props.activeSection) return props.modules.filter((module) => module.id !== props.active && module.index < activeModule.value?.index!);
  else return props.modules
})

</script>

<template>
  <Tabs :default-value="props.active ||  props.active !== null ? 'pending' : 'completed'" class="w-full">
    <TabsList>
      <TabsTrigger value="pending"> Pending </TabsTrigger>
      <TabsTrigger value="completed"> Completed </TabsTrigger>
    </TabsList>

    <TabsContent class="w-full" value="pending">
      <div v-if="props.modules.length === 0 || !props.active || !props.activeSection" class="p-16 text-center space-y-2">
        <Empty class="w-52 mx-auto" />
        <p>😥 No Module Found</p>
      </div>

      <div class="flex flex-col gap-5 mt-3">
        <ModuleItem v-if="activeModule" :key="activeModule.id" status="active" :active-section="activeSection" v-bind="activeModule" />

        <ModuleItem  v-for="module in pending" :key="module.id" status="pending" :active-section="activeSection" v-bind="module" />
      </div>
    </TabsContent>

    <TabsContent value="completed">

      <div v-if="newCompleted.length === 0" class="p-16 text-center space-y-2">
        <Empty class="w-52 mx-auto" />
        <p>😥 No Completed Module Found</p>
      </div>

      <div v-else class="flex flex-col w-full gap-5 mt-3">
        <ModuleItem v-for="module in newCompleted" :key="module.id" status="completed" :active-section="activeSection" v-bind="module" />
      </div>

    </TabsContent>
  </Tabs>
</template>
