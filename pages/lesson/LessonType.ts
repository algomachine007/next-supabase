type LessonType<T> = {
  created_at: T;
  id: number;
  text: T;
  title: T;
};

export type LessonData = { data: LessonType<string>[] };
