import { z } from "zod";

export const applicationSchema = z
  .object({
    firstName: z.string().min(1, "Nome obbligatorio"),
    lastName: z.string().min(1, "Cognome obbligatorio"),
    email: z.string().email("Inserisci un'email valida"),
    password: z.string().min(8, "La password deve contenere almeno 8 caratteri"),
    confirmPassword: z.string().min(8, "Conferma la password"),
    whatsapp: z.string().min(1, "Numero WhatsApp obbligatorio"),
    birthDate: z.string().min(1, "Data di nascita obbligatoria"),
    currentWork: z.string().min(1, "Lavoro attuale o studi attuali obbligatori"),
    dream: z.string().min(20, "Descrivi il tuo sogno con almeno 20 caratteri"),
    expectedIncome: z.string().min(1, "Guadagno annuale netto atteso obbligatorio"),
    motivation: z.string().min(50, "La motivazione deve contenere almeno 50 caratteri"),
    commitment: z.coerce.number().min(1, "Impegno minimo 1").max(10, "Impegno massimo 10"),
    privacyAccepted: z.literal(true, { errorMap: () => ({ message: "Devi accettare la Privacy" }) }),
    regulationAccepted: z.literal(true, { errorMap: () => ({ message: "Devi accettare il Regolamento" }) })
  })
  .refine((value) => value.password === value.confirmPassword, {
    message: "Le password non coincidono",
    path: ["confirmPassword"]
  });

export const loginSchema = z.object({
  email: z.string().email("Inserisci un'email valida"),
  password: z.string().min(1, "Password obbligatoria")
});

export function validatePassword(password: string): boolean {
  return password.length >= 8;
}

export function validatePdfUpload(file: { name: string; size: number; type?: string }): { valid: boolean; message: string } {
  const isPdf = file.name.toLowerCase().endsWith(".pdf") || file.type === "application/pdf";
  if (!isPdf) return { valid: false, message: "Carica un file in formato PDF." };
  if (file.size > 20 * 1024 * 1024) return { valid: false, message: "Il file non puo superare 20MB." };
  return { valid: true, message: "PDF valido." };
}
