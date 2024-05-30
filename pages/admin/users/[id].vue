<script setup lang="ts">
import {
    ChevronLeft,
    CircleUser,
    Home,
    LineChart,
    Package,
    Package2,
    PanelLeft,
    PlusCircle,
    Search,
    Settings,
    ShoppingCart,
    Upload,
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
import { Progress } from "@/components/ui/progress";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
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
                <div
                    class="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4"
                >
                    <div class="flex items-center gap-4">
                        <Button
                            @click="navigateTo('/admin/users')"
                            variant="outline"
                            size="icon"
                            class="h-7 w-7"
                        >
                            <ChevronLeft class="h-4 w-4" />
                            <span class="sr-only">Back</span>
                        </Button>
                        <h1
                            class="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0"
                        >
                            John Doe
                        </h1>
                        <!-- <Badge variant="success" class="ml-auto sm:ml-0">
                            active
                        </Badge> -->
                        <Badge variant="warning" class="ml-auto sm:ml-0">
                            unapproved
                        </Badge>
                        <div
                            class="hidden items-center gap-2 md:ml-auto md:flex"
                        >
                            <!-- <Button variant="destructive" size="sm">
                                Disapprove Account
                            </Button> -->

                            <Button size="sm"> Approve Account </Button>
                        </div>
                    </div>
                    <div
                        class="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8"
                    >
                        <div
                            class="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8"
                        >
                            <Card>
                                <CardHeader>
                                    <CardTitle>John's Details</CardTitle>
                                    <CardDescription>
                                        Lipsum dolor sit amet, consectetur
                                        adipiscing elit
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div class="flow-root">
                                        <dl
                                            class="-my-3 divide-y divide-gray-100 text-sm"
                                        >
                                            <div
                                                class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4"
                                            >
                                                <dt
                                                    class="font-medium text-gray-900"
                                                >
                                                    Title
                                                </dt>
                                                <dd
                                                    class="text-gray-700 sm:col-span-2"
                                                >
                                                    Mr
                                                </dd>
                                            </div>

                                            <div
                                                class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4"
                                            >
                                                <dt
                                                    class="font-medium text-gray-900"
                                                >
                                                    Name
                                                </dt>
                                                <dd
                                                    class="text-gray-700 sm:col-span-2"
                                                >
                                                    John Frusciante
                                                </dd>
                                            </div>

                                            <div
                                                class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4"
                                            >
                                                <dt
                                                    class="font-medium text-gray-900"
                                                >
                                                    Occupation
                                                </dt>
                                                <dd
                                                    class="text-gray-700 sm:col-span-2"
                                                >
                                                    Guitarist
                                                </dd>
                                            </div>

                                            <div
                                                class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4"
                                            >
                                                <dt
                                                    class="font-medium text-gray-900"
                                                >
                                                    Salary
                                                </dt>
                                                <dd
                                                    class="text-gray-700 sm:col-span-2"
                                                >
                                                    $1,000,000+
                                                </dd>
                                            </div>

                                            <div
                                                class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4"
                                            >
                                                <dt
                                                    class="font-medium text-gray-900"
                                                >
                                                    Bio
                                                </dt>
                                                <dd
                                                    class="text-gray-700 sm:col-span-2"
                                                >
                                                    Lorem ipsum dolor, sit amet
                                                    consectetur adipisicing
                                                    elit. Et facilis debitis
                                                    explicabo doloremque impedit
                                                    nesciunt dolorem facere,
                                                    dolor quasi veritatis quia
                                                    fugit aperiam aspernatur
                                                    neque molestiae labore
                                                    aliquam soluta architecto?
                                                </dd>
                                            </div>
                                        </dl>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Modules</CardTitle>
                                    <CardDescription>
                                        Lipsum dolor sit amet, consectetur
                                        adipiscing elit
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead class="w-[250px]">
                                                    Module Title
                                                </TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead>Progress</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell
                                                    class="font-semibold"
                                                >
                                                    Introduction to Insurance
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="info">
                                                        active
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <Progress
                                                        :model-value="33"
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </div>
                        <div
                            class="grid auto-rows-max items-start gap-4 lg:gap-8"
                        >
                            <Card>
                                <CardHeader>
                                    <CardTitle>John's Progress</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div class="grid gap-6">
                                        <div class="grid gap-3">
                                            <Label for="status">50%</Label>
                                            <Progress :model-value="50" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card class="overflow-hidden">
                                <CardHeader>
                                    <CardTitle>John's Certificates</CardTitle>
                                    <CardDescription>
                                        certificate earned by John
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div class="grid gap-2">
                                        <img
                                            alt="Product image"
                                            class="aspect-square w-full rounded-md object-cover"
                                            height="300"
                                            src="https://placehold.co/600x400"
                                            width="300"
                                        />
                                        <div class="grid grid-cols-3 gap-2">
                                            <button>
                                                <img
                                                    alt="Product image"
                                                    class="aspect-square w-full rounded-md object-cover"
                                                    height="84"
                                                    src="https://placehold.co/600x400"
                                                    width="84"
                                                />
                                            </button>
                                            <button>
                                                <img
                                                    alt="Product image"
                                                    class="aspect-square w-full rounded-md object-cover"
                                                    height="84"
                                                    src="https://placehold.co/600x400"
                                                    width="84"
                                                />
                                            </button>
                                            <button>
                                                <img
                                                    alt="Product image"
                                                    class="aspect-square w-full rounded-md object-cover"
                                                    height="84"
                                                    src="https://placehold.co/600x400"
                                                    width="84"
                                                />
                                            </button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card class="border-destructive bg-red-100/10">
                                <CardHeader>
                                    <CardTitle>Manage Account</CardTitle>
                                    <CardDescription class="text-destructive">
                                        Note: If you delete a user you can not
                                        recover it back
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div />

                                    <Dialog>
                                        <DialogTrigger>
                                            <Button
                                                size="sm"
                                                variant="destructive"
                                            >
                                                <p>Delete John's Account</p>
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle
                                                    >Are you sure absolutely
                                                    sure?</DialogTitle
                                                >
                                                <DialogDescription>
                                                    This action cannot be
                                                    undone. This will
                                                    permanently delete your
                                                    John's and remove john's
                                                    data from the servers.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <DialogFooter>
                                                <DialogClose>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                    >
                                                        Cancel
                                                    </Button>
                                                </DialogClose>
                                                <Button
                                                    size="sm"
                                                    variant="destructive"
                                                >
                                                    Delete
                                                </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                    <div
                        class="flex items-center justify-center gap-2 md:hidden"
                    >
                        <Button variant="outline" size="sm"> Discard </Button>
                        <Button size="sm"> Save Product </Button>
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>
