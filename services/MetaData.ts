import type { MetaDataDto } from "~/models";
import { useToast } from "@/components/ui/toast/use-toast";
const { toast } = useToast()

const MetaData = useState("MetaData", () => null);

const getMetaData = async (): Promise<MetaDataDto | null> => {

    if (MetaData.value) {
        return MetaData.value;
    }

    const supabase = useSupabaseClient();
    const user = useSupabaseUser();

    try {

        if (!user.value) {
            return null;
        }

        const { data, error } = await supabase
            .from("User")
            .select("*")
            .eq("id", user.value.id)
            .single();

        if (error) {
            throw error
        }

        MetaData.value = data
        return MetaData.value

    } catch (error: any) {
        toast({
            title: "Error",
            description: error.message,
            variant: "destructive",
        });

        return null;
    }
}

const updateMetaData = async (update: any): Promise<MetaDataDto | null> => {

    const supabase = useSupabaseClient();
    const user = useSupabaseUser();

    if (!user.value) {
        return null;
    }

    try {
        // @ts-ignore
        const { data, error } = await supabase.from("User").update(update).eq("id", user.value.id).single()

        if (error) {
            throw error
        }

        MetaData.value = data
        return MetaData.value

    } catch (error: any) {
        toast({
            title: "Error",
            description: error.message,
            variant: "destructive",
        });

        return null
    }
}

const getAllMetaData = async (): Promise<MetaDataDto[] | null> => {

    const supabase = useSupabaseClient();
    const user = useSupabaseUser();

    // @ts-ignore
    if (!user.value && user.value?.role === "admin") {
        return null;
    }

    try {
        const { data, error } = await supabase
            .from("User")
            .select("*");

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

        return null
    }

}

export const MetaDataService = () => {
    return {
        getMetaData,
        updateMetaData,
        getAllMetaData
    }
}