<script setup lang="ts">
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "@/components/ui/tooltip";
import { Roles, type MetaDataDto } from "~/models";

const props = defineProps<{
    users: MetaDataDto[]
}>()

const newUsers = computed(() => props.users.filter(user => user.role !== Roles.ADMIN))
</script>

<template>
    <Card>
        <CardHeader>
            <CardTitle>Users</CardTitle>
            <CardDescription>
                Manage your users and view their progress and performance.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <div v-if="!newUsers || newUsers.length === 0">
                <Empty class="w-52 mx-auto" />
                <p class="text-center">😥 No User Found</p>
            </div>
            <Table v-else>
                <TableHeader>
                    <TableRow>
                        <TableHead class="hidden w-[100px] sm:table-cell">
                            <span class="sr-only">img</span>
                        </TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead class="hidden md:table-cell">
                            Phone
                        </TableHead>
                        <TableHead class="hidden md:table-cell">
                            Status
                        </TableHead>
                        <TableHead class="hidden md:table-cell">
                            Approve
                        </TableHead>
                        <TableHead>
                            <span class="sr-only">Actions</span>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow v-for="user in newUsers" :key="user.id">
                        <TableCell class="hidden sm:table-cell">
                            <div class="w-16 rounded-2xl overflow-hidden inline-block">
                                <img class="w-full"
                                    :src="`https://ui-avatars.com/api/?name=${user.first_name}+${user.last_name}&background=877D7D&color=fff&size=100`"
                                    alt="Profile" />
                            </div>
                        </TableCell>
                        <TableCell class="font-medium"> {{ user.first_name }} {{ user.last_name }} </TableCell>
                        <TableCell class="hover:underline">
                            <a :href="`mailto:${user.email}`" class="text-blue-700">{{ user.email }}</a>
                        </TableCell>
                        <TableCell class="hidden md:table-cell">
                            {{ user.phone }}
                        </TableCell>
                        <TableCell class="hidden md:table-cell">
                            <Badge v-if="user.is_active" variant="success" class="ml-auto sm:ml-0">
                                approved
                            </Badge>
                            <Badge v-else variant="warning" class="ml-auto sm:ml-0">
                                unapproved
                            </Badge>
                        </TableCell>
                        <TableCell class="hidden md:table-cell">
                            <Button size="sm"> Approve Account </Button>
                        </TableCell>
                        <TableCell>
                            <Button variant="outline" @click="navigateTo(`/admin/users/${user.id}`)">
                                <Icon class="text-lg mr-3" name="solar:pen-new-square-line-duotone" /> Edit
                            </Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </CardContent>
    </Card>
</template>