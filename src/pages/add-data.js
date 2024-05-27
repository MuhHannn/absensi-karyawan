import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const handleAdd = (event) => {
    event.preventDefault();
    const nama_karyawan = event.target.nama_karyawan.value;
    const jam_datang = event.target.jam_datang.value;
    const jam_pulang = event.target.jam_pulang.value;

    fetch("/api/insert-data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nama_karyawan: nama_karyawan,
        jam_datang: jam_datang,
        jam_pulang: jam_pulang,
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
            <label className="block text-gray-700">Nama Karyawan:</label>
            <input
              name="nama_karyawan"
              required
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700">Jam Datang:</label>
            <input
              name="jam_datang"
              required
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700">Jam Pulang:</label>
            <input
              name="jam_pulang"
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
