import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Toast, ToastState, AddToastPayload } from "@/types/component.types";

const initialState: ToastState = {
  toasts: [],
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    addToast: (state, action: PayloadAction<AddToastPayload>) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const toast: Toast = {
        id,
        variant: "default",
        duration: 5000,
        ...action.payload,
      };
      state.toasts.push(toast);
    },

    removeToast: (state, action: PayloadAction<string>) => {
      state.toasts = state.toasts.filter((toast) => toast.id !== action.payload);
    },

    clearAllToasts: (state) => {
      state.toasts = [];
    },
  },
});

export const { addToast, removeToast, clearAllToasts } = toastSlice.actions;

// Selectors
export const selectToasts = (state: { toast: ToastState }) => state.toast.toasts;

export default toastSlice.reducer;
