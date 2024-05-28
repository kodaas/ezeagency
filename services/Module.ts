import { useToast } from "@/components/ui/toast/use-toast";
import type { ClassroomModuleDto } from "~/models";
const { toast } = useToast();

const Modules = useState("Modules", () => null);

const getModules = async (): Promise<Array<ClassroomModuleDto> | null> => {
  if (Modules.value) {
    return Modules.value;
  }

  const supabase = useSupabaseClient();
  try {
    const { data, error } = await supabase.from("Class Module").select("*").order('index', { ascending: true });

    if (error) {
      throw error;
    }

    Modules.value = data as any;
    return Modules.value;

  } catch (error: any) {
    toast({
      title: "Error",
      description: error.message,
      variant: "destructive",
    });

    return null;
  }
};

const getModule = async (module_id: string): Promise<ClassroomModuleDto | null> => {
  if (Modules.value) {
    // @ts-ignore
    return Modules.value.find((module) => module.id === module_id);
  }

  const supabase = useSupabaseClient();
  try {
    const { data, error } = await supabase
      .from("Class Module")
      .select("*")
      .eq("id", module_id)
      .single();

    if (error) {
      throw error;
    }
    return data;
  } catch (error: any) {
    toast({
      title: "Error",
      description: error.message,
      variant: "destructive",
    });

    return null;
  }
};

const getNextModule = async (module_id: string): Promise<ClassroomModuleDto | null> => {
  const supabase = useSupabaseClient();
  try {
    const modules = await getModules();

    if (!modules) {
      return null;
    }

    const activeModule = modules.find((module) => module.id === module_id);

    const nextModule = modules.find((module) => module.index === (activeModule?.index! + 1))

    if (!nextModule) {
      return null;
    }

    return nextModule

  } catch (error: any) {
    toast({
      title: "Error",
      description: error.message,
      variant: "destructive",
    });

    return null;
  }
}

export const ModuleService = () => {
  return {
    getModules,
    getModule,
    getNextModule
  };
};
