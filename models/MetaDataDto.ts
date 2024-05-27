export interface MetaDataDto {
    active_module: string;
    active_section: string;
    completed_modules: string[]; // Assuming it's an array of strings (module IDs)
    created_at: string; // ISO 8601 date-time format
    id: string;
    progress: number;
    video_timestamp: number;
    number_of_questions: number;
    number_of_certificate: number;
}