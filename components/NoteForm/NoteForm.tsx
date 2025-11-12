"use client";

import css from "./NoteForm.module.css";
// import * as Yup from "yup";
import { ChangeEvent, useId } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "../../lib/api/clientApi";
import { FormValues, NewNote } from "../../types/note";
import { useRouter } from "next/navigation";
import { useNoteDraft } from "@/lib/store/noteStore";

// const DisplayingErrorMessagesSchema = Yup.object().shape({
//   title: Yup.string()
//     .min(3, "Too Short!")
//     .max(50, "Too Long!")
//     .required("Required"),
//   content: Yup.string().max(500, "Too Long"),
//   tag: Yup.string()
//     .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"])
//     .required("Required"),
// });



export default function NoteForm() {
  const isId = useId();
  const queryClient = useQueryClient();
  const router = useRouter();
  const { draft, setDraft, clearDraft} = useNoteDraft();

  const handleClose = () => router.push("/notes/filter/all");

  const { mutate: addNote, isPending } = useMutation({
    mutationFn: (contentText: NewNote) => createNote(contentText),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });
      router.push("/notes/filter/all");
      clearDraft()
    },
  });

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) => {
    const { name, value} = e.target;
    setDraft({...draft,[name]: value})
  }

  const handleSubmitTwo = (formData: FormData) => {
    const data = Object.fromEntries(formData) as unknown as FormValues;
    addNote({ content: data.content, title: data.title, tag: data.tag });
  };

  return (
    <>
      <form className={css.form} action={handleSubmitTwo}>
        <div className={css.formGroup}>
          <label htmlFor={`${isId}-title`}>Title</label>
          <input
            id={`${isId}-title`}
            type="text"
            name="title"
            className={css.input}
            onChange={handleChange}
            defaultValue={draft.title}
            required
          />
          {/* <ErrorMessage name="title" component="p" className={css.error} /> */}
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${isId}-content`}>Content</label>
          <textarea
            id={`${isId}-content`}
            name="content"
            rows={8}
            className={css.textarea}
            onChange={handleChange}
            defaultValue={draft.content}
          />
          {/* <ErrorMessage name="content" component="p" className={css.error} /> */}
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${isId}-tag`}>Tag</label>
          <select
            id={`${isId}-tag`}
            name="tag"
            className={css.select}
            onChange={handleChange}
            defaultValue={draft.tag}
          >
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </select>
          {/* <ErrorMessage name="tag" component="p" className={css.error} /> */}
        </div>

        <div className={css.actions}>
          <button
            onClick={handleClose}
            type="button"
            className={css.cancelButton}
          >
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={false}>
            {isPending ? "Creating.." : "Create note"}
          </button>
        </div>
      </form>
    </>
  );
}


