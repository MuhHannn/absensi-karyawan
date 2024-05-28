import { sql } from "@vercel/postgres";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "method not allowed" });
  }

  let { nama_karyawan, jam_datang, keterangan } = await req.body;

  if (!nama_karyawan) {
    return res.status(400).json({ error: "Data harus valid" });
  }

  const resData =
    await sql`INSERT INTO absensi_karyawan (nama_karyawan, jam_datang, keterangan, hari, bulan, tahun)
  VALUES (${nama_karyawan}, ${jam_datang}, ${keterangan}, ${new Date().getDay()}, ${new Date().getMonth()}, ${new Date().getFullYear()})`;

  return res.status(200).json({ message: "saved", data: resData });
}
