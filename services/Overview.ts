import { useToast } from "@/components/ui/toast/use-toast";
const { toast } = useToast();

const getOverview = async (section_id: string): Promise<any | null> => {
  const supabase = useSupabaseClient();
  try {
    const { data, error } = await supabase
      .from("Overview")
      .select("*")
      .eq("section_id", section_id)
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

export const OverviewService = () => {
  return {
    getOverview,
  };
};
