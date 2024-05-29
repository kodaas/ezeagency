<script setup lang="ts">
import {
    CircleUser,
    File,
    Home,
    LineChart,
    ListFilter,
    MoreHorizontal,
    Package,
    Package2,
    PanelLeft,
    PlusCircle,
    Search,
    Settings,
    ShoppingCart,
    Users2,
} from "lucide-vue-next";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
</script>

<template>
    <div class="flex min-h-screen w-full flex-col bg-muted/40">
        <div class="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
            <main
                class="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8"
            >
                <Tabs default-value="all">
                    <div class="flex items-center">
                        <TabsList>
                            <TabsTrigger value="all"> All </TabsTrigger>
                            <TabsTrigger value="active"> Active </TabsTrigger>
                            <TabsTrigger value="draft"> Draft </TabsTrigger>
                            <TabsTrigger
                                value="archived"
                                class="hidden sm:flex"
                            >
                                Archived
                            </TabsTrigger>
                        </TabsList>
                        <div class="ml-auto flex items-center gap-2"></div>
                    </div>
                    <TabsContent value="all">
                        <Card>
                            <CardHeader>
                                <CardTitle>Users</CardTitle>
                                <CardDescription>
                                    Manage your users and view their progress
                                    and performance.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead
                                                class="hidden w-[100px] sm:table-cell"
                                            >
                                                <span class="sr-only">img</span>
                                            </TableHead>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead
                                                class="hidden md:table-cell"
                                            >
                                                Price
                                            </TableHead>
                                            <TableHead
                                                class="hidden md:table-cell"
                                            >
                                                Total Sales
                                            </TableHead>
                                            <TableHead
                                                class="hidden md:table-cell"
                                            >
                                                Created at
                                            </TableHead>
                                            <TableHead>
                                                <span class="sr-only"
                                                    >Actions</span
                                                >
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow class="cursor-pointer">
                                            <TableCell
                                                class="hidden sm:table-cell"
                                            >
                                                <div
                                                    class="w-16 rounded-2xl overflow-hidden inline-block"
                                                >
                                                    <img
                                                        class="w-full"
                                                        :src="`https://ui-avatars.com/api/?name=${user?.user_metadata.first_name}+${user?.user_metadata.last_name}&background=877D7D&color=fff&size=30`"
                                                        alt="Profile"
                                                    />
                                                </div>
                                            </TableCell>
                                            <TableCell
                                                @click="
                                                    navigateTo(
                                                        '/admin/users/test',
                                                    )
                                                "
                                                class="font-medium"
                                            >
                                                Laser Lemonade Machine
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline">
                                                    Draft
                                                </Badge>
                                            </TableCell>
                                            <TableCell
                                                class="hidden md:table-cell"
                                            >
                                                $499.99
                                            </TableCell>
                                            <TableCell
                                                class="hidden md:table-cell"
                                            >
                                                25
                                            </TableCell>
                                            <TableCell
                                                class="hidden md:table-cell"
                                            >
                                                2023-07-12 10:42 AM
                                            </TableCell>
                                            <TableCell>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger
                                                        as-child
                                                    >
                                                        <Button
                                                            aria-haspopup="true"
                                                            size="icon"
                                                            variant="ghost"
                                                        >
                                                            <MoreHorizontal
                                                                class="h-4 w-4"
                                                            />
                                                            <span
                                                                class="sr-only"
                                                                >Toggle
                                                                menu</span
                                                            >
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent
                                                        align="end"
                                                    >
                                                        <DropdownMenuLabel
                                                            >Actions</DropdownMenuLabel
                                                        >
                                                        <DropdownMenuItem
                                                            >Edit</DropdownMenuItem
                                                        >
                                                        <DropdownMenuItem
                                                            >Delete</DropdownMenuItem
                                                        >
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </CardContent>
                            <CardFooter>
                                <div class="text-xs text-muted-foreground">
                                    Showing <strong>1-10</strong> of
                                    <strong>32</strong>
                                    products
                                </div>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    </div>
</template>
