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
} from 'lucide-vue-next'
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
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { ClassroomModuleDto, MetaDataDto } from '~/models';
import { useToast } from "@/components/ui/toast/use-toast";

const route = useRoute();
const { toast } = useToast();
const isLoading = ref(false);
const supabase = useSupabaseClient();
const userData = ref<MetaDataDto | null>(null)
const modules = ref<ClassroomModuleDto[] | null>(null)



const getUser = async () => {
  const { data, error } = await supabase.from("User").select("*").eq("id", route.params.id).single();

  if (error) {
    toast({
      title: "Error",
      description: "User Not Found",
      variant: "destructive",
    })

    navigateTo('/admin/users')
    return
  } else {
    userData.value = data as MetaDataDto
  }
}

const getModules = async () => {
  const { data, error } = await supabase.from("Class Module").select("*").order('index', { ascending: true });

  if (error) {
    console.log(error);
  }

  type Modules = ClassroomModuleDto & { status: string }

  const response = data as Modules[]

  const activeModule = response?.find((module) => module.id === userData.value?.active_module)

  let temp;

  if (!activeModule) {
    
    temp = response.map((module) => {
      return {
        ...module,
        status: "completed",
      }
    })

  } else {

    temp = response?.map((module) => {
      return {
        ...module,
        status: activeModule?.id! === module.id ? "active" : activeModule?.index! > module.index ? "completed" : "pending",
      }
    })
  }

  modules.value = temp
}

const updateUser = async (update: any) => {
  isLoading.value = true
  const { error } = await supabase.from("User").update(update).eq("id", route.params.id);

  if (error) {
    console.log(error);
    toast({
      title: "Error",
      description: "User Not Updated",
      variant: "destructive",
    })
    isLoading.value = false
    return
  }

  toast({
    title: "Success",
    description: "User Updated",
    variant: "success",
  });

  reloadNuxtApp({force: true})
  isLoading.value = false
}

const deleteUser = async () => {
  isLoading.value = true

  const { data, error: deleteError } = await useFetch(`/api/user/${route.params.id}`, {
    method: "DELETE",
  })


  if (deleteError.value) {
    console.log(deleteError.value);
    toast({
      title: "Error",
      description: "User Not Deleted",
      variant: "destructive",
    })
    isLoading.value = false
    return
  }

  console.log(data)

  const { error } = await supabase.from("User").delete().eq("id", route.params.id);

  if (error) {
    console.log(error);
    toast({
      title: "Error",
      description: "User Not Deleted",
      variant: "destructive",
    })
    isLoading.value = false
    return
  }

  toast({
    title: "Success",
    description: "User Deleted",
    variant: "success",
  });

  navigateTo('/admin/users')
  isLoading.value = false
}

onMounted(async () => {
  isLoading.value = true
  await getUser()
  await getModules()
  isLoading.value = false
})
</script>

