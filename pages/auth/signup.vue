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
import { Roles } from "@/models";

definePageMeta({
    layout: "auth",
});

const supabase = useSupabaseClient();
const { toast } = useToast();

const isLoading = ref(false);
const form = ref({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
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

    // Create Supabase Auth Account
    const { error: Autherror } = await supabase.auth.signUp({
        email: form.value.email,
        password: form.value.password,

        options: {
            data: {
                first_name: form.value.firstName,
                phone: form.value.phone,
                last_name: form.value.lastName,
                role: Roles.USER,
            },
        },
    });

    if (Autherror) {
        toast({
            title: "Error creating account",
            description: Autherror.message,
            variant: "destructive",
        });

        isLoading.value = false;
        return;
    }

    const { data, error } = await supabase.from("User").insert([{
        first_name: form.value.firstName,
        last_name: form.value.lastName,
        email: form.value.email,
        phone: form.value.phone,
        role: Roles.USER
    }]).select();

    if (error) {
        toast({
            title: "Error creating account",
            description: error.message,
            variant: "destructive",
        });
        isLoading.value = false;
        return;
    }

    console.log(data);

    toast({
        title: "Account created",
        description: "Your account has been created successfully",
        variant: "success",
    });

    navigateTo("/");

    isLoading.value = false;
};
</script>

<template>
    <Card class="mx-auto max-w-sm">
        <CardHeader>
            <CardTitle class="text-xl"> Sign Up </CardTitle>
            <CardDescription>
                Enter your information to create an account
            </CardDescription>
        </CardHeader>
        <CardContent>
            <form @submit.prevent="onSubmit" class="grid gap-4">
                <div class="grid grid-cols-2 gap-4">
                    <div class="grid gap-2">
                        <Label for="first-name">First name</Label>
                        <Input
                            v-model="form.firstName"
                            :disabled="isLoading"
                            id="first-name"
                            placeholder="Max"
                            required
                        />
                    </div>
                    <div class="grid gap-2">
                        <Label for="last-name">Last name</Label>
                        <Input
                            v-model="form.lastName"
                            :disabled="isLoading"
                            id="last-name"
                            placeholder="Robinson"
                            required
                        />
                    </div>
                </div>
                <div class="grid gap-2">
                    <Label for="email">Email</Label>
                    <Input
                        v-model="form.email"
                        :disabled="isLoading"
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                    />
                </div>
                <div class="grid gap-2">
                    <Label for="phone">Phone Number</Label>
                    <Input
                        v-model="form.phone"
                        :disabled="isLoading"
                        id="phone"
                        type="text"
                        placeholder="07012345678"
                        required
                    />
                </div>
                <div class="grid gap-2">
                    <Label for="password">Password</Label>
                    <Input
                        v-model="form.password"
                        :disabled="isLoading"
                        id="password"
                        type="password"
                        placeholder="****"
                        required
                    />
                </div>
                <Button :disabled="isLoading" type="submit" class="w-full">
                    <Icon v-if="isLoading" name="svg-spinners:ring-resize" />
                    <p v-else>Create an account</p>
                </Button>
            </form>
            <div class="mt-4 text-center text-sm">
                Already have an account?
                <NuxtLink v-if="!isLoading" to="/auth/login" class="underline">
                    Sign in
                </NuxtLink>
            </div>
        </CardContent>
    </Card>
</template>
