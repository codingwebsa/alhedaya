// firebase config
import { googleSignOut } from "../firebase.config";
// nextjs
import Image from "next/image";

const SignoutComponent = ({ user }) => {
  function handleSignout() {
    googleSignOut();
  }
  return (
    <>
      <div className="h-screen flex items-center justify-center">
        <div className="flex flex-col gap-2 justify-center items-center">
          <Image
            src={user.photoURL}
            width={90}
            height={90}
            alt={user.displayName}
            className="rounded-full"
          />
          <p className="text-lg font-bold">{user.displayName}</p>
          <p>({user.email})</p>
          <p className="mt-4">
            need to sign out{" "}
            <button className="font-semibold" onClick={handleSignout}>
              <p className="underline ">signout</p>
            </button>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignoutComponent;
