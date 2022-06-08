export type LessonFormType = {
  onTitleChange: (e: any) => void;
  title: string;
  onTextChange: (e: any) => void;
  text: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};