<template>
  <Loading v-if="isLoading" />
  <div v-else class="flex min-h-screen w-full flex-col bg-muted/40">
    <div class="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
      <main class="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div class="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
          <div class="flex items-center gap-4">
            <Button @click="navigateTo('/admin/users')" variant="outline" size="icon" class="h-7 w-7">
              <ChevronLeft class="h-4 w-4" />
              <span class="sr-only">Back</span>
            </Button>
            <h1 class="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
              {{ userData?.first_name }} {{ userData?.last_name }}
            </h1>
            <Badge v-if="userData?.is_active" variant="success" class="ml-auto sm:ml-0">
              active
            </Badge>
            <Badge v-else variant="warning" class="ml-auto sm:ml-0">
              inactive
            </Badge>
            <div class="hidden items-center gap-2 md:ml-auto md:flex">
              <Button @click="updateUser({ is_active: false })" v-if="userData?.is_active" variant="destructive"
                size="sm">
                <Icon v-if="isLoading" name="svg-spinners:ring-resize" />

                <p v-if="!isLoading">Deactivate Account</p>
              </Button>

              <Button @click="updateUser({ is_active: true })" v-else size="sm">
                <Icon v-if="isLoading" name="svg-spinners:ring-resize" />

                <p v-if="!isLoading">Activate Account</p>
              </Button>
            </div>
          </div>
          <div class="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
            <div class="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>{{ userData?.first_name }}'s Details</CardTitle>
                  <CardDescription>
                    View and manage users details
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div class="flow-root">
                    <dl class="-my-3 divide-y divide-gray-100 text-sm">
                      <div class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                        <dt class="font-medium text-gray-900">Name</dt>
                        <dd class="text-gray-700 sm:col-span-2">{{ userData?.first_name }} {{ userData?.last_name }}
                        </dd>
                      </div>

                      <div class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                        <dt class="font-medium text-gray-900">Email</dt>
                        <dd class="text-gray-700 sm:col-span-2">
                          <Anchor target="_blank" :href="`mailto:${userData?.email}`">{{ userData?.email }}</Anchor>
                        </dd>
                      </div>

                      <div class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                        <dt class="font-medium text-gray-900">Phone</dt>
                        <dd class="text-gray-700 sm:col-span-2">{{ userData?.phone }}</dd>
                      </div>

                      <div class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                        <dt class="font-medium text-gray-900">Number of Questions</dt>
                        <dd class="text-gray-700 sm:col-span-2">{{ userData?.number_of_questions }}</dd>
                      </div>

                      <div class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                        <dt class="font-medium text-gray-900">Number of Certificate</dt>
                        <dd class="text-gray-700 sm:col-span-2">{{ userData?.number_of_certificate }}</dd>
                      </div>

                      <div class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                        <dt class="font-medium text-gray-900">Number of Completed Module</dt>
                        <dd class="text-gray-700 sm:col-span-2">{{ userData?.number_of_certificate }}</dd>
                      </div>

                      <div class="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                        <dt class="font-medium text-gray-900">Created at</dt>
                        <dd class="text-gray-700 sm:col-span-2">{{ userData?.created_at }}</dd>
                      </div>
                    </dl>
                  </div>
                </CardContent>
              </Card>
              <div class="items-center gap-2 mx-auto flex md:hidden">
                <Button @click="updateUser({ is_active: false })" v-if="userData?.is_active" variant="destructive"
                  size="sm">
                  <Icon v-if="isLoading" name="svg-spinners:ring-resize" />

                  <p v-if="!isLoading">Deactivate Account</p>
                </Button>

                <Button @click="updateUser({ is_active: true })" v-else size="sm">
                  <Icon v-if="isLoading" name="svg-spinners:ring-resize" />

                  <p v-if="!isLoading">Activate Account</p>
                </Button>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle>Modules</CardTitle>
                  <CardDescription>
                    Manage all module taken by {{ userData?.first_name }}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead class="w-[250px]"> Module Title </TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Progress</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow v-for="module in modules" :key="module.id">
                        <TableCell @click="navigateTo(`/admin/modules/${module.id}`)" class="font-semibold cursor-pointer hover:text-blue-700 hover:underline group transition-all ease-in-out">
                          {{ module.title }} <Icon class="text-lg text-transparent group-hover:text-blue-700 transition-all ease-in-out" name="solar:arrow-right-up-broken" />
                        </TableCell>
                        <TableCell>
                          <Badge v-if="module.status === 'active'" variant="info"> active </Badge>
                          <Badge v-if="module.status === 'completed'" variant="success"> completed </Badge>
                          <Badge v-if="module.status === 'pending'" variant="warning"> pending </Badge>
                        </TableCell>
                        <TableCell>
                          <Progress v-if="module.status === 'active'" :model-value="userData?.active_module_progress" />
                          <p v-else-if="module.status === 'completed'"> 100% </p>
                          <p v-else> 0% </p>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
            <div class="grid auto-rows-max items-start gap-4 lg:gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>{{ userData?.first_name }}'s Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div class="grid gap-6">
                    <div class="grid gap-3">
                      <Label for="status">{{ userData?.progress }}%</Label>
                      <Progress :model-value="userData?.progress" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card class="overflow-hidden">
                <CardHeader>
                  <CardTitle>{{ userData?.first_name }}'s Certificates</CardTitle>
                  <CardDescription>
                    certificate earned by John
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div class="grid gap-2">
                    <img alt="Product image" class="aspect-square w-full rounded-md object-cover" height="300"
                      src="https://placehold.co/600x400" width="300" />
                    <div class="grid grid-cols-3 gap-2">
                      <button>
                        <img alt="Product image" class="aspect-square w-full rounded-md object-cover" height="84"
                          src="https://placehold.co/600x400" width="84" />
                      </button>
                      <button>
                        <img alt="Product image" class="aspect-square w-full rounded-md object-cover" height="84"
                          src="https://placehold.co/600x400" width="84" />
                      </button>
                      <button>
                        <img alt="Product image" class="aspect-square w-full rounded-md object-cover" height="84"
                          src="https://placehold.co/600x400" width="84" />
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card class="border-destructive bg-red-100/10">
                <CardHeader>
                  <CardTitle>Manage Account</CardTitle>
                  <CardDescription class="text-destructive">
                    Note: If you delete a user you can not recover it back
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div />

                  <Dialog>
                    <DialogTrigger>
                      <Button size="sm" variant="destructive">
                        <p>Delete {{ userData?.first_name }}'s Account</p>
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Are you sure absolutely sure?</DialogTitle>
                        <DialogDescription>
                          This action cannot be undone. This will permanently
                          delete your {{ userData?.first_name }}'s and remove {{ userData?.first_name }}'s data from the
                          servers.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <DialogClose>
                          <Button size="sm" variant="outline"> Cancel </Button>
                        </DialogClose>
                        <Button @click="deleteUser()" size="sm" variant="destructive">
                          <Icon v-if="isLoading" name="svg-spinners:ring-resize" />

                          <p v-if="!isLoading">Delete Account</p>
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
