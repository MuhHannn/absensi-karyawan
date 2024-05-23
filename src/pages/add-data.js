import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const handleAdd = (event) => {
    event.preventDefault();
    const keterangan = event.target.keterangan.value;
    const income = event.target.income.value;
    const outcome = event.target.outcome.value;
    const tanggal = event.target.tanggal.value;
    const bulan = event.target.bulan.value;
    const tahun = event.target.tahun.value;

    fetch("/api/insert-data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        keterangan: keterangan,
        income: income,
        outcome: outcome,
        tanggal: tanggal,
        bulan: bulan,
        tahun: tahun,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        router.push("/");
      })
      .catch((err) => {
        alert("hubungi saya", err.message);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-5">
      <p className="text-3xl font-bold mb-5">Ini Halaman Add Data</p>
      <div className="bg-white shadow-md rounded p-8 w-full max-w-lg">
        <form onSubmit={handleAdd} className="space-y-4">
          <div>
            <label className="block text-gray-700">Keterangan:</label>
            <input
              name="keterangan"
              required
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700">Income:</label>
            <input
              name="income"
              required
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700">Outcome:</label>
            <input
              name="outcome"
              required
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700">Tanggal:</label>
            <input
              name="tanggal"
              required
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700">Bulan:</label>
            <input
              name="bulan"
              required
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700">Tahun:</label>
            <input
              name="tahun"
              required
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div className="flex gap-1">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add Data
            </button>
            <button
              type="button"
              onClick={() => {
                router.push(`/`);
              }}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Kembali
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
