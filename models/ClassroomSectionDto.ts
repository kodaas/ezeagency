export interface ClassroomSectionDto {
  id: string;
  index: number;
  title: string;
  status: number; // 0 - pending, 1 - current , 2 - done
  module: string;
}
