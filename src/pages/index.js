import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const [showAllData, setShowAllData] = useState();
  const [showTotalIncome, setShowTotalIncome] = useState(0);
  const [showTotalOutcome, setShowTotalOutcome] = useState(0);
  const [showBalance, setShowBalance] = useState(0);

  useEffect(() => {
    fetch(`/api/get-all`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.data) {
          console.log(data.data.length ? true : false);
          setShowAllData(data.data);

          let dataTotalIncome = 0;
          let dataTotalOutcome = 0;

          for (let i = 0; i < data.data.length; i++) {
            dataTotalIncome += data.data[i].income;
          }

          for (let i = 0; i < data.data.length; i++) {
            dataTotalOutcome += data.data[i].outcome;
          }

          setShowTotalIncome(dataTotalIncome);
          setShowTotalOutcome(dataTotalOutcome);
          setShowBalance(dataTotalIncome - dataTotalOutcome);

          return;
        }
        setShowAllData(null);
      })
      .catch((err) => {
        alert("Hubungi saya nek error");
        console.log("Gada Data jadinya error", err.message);
      });
  }, []);

  const handleDelete = async (id) => {
    alert("delete");
    const dataBody = JSON.stringify({ id });
    await fetch(`/api/delete-data`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json", //wajib ada
      },
      body: dataBody,
    });
    await fetch("/api/get-all")
      .then((res) => res.json())
      .then((data) => {
        setShowAllData(data.data);

        let dataTotalIncome = 0;
        let dataTotalOutcome = 0;

        for (let i = 0; i < data.data.length; i++) {
          dataTotalIncome += data.data[i].income;
        }

        for (let i = 0; i < data.data.length; i++) {
          dataTotalOutcome += data.data[i].outcome;
        }

        setShowTotalOutcome(dataTotalOutcome);
        setShowBalance(dataTotalIncome - dataTotalOutcome);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-5">
      <h1 className="text-3xl font-bold mb-5">Halaman Utama</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-5"
        onClick={() => {
          router.push("/add-data");
        }}
      >
        Add Data
      </button>
      {showAllData === undefined && <p className="text-gray-700">Loading...</p>}
      {showAllData === null && <p className="text-red-500">Data Kosong</p>}
      {showAllData && (
        <div className="w-full max-w-4xl">
          <div className="min-w-full bg-white shadow-md rounded overflow-hidden mb-5 flex flex-col items-center py-5">
            <h4>Total income: {showTotalIncome}</h4>
            <h4>Total outcome: {showTotalOutcome}</h4>
            <h4>Balance: {showBalance}</h4>
          </div>
          <table className="min-w-full bg-white shadow-md rounded overflow-hidden">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Keterangan</th>
                <th className="py-2 px-4 border-b">Income</th>
                <th className="py-2 px-4 border-b">Outcome</th>
                <th className="py-2 px-4 border-b">Tanggal</th>
                <th className="py-2 px-4 border-b">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {showAllData.map((data, index) => (
                <tr key={index} className="border-b hover:bg-gray-100">
                  <td className="py-2 px-4 text-center">{data.id}</td>
                  <td className="py-2 px-4 text-center">{data.keterangan}</td>
                  <td className="py-2 px-4 text-center">{data.income}</td>
                  <td className="py-2 px-4 text-center">{data.outcome}</td>
                  <td className="py-2 px-4 text-center">
                    {data.tanggal}/{data.bulan}/{data.tahun}
                  </td>
                  <td className="py-2 px-4 text-center space-x-2">
                    <button
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                      onClick={() => {
                        router.push(`/edit/${data.id}`);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      onClick={() => {
                        handleDelete(data.id);
                      }}
                    >
                      Hapus
                    </button>
                    <button
                      className="bg-green-500 text-white px-3 py-1 rounded"
                      onClick={() => {
                        router.push(`/detail/${data.id}`);
                      }}
                    >
                      Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}