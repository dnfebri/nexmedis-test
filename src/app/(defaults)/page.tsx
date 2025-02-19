import { Suspense } from "react";
import { ComponentListUser } from "./ComponentListUser";

export default function Home() {
  return (
    <div className="panel mt-6">
      <Suspense>
        <ComponentListUser />
      </Suspense>
    </div>
  );
}
