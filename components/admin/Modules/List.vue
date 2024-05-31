<script setup lang="ts">
import { Progress } from "@/components/ui/progress";
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
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Roles, type MetaDataDto } from "~/models";
import { useToast } from "@/components/ui/toast/use-toast";

const props = defineProps<{
    modules: ClassroomModuleDto[];
}>();

const isLoading = ref(false);
const { toast } = useToast();
const supabase = useSupabaseClient();
</script>

<template>
    <Card>
        <CardHeader>
            <CardTitle>Modules</CardTitle>
            <CardDescription> Manage course modules here. </CardDescription>
        </CardHeader>
        <CardContent>
            {{ modules }}
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
                            Insurance Advantages and Disadvantages
                        </TableCell>
                        <TableCell>
                            <Badge variant="success"> available </Badge>
                        </TableCell>
                        <TableCell class="hidden md:table-cell">
                            4m 5s
                        </TableCell>
                        <TableCell class="hidden md:table-cell">
                            <Anchor
                                target="_blank"
                                href="https://www.typeform.com/quizzes/"
                            >
                                https://www.typeform.com/quizzes/
                            </Anchor>
                        </TableCell>
                        <TableCell class="hidden md:table-cell"> 4 </TableCell>
                        <TableCell>
                            <Button
                                variant="outline"
                                @click="navigateTo('/admin/modules/test')"
                            >
                                <Icon
                                    class="text-lg mr-3"
                                    name="solar:pen-new-square-line-duotone"
                                />
                                Edit
                            </Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </CardContent>
    </Card>
</template>
