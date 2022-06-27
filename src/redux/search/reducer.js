import { CHANGE_SEARCH_VALUE } from "../search";
import { SEARCH_INITIAL_STATE } from "../../constants";

export const search = function (state = SEARCH_INITIAL_STATE, action) {
  switch (action.type) {
    case CHANGE_SEARCH_VALUE:
      return {
        ...state,
        search: action.payload,
      };
  }
};
