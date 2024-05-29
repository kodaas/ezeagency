// @ts-nocheck
const User = useState<any>("User", () => null);

const supabase = useSupabaseClient();
const user = useSupabaseUser();

export const useUser = () => {
  return {
    async getUser() {
      // if (User.value) {
      //   return User.value;
      // }

      // if (!user.value) {
      //   return null;
      // }

      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.value.id)
        .single();

      if (error) {
        return null;
      }

      User.value = data;
      return data;
    },

    async updateCompletedModule(moduleId: string) {
      if (!user.value || !User.value) {
        return null;
      }

      const { data, error } = await supabase
        .from("users")
        .update({
          completed_modules: [...User.value.completed_modules, moduleId],
        })
        .eq("id", user.value.id);

      if (error) {
        return null;
      }

      return data;
    },
  };
};
