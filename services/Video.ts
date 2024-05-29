import { useToast } from "@/components/ui/toast/use-toast";
import type { VideoDto } from "~/models";
const { toast } = useToast();

const getVideo = async (section_id: string): Promise<VideoDto | null> => {
  const supabase = useSupabaseClient();
  try {
    const { data, error } = await supabase
      .from("Video")
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

export const VideoService = () => {
  return {
    getVideo,
  };
};
