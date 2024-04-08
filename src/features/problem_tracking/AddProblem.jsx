export default function AddProblem({ onCloseModal }) {
  return (
    <form>
      <button onClick={() => onCloseModal()}>close</button>
    </form>
  );
}
