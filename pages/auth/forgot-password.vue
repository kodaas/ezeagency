<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
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
    email: "redasay886@qiradio.com",
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

    const { error } = await supabase.auth.resetPasswordForEmail(
        form.value.email,
    );

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
        description: "Password reset link has been sent to your email",
        variant: "success",
    });

    navigateTo("/reset-email");
    isLoading.value = false;
};
</script>

<template>
    <Card class="w-full max-w-sm">
        <CardHeader>
            <CardTitle class="text-2xl"> Forgot Password </CardTitle>
            <CardDescription>
                Enter your email below to recover to your account.
            </CardDescription>
        </CardHeader>
        <CardContent class="grid gap-4">
            <div class="grid gap-2">
                <Label for="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                />
            </div>
        </CardContent>
        <CardFooter class="grid gap-1">
            <Button class="w-full"> Submit </Button>
            <div class="mt-4 text-center text-sm">
                Don't have an account?
                <NuxtLink to="/auth/signup" class="underline">
                    Sign up
                </NuxtLink>
            </div>
        </CardFooter>
    </Card>
</template>
