import { useToast } from "@/components/ui/toast/use-toast";
import type { ClassroomModuleDto } from "~/models";
const { toast } = useToast();

const getModules = async () => {
  const supabase = useSupabaseClient();
  try {
    const { data, error } = await supabase.from("Class Module").select("*").order('index', { ascending: true });

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

const getModule = async (module_id: string): Promise<ClassroomModuleDto | null> => {
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

export const ModuleService = () => {
  return {
    getModules,
    getModule,
  };
};
