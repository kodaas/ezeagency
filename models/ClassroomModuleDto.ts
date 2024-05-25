import type { ClassroomSectionDto } from "./ClassroomSectionDto";

export interface ClassroomModuleDto {
  id: string;
  
  overview: {
    title: string;
    description: string;
  };
  
  progress: number; // Progress in percentage
  video: {
    src: string;
    poster: string;
  };
  
  sections: [ClassroomSectionDto];
}