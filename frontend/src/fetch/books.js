import instance from "../modules/axios";

export const getBooks = async () => {
  try {
    const response = await instance({
      method: "GET",
      url: "/books",
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const addBook = async (params) => {
  try {
    const response = await instance.postForm("/books", params);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteBook = async (id) => {
  try {
    const response = await instance({
      method: "DELETE",
      url: `/books/${id}`,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateBook = async (id, params) => {
  try {
    console.log(id, params, "<<<<<<<<<<<<<<<<<<<<<<<<<");
    const response = await instance.put(`/books/${id}`, params);
    return response.data;
  } catch (error) {
    console.error("Error updating book:", error);
  }
};
