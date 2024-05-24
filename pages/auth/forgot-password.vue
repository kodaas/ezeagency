<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
definePageMeta({
    layout: 'auth',
})
</script>

<template>

    <Card class="w-full max-w-sm">
        <CardHeader>
            <CardTitle class="text-2xl">
                Forgot Password
            </CardTitle>
            <CardDescription>
                Enter your email below to recover to your account.
            </CardDescription>
        </CardHeader>
        <CardContent class="grid gap-4">
            <div class="grid gap-2">
                <Label for="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" required />
            </div>
        </CardContent>
        <CardFooter class="grid gap-1">
            <Button class="w-full">
                Submit
            </Button>
            <div class="mt-4 text-center text-sm">
                Don't have an account?
                <NuxtLink to="/auth/signup" class="underline">
                    Sign up
                </NuxtLink>
            </div>
        </CardFooter>
    </Card>

</template>