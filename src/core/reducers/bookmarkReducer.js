import { BOOKMARK, UNBOOKMARK } from "core/actions/types";

const initialState = {
  bookmarkIds: [],
};

export default function (state = initialState, action) {
  const index = state.bookmarkIds.indexOf(action.bookmarkId);

  switch (action.type) {
    case BOOKMARK:
      return {
        ...state,
        bookmarkIds: [...state.bookmarkIds, action.bookmarkId],
      };
    case UNBOOKMARK:
      if (index > -1) {
        state.bookmarkIds.splice(index, 1);
      }
      return {
        ...state,
        bookmarkIds: [...state.bookmarkIds],
      };
    default:
      return state;
  }
}
