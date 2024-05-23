require("dotenv").config({ path: ".env.development.local" });

const { sql } = require("@vercel/postgres");

async function execute(nama_karyawan) {
  const result = await sql`
        INSERT INTO absensi_karyawan (nama_karyawan)
        VALUES (${nama_karyawan})
        `;
  console.log(result);
}

execute("Yanto");
