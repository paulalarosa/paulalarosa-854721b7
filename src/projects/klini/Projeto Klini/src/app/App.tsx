import { RouterProvider } from "react-router";
import { router } from "./routes";

export default function App() {
  return (
    <div className="h-full w-full flex items-center justify-center bg-[#E8E9EB]">
      <div
        className="h-full w-full max-w-[430px] relative overflow-hidden"
        style={{
          boxShadow: "0 0 80px rgba(0,0,0,0.08)",
        }}
      >
        <RouterProvider router={router} />
      </div>
    </div>
  );
}
