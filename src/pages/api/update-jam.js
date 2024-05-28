const { sql } = require("@vercel/postgres");

async function updateData(req, res) {
  try {
    if (req.method !== "PUT") {
      return res.status(405).json({ message: "Method tidak diperbolehkan" });
    }

    const { jam_pulang } = req.body;
    const { id } = await req.query;

    if (!jam_pulang) {
      return res.status(400).json({ message: "Jam pulang tidak boleh kosong" });
    }

    if (!id) {
      return res.status(400).json({ message: "Id tidak boleh kosong" });
    }

    const rows =
      await sql`UPDATE absensi_karyawan SET jam_pulang = ${jam_pulang} WHERE id = ${id}`;

    res.status(200).json({ message: "Success", data: rows });
  } catch (e) {
    console.log("ADA ERROR ", e);
    return res.status(500).json({ message: "Terjadi error," });
  }
}

export default updateData;
