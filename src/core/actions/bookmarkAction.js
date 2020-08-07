import { BOOKMARK, UNBOOKMARK } from "./types";

export const bookmark = (id) => async (dispatch) => {
  dispatch({
    type: BOOKMARK,
    bookmarkId: id,
  });
};

export const unbookmark = (id) => async (dispatch) => {
  dispatch({
    type: UNBOOKMARK,
    bookmarkId: id,
  });
};
