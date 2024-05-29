import { useToast } from "@/components/ui/toast/use-toast";
import type { ClassroomSectionDto } from "~/models";
const { toast } = useToast()

const { data: User, execute: executeUser } = useAsyncData("User", () => MetaDataService().getMetaData(), { immediate: false })

const getSections = async (module_id: string): Promise<Array<ClassroomSectionDto> | null> => {

    await executeUser()

    if (!User.value) {
        return null
    }

    const supabase = useSupabaseClient();
    try {

        const { data, error } = await supabase.from("Sections").select("*").eq("class_module", module_id).order('index', { ascending: true });

        if (error) {
            throw error
        }


        const temp: Array<ClassroomSectionDto> = JSON.parse(JSON.stringify(data))

        const activeSection = temp?.find(
            (section) => section.id === User.value?.active_section
        );

        const formatted = temp?.map((section) => {
            section.status =
                activeSection?.id! === section.id
                    ? "active"
                    : activeSection?.index! > section.index
                        ? "completed"
                        : "pending";
            return section;
        });

        // console.log(formatted)

        return formatted

    } catch (error: any) {
        toast({
            title: "Error",
            description: error.message,
            variant: "destructive",
        });

        return null;
    }
}

const getSection = async (module_id: string, section_id: string): Promise<ClassroomSectionDto | null> => {
    const supabase = useSupabaseClient();
    try {

        const sections = await getSections(module_id)

        if (!sections) {
            return null
        }

        const activeSection = sections?.find(
            (section) => section.id === User.value?.active_section
        );

        const data = sections?.find(
            (section) => section.id === section_id
        );

        // @ts-ignore
        data.status =
            activeSection?.id! === data?.id
                ? "active"
                : activeSection?.index! > data?.index!
                    ? "completed"
                    : "pending";

        return data!
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