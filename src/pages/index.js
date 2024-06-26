import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const [showAllData, setShowAllData] = useState(undefined); // Initialize to undefined to handle loading state
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/get-all`);
        const data = await res.json();
        if (data.data) {
          setShowAllData(data.data);
        } else {
          setShowAllData(null);
        }
      } catch (err) {
        setError("An error occurred while fetching data. Please try again.");
        console.error("Fetch error:", err.message);
      }
    };

    fetchData();
  }, []);

  const handleUpdate = (id) => {
    fetch(`/api/update-jam?id=${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jam_pulang:
          new Date().getHours() +
          ":" +
          String(new Date().getMinutes()).padStart(2, "0"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
        alert("Makasih Atas kerjanya Hari ini");
        router.reload();
      })
      .catch((err) => {
        alert("Error ", err.message);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-5">
      <h1 className="text-3xl font-bold mb-5">Absensi Karyawan</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-5"
        onClick={() => router.push("/add-data")}
      >
        Add Data
      </button>
      {error && <p className="text-red-500">{error}</p>}
      {showAllData === undefined && <p className="text-gray-700">Loading...</p>}
      {showAllData === null && <p className="text-red-500">Data Kosong</p>}
      {showAllData && (
        <table className="min-w-full bg-white shadow-md rounded overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Nama</th>
              <th className="py-2 px-4 border-b">Jam Datang</th>
              <th className="py-2 px-4 border-b">Jam Pulang</th>
            </tr>
          </thead>
          <tbody>
            {showAllData.map((data) => (
              <tr key={data.id} className="border-b hover:bg-gray-100">
                <td className="py-2 px-4 text-center">{data.id}</td>
                <td className="py-2 px-4 text-center">{data.nama_karyawan}</td>
                <td className="py-2 px-4 text-center">{data.jam_datang}</td>
                <td className="py-2 px-4 text-center">
                  {data.jam_pulang}
                  {!data.jam_pulang && (
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                      onClick={() => {
                        handleUpdate(data.id);
                      }}
                    >
                      Pulang
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
