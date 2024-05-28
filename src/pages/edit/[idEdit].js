import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [dataDetail, setDetail] = useState();

  const { idEdit } = router.query;

  useEffect(() => {
    if (!idEdit) return;

    fetch(`/api/get-detail?id=${idEdit}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setDetail(data.data ? data.data : null);
        console.log(data.data);
      });
  }, [idEdit]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const nama_karyawan = event.target.nama_karyawan.value;
    const jam_datang = event.target.jam_datang.value;
    const jam_pulang = event.target.jam_pulang.value;
    const keterangan = event.target.keterangan.value;

    fetch(`/api/update-data`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json", //wajib ada
      },
      body: JSON.stringify({
        nama_karyawan: nama_karyawan,
        jam_datang: jam_datang,
        jam_pulang: jam_pulang,
        keterangan: keterangan,
        id: idEdit,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        router.push(`/admin`);
      })
      .catch((data) => {
        alert("error: ", data.message);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-5">
      {dataDetail === undefined && <p className="text-gray-700">Loading...</p>}
      {dataDetail === null && <p className="text-red-500">Data Kosong</p>}
      {dataDetail && (
        <div className="bg-white shadow-md rounded p-8 w-full max-w-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700">Nama Karyawan:</label>
              <input
                name="nama_karyawan"
                defaultValue={dataDetail.nama_karyawan}
                className="w-full px-4 py-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Jam Datang:</label>
              <input
                name="jam_datang"
                defaultValue={dataDetail.jam_datang}
                className="w-full px-4 py-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Jam Pulang:</label>
              <input
                name="jam_pulang"
                defaultValue={dataDetail.jam_pulang}
                className="w-full px-4 py-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Keterangan:</label>
              <input
                name="keterangan"
                defaultValue={dataDetail.keterangan}
                className="w-full px-4 py-2 border rounded"
                required
              />
            </div>
            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Update Data
              </button>
              <button
                type="button"
                onClick={() => {
                  router.push(`/admin`);
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Kembali
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
