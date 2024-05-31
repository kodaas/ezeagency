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
            <main class="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                <Tabs default-value="all">
                    <div class="flex items-center">
                        <TabsList>
                            <TabsTrigger value="all"> All </TabsTrigger>
                            <TabsTrigger value="active"> Available </TabsTrigger>
                            <TabsTrigger value="draft"> Draft </TabsTrigger>
                            <TabsTrigger value="archived" class="hidden sm:flex">
                                Unavailable
                            </TabsTrigger>
                        </TabsList>
                        <div class="ml-auto flex items-center gap-2">
                            <Button size="sm" class="h-7 gap-1">
                                <PlusCircle class="h-3.5 w-3.5" />
                                <span class="sm:not-sr-only sm:whitespace-nowrap">
                                    Create Module
                                </span>
                            </Button>
                        </div>
                    </div>
                    <TabsContent value="all">
                        <Card>
                            <CardHeader>
                                <CardTitle>Modules</CardTitle>
                                <CardDescription>
                                    Manage course modules here.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Index</TableHead>
                                            <TableHead>Title</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead class="hidden md:table-cell">
                                                Duration
                                            </TableHead>
                                            <TableHead class="hidden md:table-cell">
                                                Quiz Url
                                            </TableHead>
                                            <TableHead class="hidden md:table-cell">
                                                Number of Sections
                                            </TableHead>
                                            <TableHead>
                                                <span class="sr-only">Actions</span>
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell> # 1 </TableCell>
                                            <TableCell class="font-medium">
                                                Insurance Advantages and
                                                Disadvantages
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="success">
                                                    available
                                                </Badge>
                                            </TableCell>
                                            <TableCell class="hidden md:table-cell">
                                                4m 5s
                                            </TableCell>
                                            <TableCell class="hidden md:table-cell">
                                                <Anchor target="_blank" href="https://www.typeform.com/quizzes/">
                                                    https://www.typeform.com/quizzes/
                                                </Anchor>
                                            </TableCell>
                                            <TableCell class="hidden md:table-cell">
                                                4
                                            </TableCell>
                                            <TableCell>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger as-child>
                                                        <Button aria-haspopup="true" size="icon" variant="ghost">
                                                            <MoreHorizontal class="h-4 w-4" />
                                                            <span class="sr-only">Toggle
                                                                menu</span>
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                        <DropdownMenuItem @click="
                                                            navigateTo(
                                                                '/admin/modules/test',
                                                            )
                                                            ">Edit</DropdownMenuItem>
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
