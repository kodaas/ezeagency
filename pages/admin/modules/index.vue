<script setup lang="ts">
import { PlusCircle } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const { data: modules, pending } = await useLazyAsyncData("Modules", () =>
  ModuleService().getModules()
);

// const availableModules = computed(() => modules.value?.filter(module => module.module_status === 'available'))
// const unAvailableModules = computed(() => modules.value?.filter(module => module.module_status === 'unavailable'))
// const draftModules = computed(() => modules.value?.filter(module => module.module_status === 'draft'))
</script>

<template>
  <div class="flex min-h-screen w-full flex-col bg-muted/40">
    <div class="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
      <main class="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <Tabs default-value="all">
          <div class="flex items-center">
            <TabsList>
              <TabsTrigger value="all"> All </TabsTrigger>
              <TabsTrigger value="draft"> Draft </TabsTrigger>
              <TabsTrigger value="available"> Available </TabsTrigger>
              <TabsTrigger value="unavailable"> Unavailable </TabsTrigger>
            </TabsList>
            <div class="ml-auto flex items-center gap-2">
              <Button size="sm" class="h-7 gap-1">
                <PlusCircle class="h-3.5 w-3.5" />
                <span class="sm:not-sr-only sm:whitespace-nowrap">
                  Create Module
                </span>
              </Button>
            </div>
          </div>
          <TabsContent value="all">
            <div class="w-full p-5" v-if="pending">
              <Loader />
            </div>
            <AdminModulesList :modules="modules!" />
          </TabsContent>

          <TabsContent value="available">
            <div class="w-full p-5" v-if="pending">
              <Loader />
            </div>
            <!-- <AdminModulesList :modules="availableModules!" /> -->
          </TabsContent>

          <TabsContent value="draft">
            <div class="w-full p-5" v-if="pending">
              <Loader />
            </div>
            <!-- <AdminModulesList :modules="draftModules!" /> -->
          </TabsContent>

          <TabsContent value="unavailable">
            <div class="w-full p-5" v-if="pending">
              <Loader />
            </div>
            <!-- <AdminModulesList :modules="unAvailableModules!" /> -->
          </TabsContent>
        </Tabs>
      </main>
    </div>
  </div>
</template>
