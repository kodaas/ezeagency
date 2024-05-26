<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/toast/use-toast";

definePageMeta({
    layout: "auth",
});

const supabase = useSupabaseClient();
const { toast } = useToast();

const isLoading = ref(false);
const form = ref({
    email: "redasay1@qiradio.com",
    password: "12345678",
});

const onSubmit = async () => {
    const emailRegex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!emailRegex.test(form.value.email)) {
        toast({
            title: "Invalid email",
            description: "Please enter a valid email address",
            variant: "warning",
        });
        return;
    }

    isLoading.value = true;

    const {
        error,
        data: { user },
    } = await supabase.auth.signInWithPassword({
        email: form.value.email,
        password: form.value.password,
    });

    if (error) {
        toast({
            title: "Error",
            description: error.message,
            variant: "destructive",
        });

        isLoading.value = false;
        return;
    }

    toast({
        title: "Success",
        description: "You have been logged in",
        variant: "success",
    });

    navigateTo("/");

    isLoading.value = false;
};
</script>

<template>
    <Card class="mx-auto max-w-sm">
        <CardHeader>
            <CardTitle class="text-2xl"> Login </CardTitle>
            <CardDescription>
                Enter your email below to login to your account
            </CardDescription>
        </CardHeader>
        <CardContent>
            <form @submit.prevent="onSubmit" class="grid gap-4">
                <div class="grid gap-2">
                    <Label for="email">Email</Label>
                    <Input
                        :disabled="isLoading"
                        v-model="form.email"
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                    />
                </div>
                <div class="grid gap-2">
                    <div class="flex items-center">
                        <Label for="password">Password</Label>
                    </div>
                    <Input
                        :disabled="isLoading"
                        v-model="form.password"
                        id="password"
                        type="password"
                        required
                    />
                    <NuxtLink
                        v-if="!isLoading"
                        to="/auth/forgot-password"
                        class="ml-auto inline-block text-sm underline"
                    >
                        Forgot your password?
                    </NuxtLink>
                </div>
                <Button :disable="isLoading" type="submit" class="w-full">
                    <Icon v-if="isLoading" name="svg-spinners:ring-resize" />
                    <p v-else>Login</p>
                </Button>
            </form>
            <div class="mt-4 text-center text-sm">
                Don't have an account?
                <NuxtLink v-if="!isLoading" to="/auth/signup" class="underline">
                    Sign up
                </NuxtLink>
            </div>
        </CardContent>
    </Card>
</template>
