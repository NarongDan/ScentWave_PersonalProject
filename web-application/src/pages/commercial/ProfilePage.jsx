import PersonalInformation from "../../features/homepage/components/PersonalInformation";

export default function ProfilePage() {
  return (
    <div className="w-full h-screen mt-20 bg-gray-100">
      <div className="flex w-[80%] items-start justify-center bg-white pt-10 pb-20 rounded-lg mx-auto shadow-xl outline outline-2 outline-gray-100">
        <div className="w-1/4 p-4 border-r border-gray-200">
          <ul className="space-y-4">
            <li className="font-semibold text-blue-600 cursor-pointer">
              Personal Information
            </li>
            <li className="cursor-pointer">Order History</li>
            <li className="cursor-pointer">Logout</li>
          </ul>
        </div>
        <PersonalInformation />
      </div>
    </div>
  );
}
