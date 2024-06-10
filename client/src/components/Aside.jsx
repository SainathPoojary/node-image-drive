import { useRef } from "react";
import { useUserContext } from "../context/UserContext";

export default function Aside({ setToggle }) {
  const { uploadImages, logout, user } = useUserContext();
  // use ref for input type file
  const inputRef = useRef(null);

  const openFile = () => {
    inputRef.current.click();
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      await uploadImages([...e.target.files]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="sm:w-1/6 absolute w-full sm:relative top-0 bottom-0 bg-black">
      <div className="w-full h-full bg-black p-5 flex flex-col justify-between items-start">
        <div className="flex justify-between w-full">
          <button
            className="flex space-x-5 bg-primary hover:bg-[#28292e] px-4 py-1 rounded-full"
            onClick={openFile}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -960 960 960"
              className="w-5 h-5 mr-2 fill-white"
            >
              <path d="M440-320v-326L336-542l-56-58 200-200 200 200-56 58-104-104v326h-80ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z" />
            </svg>{" "}
            <input
              type="file"
              multiple
              className="hidden"
              ref={inputRef}
              onChange={handleUpload}
            />
            Upload
          </button>

          <button onClick={() => setToggle((prev) => !prev)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -960 960 960"
              className="sm:hidden fill-white h-8 w-8"
            >
              <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
            </svg>
          </button>
        </div>
        <div className="w-full flex flex-col space-y-3">
          <div className="w-full flex flex-col space-y-2">
            <div>Storage</div>
            <div className="w-full rounded-full h-2.5 bg-gray-700">
              <div
                className={`bg-secondary h-2.5 rounded-full`}
                style={{
                  width: Math.ceil(user.storageUsed),
                }}
              ></div>
            </div>
            <p className="w-full text-center text-ellipsis">
              {user?.storageUsed}MB of 100MB used
            </p>
          </div>
          <button
            onClick={logout}
            className="flex justify-center items-center space-x-5 bg-primary hover:bg-[#28292e] px-4 py-1.5 rounded-full w-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -960 960 960"
              className="w-5 h-5 mr-2 fill-white"
            >
              <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
            </svg>{" "}
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
