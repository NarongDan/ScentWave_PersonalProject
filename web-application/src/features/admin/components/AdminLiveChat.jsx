export default function AdminLiveChat() {
  return (
    <div>
      <h1>Admin Page</h1>
      <iframe
        src="https://dashboard.tawk.to/"
        style={{ width: "100%", height: "80vh", border: "none" }}
        title="Tawk.to Dashboard"
      />
      {/* เพิ่มส่วนอื่น ๆ ของหน้าแอดมินที่คุณต้องการ */}
    </div>
  );
}
