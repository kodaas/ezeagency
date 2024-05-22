<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const form = ref({
    email: "",
    password: "",
});

const supabase = useSupabaseClient();
const user = useSupabaseUser();

async function Login() {
    const { error } = await supabase.auth.signInWithPassword({
        email: form.value.email,
        password: form.value.password,
    });

    console.log(error);
}

async function Logout() {
    const { error } = await supabase.auth.signOut();
    if (error) console.log(error);
}

onMounted(() => {
    watchEffect(() => {
        if (user.value) console.log(user.value);
    });
});
</script>

<template>
    <div
        class="w-full lg:grid lg:min-h-screen lg:grid-cols-2 2xl:min-h-[800px]"
    >
        <div class="hidden bg-muted lg:block">
            <img
                src="https://placehold.co/600x400"
                alt="Image"
                width="1920"
                height="1080"
                class="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
        </div>
        <div class="flex items-center justify-center py-12">
            <div class="mx-auto grid w-[350px] gap-6">
                <div class="grid gap-2 text-center">
                    <h1 class="text-3xl font-bold">
                        Login
                        <Icon
                            name="solar:star-fall-minimalistic-2-line-duotone"
                        />
                    </h1>
                    <p class="text-balance text-muted-foreground">
                        Enter your email below to login to your account
                    </p>
                </div>
                <form @submit.prevent="Login()" class="grid gap-4">
                    <div class="grid gap-2">
                        <Label for="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            v-model="form.email"
                            required
                        />
                    </div>
                    <div class="grid gap-2">
                        <div class="flex items-center">
                            <Label for="password">Password</Label>
                        </div>
                        <Input
                            id="password"
                            v-model="form.password"
                            type="password"
                            required
                        />

                        <a
                            href="/forgot-password"
                            class="ml-auto inline-block text-sm underline"
                        >
                            Forgot your password?
                        </a>
                    </div>
                    <Button type="submit" class="w-full"> Login </Button>
                </form>
                <Button
                    @click="Logout()"
                    type="button"
                    variant="outline"
                    class="w-full"
                >
                    Log Out
                </Button>
                <div class="mt-4 text-center text-sm">
                    Don't have an account?
                    <a href="#" class="underline"> Sign up </a>
                </div>
            </div>
        </div>
    </div>
</template>
