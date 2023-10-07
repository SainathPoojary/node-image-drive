import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

axios.defaults.baseURL = "http://localhost:4000/api/";

export const UserProvider = ({ children }) => {
  // States
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    _getUser();
  }, []);

  const _getUser = async () => {
    try {
      const res = await axios.get("/user", {
        withCredentials: true,
      });
      setUser(res.data);
    } catch (err) {
      console.log(err.response.data);
    }
    setLoading(false);
  };

  const login = async (email, password) => {
    try {
      const res = await axios.post(
        "/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      setUser(res.data);
    } catch (err) {
      console.log(err.response.data.code);
    }
  };

  const register = async (name, email, password) => {
    try {
      const res = await axios.post(
        "/register",
        {
          name,
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
      setUser(res.data);
    } catch (err) {
      console.log(err.response.data.code);
    }
  };

  const logout = async () => {
    try {
      const res = await axios.post(
        "/logout",
        {},
        {
          withCredentials: true,
        }
      );

      setUser(null);
    } catch (err) {
      console.log(err.response.data.code);
    }
  };

  const uploadImages = async (images) => {
    try {
      const formData = new FormData();
      for (let i = 0; i < images.length; i++) {
        // check file type is image
        if (!images[i].type.match(/image.*/)) {
          console.log(images[i]);
          console.log(images[i].type + " is not an image");
          continue;
        }

        formData.append("images", images[i]);
        setUser((prev) => ({
          ...prev,
          images: [...prev.images, {}],
        }));
      }

      // check formData has images
      if (!formData.has("images")) {
        return;
      }

      const res = await axios.post("/image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      setUser(res.data);
    } catch (err) {
      console.log(err.response.data.code);
    }
  };

  const deleteImage = async (public_id) => {
    console.log(public_id);
    try {
      const res = await axios.put(
        `/image`,
        { public_id },
        {
          withCredentials: true,
        }
      );

      setUser(res.data);
    } catch (err) {
      console.log(err.response.data.code);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <UserContext.Provider
      value={{ user, login, register, logout, uploadImages, deleteImage }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
