<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const { data: users, pending } = await useLazyAsyncData("users", () => MetaDataService().getAllMetaData())

const activeUsers = computed(() => users.value?.filter((user) => user.is_active));
const pendingUsers = computed(() => users.value?.filter((user) => !user.is_active));

</script>

<template>
    <div class="flex min-h-screen w-full flex-col bg-muted/40">
        <div class="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
            <main class="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                <Tabs default-value="all">
                    <div class="flex items-center">
                        <TabsList>
                            <TabsTrigger value="all"> All </TabsTrigger>
                            <TabsTrigger value="active"> Active </TabsTrigger>
                            <TabsTrigger value="inactive"> InActive </TabsTrigger>
                        </TabsList>
                        <div class="ml-auto flex items-center gap-2">
                            <Button @click="reloadNuxtApp()" class="h-7 gap-1">
                                <Icon name="solar:restart-line-duotone"/>
                                <span
                                    class="sm:not-sr-only sm:whitespace-nowrap"
                                >
                                    Refresh
                                </span>
                            </Button>
                        </div>
                    </div>

                    <TabsContent value="all">
                        <div class="w-full p-5" v-if="pending">
                            <Loader />
                        </div>
                        <AdminUsersList v-else :users="users" />
                    </TabsContent>

                    <TabsContent value="active">
                        <div class="w-full p-5" v-if="pending">
                            <Loader />
                        </div>
                        <AdminUsersList v-else :users="activeUsers" />
                    </TabsContent>

                    <TabsContent value="inactive">
                        <div class="w-full h-screen p-5" v-if="pending">
                            <Loader />
                        </div>
                        <AdminUsersList v-else :users="pendingUsers" />
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    </div>
</template>
