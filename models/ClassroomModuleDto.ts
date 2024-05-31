export interface ClassroomModuleDto {
  id: string;
  created_at: Date;
  title: string;
  duration: number;
  index: number;
  quiz_url: string;
  number_of_sections: number;
  section_id: string
  module_status: "available" | "draft" | "unavailable";
}