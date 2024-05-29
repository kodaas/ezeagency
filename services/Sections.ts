import { useToast } from "@/components/ui/toast/use-toast";
import type { ClassroomSectionDto, MetaDataDto } from "~/models";
const { toast } = useToast()

const Sections = useState("Section", () => null);

const {data: User, execute: executeUser} = useAsyncData("User", () => MetaDataService().getMetaData(), {immediate: false})

const getSections = async (module_id: string): Promise<Array<ClassroomSectionDto> | null> => {
    if (Sections.value) {
        return Sections.value
    }

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
        
        console.log("User: ", User.value)

        const temp: Array<ClassroomSectionDto> =  JSON.parse(JSON.stringify(data))

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

        Sections.value = formatted as any

        console.log("Section Service: ",Sections.value)
        return Sections.value

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

    if (Sections.value) {
        // @ts-ignore
        return Sections.value.find((section) => section.id === section_id);
    }
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