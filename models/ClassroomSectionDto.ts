export interface ClassroomSectionDto {
  id: string;
  created_at: string; // ISO 8601 date-time format
  video_id: string;
  title: string;
  index: number;
  class_module: string;
  status?: "pending" | "active" | "completed";
}
