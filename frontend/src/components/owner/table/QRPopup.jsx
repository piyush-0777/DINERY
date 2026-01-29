const QRPopup = ({ qr, onClose }) => {
  if (!qr) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-neutral-950 border border-neutral-800 p-5 rounded-2xl">
        <h3 className="text-white text-lg mb-3 text-center">
          Scan to Order
        </h3>

        <img src={qr} alt="QR Code" className="w-48 h-48 mx-auto" />

        <button
          onClick={onClose}
          className="mt-4 w-full py-2 rounded-xl bg-white text-black"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default QRPopup;
