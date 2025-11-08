export interface Note {
  id: string;
  title: string;
  content: string;
  tag: string;
  createdAt: string;
  updatedAt: string;
}

export interface NewNote {
  content: string;
  title: string;
  tag: string;
}


export interface FormValues {
  title: string;
  content: string;
  tag: string;
}