import { object, string } from "zod";

export const StatusKepegawaianCreateSchema = object({
  nama: string().min(1, "Status Kepegawaian is required").max(200, "Status Kepegawaian is too long")
});

export const StatusKepegawaianUpdateSchema = object({
  nama: string().min(1, "Status Kepegawaian is required").max(200, "Status Kepegawaian is too long")
}).partial();
