<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

</script>

<template>
    <Tabs default-value="pending" class="w-full">
        <TabsList>
            <TabsTrigger value="pending">
                Pending
            </TabsTrigger>
            <TabsTrigger value="completed">
                Completed
            </TabsTrigger>
        </TabsList>

        <TabsContent class="w-full" value="pending">
            <div class="flex flex-col gap-5 mt-3">
                <ModuleItem />
                <ModuleItem />
            </div>
        </TabsContent>

        <TabsContent value="completed">
            <div class="flex flex-col w-full gap-5 mt-3">
                <ModuleItem />
                <ModuleItem />
                <ModuleItem />
                <ModuleItem />
            </div>
        </TabsContent>
    </Tabs>


</template>