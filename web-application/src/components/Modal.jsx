export default function Modal({
  title,
  children,
  closeModal,
  btnClass,
  modalClass,
  textColor,
}) {
  return (
    <div className="modal modal-open z-40 w-full">
      <div className={`modal-box  w-full max-w-3xl ${modalClass}`}>
        <h2 className={`font-bold text-xl text-center ${textColor}`}>
          {title}
        </h2>
        <form className="p-4 flex flex-col space-y-5">{children}</form>
        <div className="modal-action">
          <button className={`btn ${btnClass}`} onClick={closeModal}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
