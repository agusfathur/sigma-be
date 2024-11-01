import {
  createStatusKepegawaian,
  destroyStatusKepegawaian,
  getStatusKepegawaian,
  getStatusKepegawaianById,
  updateStatusKepegawaian
} from "./statusKepegawaian.repository.js";

export const GetAllStatusKepegawaian = async () => {
  const getAll = await getStatusKepegawaian();
  return getAll;
};

export const GetStatusKepegawaianById = async (id) => {
  const getOne = await getStatusKepegawaianById(id);
  return getOne;
};

export const CreateStatusKepegawaian = async (data) => {
  const create = await createStatusKepegawaian(data);
  return create;
};
export const UpdateStatusKepegawaian = async (id, data) => {
  const update = await updateStatusKepegawaian(id, data);
  return update;
};
export const DeleteStatusKepegawaian = async (id) => {
  const create = await destroyStatusKepegawaian(id);
  return create;
};
