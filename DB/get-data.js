require("dotenv").config({ path: ".env.development.local" });

const { sql } = require("@vercel/postgres");

async function execute(id) {
  const { rows } = await sql`
        SELECT * FROM absensi_karyawan`;
  console.log(rows);
}

execute(1);