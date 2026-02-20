import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const ReportTable = ({ title, data }) => {

  const exportCSV = () => {
    const headers = Object.keys(data[0]).join(",");
    const rows = data.map(row =>
      Object.values(row).join(",")
    ).join("\n");

    const blob = new Blob([headers + "\n" + rows], {
      type: "text/csv;charset=utf-8;"
    });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${title}.csv`;
    link.click();
  };

  const exportPDF = () => {
    const doc = new jsPDF();

  doc.text(title, 14, 15);

  autoTable(doc, {
    startY: 20,
    head: [Object.keys(data[0])],
    body: data.map(row => Object.values(row)),
  });

  doc.save(`${title}.pdf`);
  };

  return (
    <div className="bg-[#111] border border-gray-800 rounded-xl p-6 
                    hover:border-yellow-500 transition">

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-yellow-400 text-lg font-semibold">
          {title}
        </h3>

        <div className="flex gap-3">
          <button
            onClick={exportCSV}
            className="bg-yellow-500 text-black px-4 py-1 rounded-lg 
                       hover:bg-yellow-400 transition"
          >
            Excel
          </button>

          <button
            onClick={exportPDF}
            className="border border-yellow-500 text-yellow-400 px-4 py-1 rounded-lg 
                       hover:bg-yellow-500 hover:text-black transition"
          >
            PDF
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-gray-400 border-b border-gray-700">
            <tr>
              {Object.keys(data[0]).map((key) => (
                <th key={key} className="py-2">{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i}
                  className="border-b border-gray-800 hover:bg-[#1a1a1a] transition">
                {Object.values(row).map((val, idx) => (
                  <td key={idx} className="py-2 text-gray-300">
                    {val}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default ReportTable;