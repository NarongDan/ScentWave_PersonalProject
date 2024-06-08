import RegistrationForm from "../../features/authentication/components/RegistrationForm";

export default function Registration() {
  return (
    <div className="w-screen h-screen mt-20">
      <div className="flex items-center justify-center bg-white pt-10 pb-20  w-[500px] rounded-lg mx-auto shadow-xl outline outline-2 outline-gray-100">
        <RegistrationForm />
      </div>
    </div>
  );
}
