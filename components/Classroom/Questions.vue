<script setup lang="ts">
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer'
import { useMediaQuery } from '@vueuse/core'

const isTablet = useMediaQuery('(max-width: 768px)')
</script>

<template>
    <section class="px-0 py-5 lg:p-5 space-y-5">
        <nav class="flex justify-between items-center">
            <h1 class="font-medium text-2xl max-w-md">Questions</h1>

            <Dialog v-if="!isTablet">
                <DialogTrigger>
                    <Button variant="outline">
                        <Icon name="solar:add-square-line-duotone" class="text-xl mr-2" /> Ask Question
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you sure absolutely sure?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently delete your account
                            and remove your data from our servers.
                        </DialogDescription>
                        <DialogClose>
                            <Button variant="destructive">Close</Button>
                        </DialogClose>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

            <Drawer v-else>
                <DrawerTrigger>
                    <Button variant="outline">
                        <Icon name="solar:add-square-line-duotone" class="text-xl mr-2" /> Ask Question
                    </Button>
                </DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                        <DrawerDescription>This action cannot be undone.</DrawerDescription>
                    </DrawerHeader>
                    <DrawerFooter>
                        <Button>Submit</Button>
                        <DrawerClose>
                            <Button variant="outline">
                                Cancel
                            </Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>

        </nav>
    </section>
</template>