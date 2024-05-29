<script setup lang="ts">
import {
    Activity,
    ArrowUpRight,
    CircleUser,
    CreditCard,
    DollarSign,
    Menu,
    Package2,
    Search,
    Users,
} from "lucide-vue-next";

import { Button } from "@/components/ui/button";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { useToast } from "@/components/ui/toast/use-toast";

definePageMeta({
    layout: false,
});

const pending = ref(true);
const { toast } = useToast();
const isLoading = ref(false);

const { data: User, execute: executeUser } = useLazyAsyncData(
    "User",
    () => MetaDataService().getMetaData(),
    { immediate: false },
);

const user = useSupabaseUser();
const supabase = useSupabaseClient();

const logout = async () => {
    isLoading.value = true;
    const { error } = await supabase.auth.signOut();

    if (error) {
        isLoading.value = false;
        return;
    }

    isLoading.value = false;
    toast({
        title: "Success",
        description: "You have been logged out",
        variant: "success",
    });

    navigateTo("/auth/login");
    window.location.reload();
};

onMounted(async () => {
    pending.value = true;
    await executeUser();
    pending.value = false;
});
</script>

<template>
    <div
        class="w-full h-screen grid place-items-center place-content-center"
        v-if="pending"
    >
        <Logo class="w-32 animate-pulse" />
        <Loader />
    </div>
    <div v-else class="flex min-h-screen w-full flex-col">
        <header
            class="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6"
        >
            <nav
                class="hidden text-muted-foreground flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6"
            >
                <a
                    href="#"
                    class="flex items-center gap-2 text-lg font-semibold md:text-base"
                >
                    <div class="w-8">
                        <Logo class="w-full" />
                    </div>
                    <span class="sr-only">Acme Inc</span>
                </a>
                <NuxtLink
                    to="/admin"
                    activeClass="text-foreground"
                    class="hover:text-foreground"
                >
                    Dashboard
                </NuxtLink>

                <NuxtLink
                    to="/admin/users"
                    activeClass="text-foreground"
                    class="hover:text-foreground"
                >
                    Users
                </NuxtLink>

                <NuxtLink
                    to="/admin/settings"
                    activeClass="text-foreground"
                    class="hover:text-foreground"
                >
                    Settings
                </NuxtLink>
            </nav>
            <Sheet>
                <SheetTrigger as-child>
                    <Button
                        variant="outline"
                        size="icon"
                        class="shrink-0 md:hidden"
                    >
                        <Menu class="h-5 w-5" />
                        <span class="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <nav
                        class="grid text-muted-foreground gap-6 text-lg font-medium"
                    >
                        <a
                            href="#"
                            class="flex items-center gap-2 text-lg font-semibold"
                        >
                            <Package2 class="h-6 w-6" />
                            <span class="sr-only">Acme Inc</span>
                        </a>
                        <NuxtLink
                            to="/admin"
                            activeClass="text-foreground"
                            class="hover:text-foreground"
                        >
                            Dashboard
                        </NuxtLink>

                        <NuxtLink
                            to="/admin/users"
                            activeClass="text-foreground"
                            class="hover:text-foreground"
                        >
                            Users
                        </NuxtLink>

                        <NuxtLink
                            to="/admin/settings"
                            activeClass="text-foreground"
                            class="hover:text-foreground"
                        >
                            Settings
                        </NuxtLink>
                    </nav>
                </SheetContent>
            </Sheet>
            <div
                class="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4"
            >
                <form class="ml-auto flex-1 sm:flex-initial">
                    <!-- <div class="relative">
                        <Search
                            class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"
                        />
                        <Input
                            type="search"
                            placeholder="Search products..."
                            class="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                        />
                    </div> -->
                </form>
                <DropdownMenu>
                    <DropdownMenuTrigger as-child>
                        <Button
                            variant="secondary"
                            size="icon"
                            class="rounded-full"
                        >
                            <div
                                class="w-20 rounded-2xl overflow-hidden inline-block"
                            >
                                <img
                                    class="w-full"
                                    :src="`https://ui-avatars.com/api/?name=${user?.user_metadata.first_name}+${user?.user_metadata.last_name}&background=877D7D&color=fff&size=30`"
                                    alt="Profile"
                                />
                            </div>
                            <span class="sr-only">Toggle user menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <NuxtLink to="/admin/settings">Settings</NuxtLink>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            ><Button
                                :disabled="isLoading"
                                @click="logout"
                                variant="outline"
                                class="space-x-2 bg-transparent"
                            >
                                <Icon
                                    v-if="isLoading"
                                    name="svg-spinners:ring-resize"
                                />

                                <Icon
                                    v-if="!isLoading"
                                    class="text-lg"
                                    name="solar:logout-3-line-duotone"
                                />
                                <p v-if="!isLoading">Logout</p>
                            </Button>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>

        <NuxtPage />
    </div>
</template>
