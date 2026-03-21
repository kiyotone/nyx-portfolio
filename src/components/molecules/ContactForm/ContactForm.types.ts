export interface ContactFormProps {
  onSubmit: (data: ContactFormData) => void;
  className?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}
