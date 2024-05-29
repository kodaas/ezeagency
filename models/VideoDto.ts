export interface VideoDto {
  id: string;
  created_at: string; // ISO 8601 date-time format
  src: string; // URL of the video source
  poster: string; // URL of the poster image
  duration: number; // Duration in milliseconds
  title: string; // Title of the video
  format: string; // Format of the video
  section_id: string; // ID of the related section
  next_section_id: string; // ID of the next section
}
