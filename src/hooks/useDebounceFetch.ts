// import { debounce } from "lodash";
// import { useMemo } from "react";

// import { setToLocalStorage } from "../helpers/setToLocalStorage";
// import { useAppDispatch } from "./reduxHooks";

// export const useDebouncedFetch = ({ filterKey, updateFilterAction, fetchAction, filters }) => {
//   const dispatch = useAppDispatch();

//   return useMemo(
//     () =>
//       debounce((name) => {
//         const updatedFilters = { ...filters, name };
//         setToLocalStorage(filterKey, updatedFilters);

//         dispatch(updateFilterAction({ name }));
//         dispatch(fetchAction({ page: 1, filters: updatedFilters }));
//       }, 700),
//     [filterKey, updateFilterAction, fetchAction, filters, dispatch]
//   );
// };
