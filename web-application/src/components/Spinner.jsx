import { LoaderIcon } from "../icons/index";

export default function Spinner({ transparent, className }) {
  return (
    <>
      <div
        className={`${className} fixed inset-0 bg-white ${
          transparent ? "opacity-70" : ""
        }`}
      ></div>
      <div className="fixed inset-0 flex justify-center items-center z-50 animate-spin ">
        <LoaderIcon className="fill-blue-600" />
      </div>
    </>
  );
}
