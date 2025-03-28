import { lazy } from "react";
const CardList = lazy(() => import("../components/CardList"));

function Home() {
  return (
    <div className="container mx-auto p-4">
      <CardList />
    </div>
  );
}

export default Home;
