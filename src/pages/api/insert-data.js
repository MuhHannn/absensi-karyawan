import { sql } from "@vercel/postgres";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "method not allowed" });
  }

  let { nama_karyawan } = await req.body;

  if (!nama_karyawan) {
    return res.status(400).json({ error: "Data harus valid" });
  }

  const resData = await sql`INSERT INTO absensi_karyawan (nama_karyawan)
  VALUES (${nama_karyawan})`;

  return res.status(200).json({ message: "saved", data: resData });
}
