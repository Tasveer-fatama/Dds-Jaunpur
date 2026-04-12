import { useState } from "react";
import axios from "axios";

export default function Search() {
  const [data, setData] = useState(null);

  const search = async (name, regNo) => {
    const res = await axios.get("https://ddsgroup.onrender.com/api/search", {
      params: { name, regNo }
    });

    setData(res.data);
  };

  return (
    <div>
      <input id="name" placeholder="Name" />
      <input id="reg" placeholder="Reg No" />

      <button
        onClick={() =>
          search(
            document.getElementById("name").value,
            document.getElementById("reg").value
          )
        }
      >
        Search
      </button>

      {data && (
        <a href={`https://ddsgroup.onrender.com/${data.pdfUrl}`} target="_blank">
          Download PDF
        </a>
      )}
    </div>
  );
}