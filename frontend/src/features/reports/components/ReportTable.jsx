import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const ReportTable = ({ title, data }) => {

  // ✅ safe check
  const hasData = data && data.length > 0;

  const exportCSV = () => {
    if (!hasData) return;

    const headers = Object.keys(data[0]).join(",");
    const rows = data
      .map((row) => Object.values(row).join(","))
      .join("\n");

    const blob = new Blob([headers + "\n" + rows], {
      type: "text/csv;charset=utf-8;",
    });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);

    // ✅ better filename
    link.download = `${title.replace(/\s+/g, "_")}.csv`;
    link.click();
  };

  const exportPDF = () => {
    if (!hasData) return;

    const doc = new jsPDF();

    doc.text(title, 14, 15);

    autoTable(doc, {
      startY: 20,
      head: [Object.keys(data[0])],
      body: data.map((row) => Object.values(row)),
    });

    // ✅ better filename
    doc.save(`${title.replace(/\s+/g, "_")}.pdf`);
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
            disabled={!hasData}
            className="bg-yellow-500 text-black px-4 py-1 rounded-lg 
                       hover:bg-yellow-400 transition disabled:opacity-50"
          >
            Excel
          </button>

          <button
            onClick={exportPDF}
            disabled={!hasData}
            className="border border-yellow-500 text-yellow-400 px-4 py-1 rounded-lg 
                       hover:bg-yellow-500 hover:text-black transition disabled:opacity-50"
          >
            PDF
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {hasData ? (
          <table className="w-full text-sm text-left">
            <thead className="text-gray-400 border-b border-gray-700">
              <tr>
                {Object.keys(data[0]).map((key) => (
                  <th key={key} className="py-2">
                    {key}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {data.map((row, i) => (
                <tr
                  key={i}
                  className="border-b border-gray-800 hover:bg-[#1a1a1a] transition"
                >
                  {Object.values(row).map((val, idx) => (
                    <td key={idx} className="py-2 text-gray-300">
                      {val}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          // ✅ empty state (important for API)
          <div className="text-center text-gray-500 py-6">
            No data available
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportTable;