
import axios from "axios";
import { NewNote, Note } from "../../types/note";
import { User } from "@/types/user";
import { nextServer } from "./api";
axios.defaults.baseURL = "https://notehub-public.goit.study/api";
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}




export const fetchNotes = async (
  page: number,
  query: string,
  tag?: string | undefined
): Promise<NotesResponse> => {
  const response = await nextServer.get<NotesResponse>("/notes", {
    params: {
      page,
      perPage: 12,
      search: query,
      tag
    },
    // headers: {
    //   Authorization: `Bearer ${TOKEN}`,
    // },
  });
  return response.data;
};

export const createNote = async (newNote: NewNote) => {
  const response = await axios.post<Note>("/notes", newNote, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  return response.data;
};

export const deleteNote = async (noteId: string) => {
  const response = await axios.delete<Note>(`/notes/${noteId}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  return response.data;
};

export const fetchNoteById = async (noteId: string) => {
  const response = await axios.get<Note>(`/notes/${noteId}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  return response.data;
};

export type RegisterRequest = {
  email: string;
  password: string;
  username: string;
};

export const register = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>("/auth/register", data);
  return res.data;
};


export type LoginRequest = {
  email: string;
  password: string;
};

export const login = async (data: LoginRequest) => {
  const res = await nextServer.post<User>("/auth/login", data);
  return res.data;
};

interface CheckSessionRequest {
  success: boolean;
}

export const checkSession = async () => {
  const res = await nextServer.get<CheckSessionRequest>("/auth/session");
  return res.data.success;
};
export const getMe = async () => {
  const { data } = await nextServer.get<User>("/users/me");
  return data;
};
export const logout = async (): Promise<void> => {
  await nextServer.post("/auth/logout");
};

export type UpdateRequest = {
  username: string;
};
export const updateMe = async (data: UpdateRequest) => {
  const res = await nextServer.patch<User>("/users/me", data);
  return res.data;
};

export { nextServer };
