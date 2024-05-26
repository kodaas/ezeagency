import { useToast } from "@/components/ui/toast/use-toast";
const { toast } = useToast();

const getResource = async (section_id: string) => {
  const supabase = useSupabaseClient();

  console.log("section_id", section_id);

  try {
    const { data, error } = await supabase.storage
      .from("Resources")
      .list(section_id);

    if (error) {
      throw error;
    }

    console.log(data);
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

export const ResourceService = () => {
  return {
    getResource,
  };
};
