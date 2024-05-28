import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [dataDetail, setDetail] = useState();

  const { idDetail } = router.query;

  useEffect(() => {
    if (!idDetail) return;

    fetch(`/api/get-detail?id=${idDetail}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (!data.data) {
          setDetail(null);
          alert("Data tidak ditemukan");
          router.push(`/admin`);
        } else {
          setDetail(data.data);
        }
      });
  }, [idDetail]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-5">
      {dataDetail === undefined && <p className="text-gray-700">Loading...</p>}
      {dataDetail === null && <p className="text-red-500">Data Kosong</p>}
      {dataDetail && (
        <div className="bg-white shadow-md rounded p-8 w-full max-w-lg">
          <h2 className="text-2xl font-bold mb-4">Ini Halaman Detail:</h2>
          <p className="mb-2">
            <span className="font-semibold">ID:</span> {dataDetail.id}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Nama Karyawan:</span>{" "}
            {dataDetail.nama_karyawan}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Jam Datang:</span>{" "}
            {dataDetail.jam_datang}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Jam Pulang:</span>{" "}
            {dataDetail.jam_pulang}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Keterangan:</span>{" "}
            {dataDetail.keterangan}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Tanggal:</span> {dataDetail.tanggal}
            /{dataDetail.bulan}/{dataDetail.tahun}
          </p>
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
      )}
    </div>
  );
}
