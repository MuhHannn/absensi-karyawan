require("dotenv").config({ path: ".env.development.local" });

const { sql } = require("@vercel/postgres");

async function execute(nama_karyawan) {
  const result = await sql`
        UPDATE absensi_karyawan SET nama_karyawan WHERE id = ${id}`;
  console.log("Berhasil mengupdate data", result);
  return result;
}

execute("Budi");
