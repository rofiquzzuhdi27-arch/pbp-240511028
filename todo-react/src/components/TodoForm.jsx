
import { useState } from "react";

export default function TodoForm({ onTambah }) {
  const [teks, setTeks] = useState("");

  const submit = (e) => {
    e.preventDefault();

    if (teks.trim()) {
      onTambah(teks.trim());
      setTeks("");
    }
  };

  return (
    <form className="form" onSubmit={submit}>
      <input
        type="text"
        value={teks}
        onChange={(e) => setTeks(e.target.value)}
        placeholder="Tulis tugas baru..."
      />

      <button type="submit">Tambah</button>
    </form>
  );
}
