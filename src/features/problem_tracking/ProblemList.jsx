import Table from "../../ui/Table";
import Spinner from "../../ui/Spinner";
import useProblemList from "./useProblemList";
import ProblemRow from "./ProblemRow";

export default function ProblemList() {
  const { listOfProblems, isLoadingProblems } = useProblemList();

  if (isLoadingProblems) return <Spinner />;

  return (
    <Table $columns="0.5fr 0.5fr 0.7fr 1.9fr 0.2fr 0.1fr">
      <Table.Header>
        <div>Datum</div>
        <div>Wer</div>
        <div>Titel</div>
        <div>Beschreibung</div>
        <div>Gelöst</div>
      </Table.Header>
      <Table.Body
        data={listOfProblems}
        render={(problem) => <ProblemRow key={problem.id} problem={problem} />}
      />
    </Table>
  );
}
