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

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) {
      return;
    }
    try {
      const dataBody = JSON.stringify({ id });
      await fetch(`/api/delete-data`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: dataBody,
      });
      const res = await fetch("/api/get-all");
      const data = await res.json();
      setShowAllData(data.data);
    } catch (err) {
      setError("An error occurred while deleting data. Please try again.");
      console.error("Delete error:", err.message);
    }
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
              <th className="py-2 px-4 border-b">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {showAllData.map((data) => (
              <tr key={data.id} className="border-b hover:bg-gray-100">
                <td className="py-2 px-4 text-center">{data.id}</td>
                <td className="py-2 px-4 text-center">{data.nama_karyawan}</td>
                <td className="py-2 px-4 text-center">{data.jam_datang}</td>
                <td className="py-2 px-4 text-center">{data.jam_pulang}</td>
                <td className="py-2 px-4 text-center space-x-2">
                  <button
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                    onClick={() => router.push(`/edit/${data.id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => handleDelete(data.id)}
                  >
                    Hapus
                  </button>
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded"
                    onClick={() => router.push(`/detail/${data.id}`)}
                  >
                    Detail
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
