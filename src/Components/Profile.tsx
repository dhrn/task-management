import { User, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useOutletContext } from "react-router-dom";

const Profile = () => {
  const { user } = useOutletContext<{ user: User }>();


  const logout = () => {
    signOut(auth);
  };

  const name = user?.displayName || ''

  return (
    <div className="profile-section">
      <div className="flex-1">{name}</div>
      <div className="flex-1">{user?.email}</div>
      <button className="flex-1 button-delete" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default Profile;
