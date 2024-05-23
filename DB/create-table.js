require("dotenv").config({ path: ".env.development.local" });

const { sql } = require("@vercel/postgres");

async function execute() {
  const deleteTable = await sql`drop table if exists absensi_karyawan`;

  const createTable = await sql`
    CREATE TABLE IF NOT EXISTS absensi_karyawan (
        id SERIAL PRIMARY KEY,
        nama_karyawan VARCHAR(150) NOT NULL,
        jam_datang VARCHAR(5),
        jam_pulang VARCHAR(5),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
    ) 
    `;
  console.log(createTable);
}

execute();
