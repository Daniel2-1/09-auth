import { FormValues } from "@/types/note";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Props {
  draft: FormValues;
  setDraft: (note: FormValues) => void;
  clearDraft: () => void;
}

const initialDraft: FormValues = {
  title: "",
  content: "",
  tag: "Todo",
};

export const useNoteDraft = create<Props>()(
    persist(
        (set) => ({
            draft: initialDraft,
            setDraft: (newDraftNote: FormValues) =>set(() => ({draft: newDraftNote})),
            clearDraft: () => set(()=>({draft:initialDraft}))
        }),
        {
            name: "note-draft",
            partialize: (state) => ({draft: state.draft})
        }
    )
)


