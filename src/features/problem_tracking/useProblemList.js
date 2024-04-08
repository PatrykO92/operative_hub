import { useQuery } from "@tanstack/react-query";
import { getListOfProblems } from "../../services/apiProblemTracking";

export default function useProblemList() {
  const {
    data: listOfProblems,
    isLoading: isLoadingProblems,
    error: problemsLoadingError,
  } = useQuery({
    queryKey: ["problem_list"],
    queryFn: getListOfProblems,
  });

  return { listOfProblems, isLoadingProblems, problemsLoadingError };
}
