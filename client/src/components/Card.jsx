import { useState } from "react";
import { useUserContext } from "../context/UserContext";
import Preview from "./Preview";
export default function Card({ image }) {
  const { deleteImage } = useUserContext();
  const [loading, setLoading] = useState(image.url ? false : true);
  const [preview, setPreview] = useState(false);

  const handleDelete = async (public_id) => {
    setLoading(true);
    try {
      await deleteImage(public_id);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  return (
    <div
      className={`rounded-lg bg-black flex flex-col p-5 space-y-2 items-center justify-center aspect-square`}
    >
      {loading ? (
        <svg
          aria-hidden="true"
          className="w-8 h-8 mr-2 animate-spin text-gray-600 fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
      ) : (
        <>
          <div className="flex w-full justify-between space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="fill-secondary w-6 min-w-[1.3rem] h-6 "
              viewBox="0 -960 960 960"
            >
              <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm40-80h480L570-480 450-320l-90-120-120 160Zm-40 80v-560 560Z" />
            </svg>
            <p className="truncate  text-white ">
              {image.name}HelloHelloHelloHelloHello
            </p>
            <button
              className="flex-1"
              onClick={() => handleDelete(image.public_id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                className="fill-white w-5 h-5"
              >
                <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
              </svg>
            </button>
          </div>
          <img
            className="w-full h-auto max-h-full aspect-[6/5] object-cover"
            src={image.url}
            alt=""
            loading="lazy"
            style={{ objectFit: "cover" }}
            onClick={() => setPreview(true)}
          />
          {preview && (
            <Preview
              image={image}
              preview={preview}
              setPreview={setPreview}
              handleDelete={handleDelete}
            />
          )}
        </>
      )}
    </div>
  );
}
