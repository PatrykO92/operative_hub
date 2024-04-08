import AddNewProblemModal from "../features/problem_tracking/AddNewProblemModal";
import ProblemList from "../features/problem_tracking/ProblemList";
import Heading from "../ui/Heading";

export default function ProblemTracking() {
  return (
    <>
      <Heading as="h1">Problemverfolgung</Heading>
      <ProblemList />
      <AddNewProblemModal />
    </>
  );
}
