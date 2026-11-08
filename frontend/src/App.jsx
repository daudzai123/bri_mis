import { useEffect, useState } from "react";
import { request } from "./api";
import Departments from "./components/Departments";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Students from "./components/Students";
import Teachers from "./components/Teachers";

const pages = {
  departments: { label: "Departments", component: Departments },
  teachers: { label: "Teachers", component: Teachers },
  students: { label: "Students", component: Students },
};

export default function App() {
  const [activePage, setActivePage] = useState("students");
  const [data, setData] = useState(null);
  const [loadError, setLoadError] = useState("");
  const [working, setWorking] = useState(false);
  const Page = pages[activePage].component;

  async function loadRecords() {
    setLoadError("");
    try {
      const [departments, teachers, students] = await Promise.all([
        request("departments"),
        request("teachers"),
        request("students"),
      ]);
      setData({ departments, teachers, students });
    } catch (error) {
      setLoadError("Could not load records. Check that Spring Boot and PostgreSQL are running.");
    }
  }

  useEffect(() => {
    loadRecords();
  }, []);

  function changeRows(rows) {
    setData((current) => ({ ...current, [activePage]: rows }));
  }

  return (
    <>
      <Header />
      <main className="container">
        <Navigation pages={pages} activePage={activePage} onChange={setActivePage} disabled={working} />
        {loadError && (
          <div className="notice" role="alert">
            <p>{loadError}</p>
            <button onClick={loadRecords}>Try again</button>
          </div>
        )}
        {!data && !loadError && <p role="status">Loading records…</p>}
        {data && <Page data={data} onChange={changeRows} working={working} setWorking={setWorking} />}
      </main>
    </>
  );
}
