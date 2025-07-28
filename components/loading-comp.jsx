import { SyncLoader } from "react-spinners";

export default function LoadingComp({ message }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        gap: "1rem",
        color: "#36d7b7",
      }}
    >
      <SyncLoader color="#36d7b7" size={10} />
      <p>{message}</p>
    </div>
  );
}
