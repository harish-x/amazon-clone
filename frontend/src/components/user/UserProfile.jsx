import React,{useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from '../spinner/Spinner'
import { Logoutuser } from "../../features/AuthFeatures";
import UpdateProfile from "./UpdateProfile";

const UserProfile = () => {
  const { isAuthenticated, user, status } = useSelector((state) => state.AuthState);
  let [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch()

  return (
    <>
      {status === "loading" ? (
        <Spinner />
      ) : (
        <div>
          {!isAuthenticated ? (
            <h1 className="text-center text-4xl">Please Login</h1>
          ) : (
            <div>
              {user.map((data, index) => {
                return (
                  <div key={index}>
                    <img
                      src={
                        data.user.avatar ??
                        "https://cdn-icons-png.flaticon.com/512/10337/10337609.png"
                      }
                      alt="profile"
                      className="h-24 rounded-s-full"
                    />
                    <p>{data.user.name}</p>
                    <p>{data.user.email}</p>
                    <button
                      type="button"
                      className="bg-green-500 p-3"
                      onClick={() => setIsOpen(!isOpen)}
                    >
                      Edit{" "}
                    </button>
                    <button
                      type="button"
                      onClick={() => dispatch(Logoutuser())}
                    >
                      Log out
                    </button>
                    <UpdateProfile openstate={isOpen} setOpenstate={setIsOpen } />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
     
    </>
  );
};

export default UserProfile;
