import { useToast } from "@/components/ui/toast/use-toast";
import type { ClassroomSectionDto } from "~/models";
const { toast } = useToast()


const getSections = async (module_id: string): Promise<Array<ClassroomSectionDto> | null> => {
    const supabase = useSupabaseClient();
    try {

        const { data, error } = await supabase.from("Sections").select("*").eq("class_module", module_id).order('index', { ascending: true });

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

const getSection = async (section_id: string): Promise<ClassroomSectionDto | null> => {
    const supabase = useSupabaseClient();
    try {

        const { data, error } = await supabase.from("Sections").select("*").eq("id", section_id).single();

        if (error) {
            throw error
        }

        return data
    }
    catch (error: any) {
        toast({
            title: "Error",
            description: error.message,
            variant: "destructive",
        });

        return null;
    }
}

export const SectionService = () => {
    return {
        getSections,
        getSection
    }
}