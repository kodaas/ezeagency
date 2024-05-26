import { useToast } from "@/components/ui/toast/use-toast";
const { toast } = useToast()


const getModules = async () => {
    const supabase = useSupabaseClient();
    try {

        const { data, error } = await supabase.from("Class Module").select("*");
        
        if (error) {
            throw error
        }
        return data

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
        getModules
    }
}