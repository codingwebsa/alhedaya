// nextjs
import Image from "next/image";
// image
import GoogleSvg from "../assets/svg/googleIcon.svg";
// firebase config
import { googleSignIn } from "../firebase.config";

const SigninPageComponent = () => {
  function handleAuth() {
    googleSignIn();
  }
  return (
    <>
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold ">Signin</h1>
        <p>Sign to with your credentials to alhedaya.com</p>
        <div className="mt-8">
          <h2 className="text-lg text-gray-600 text-center">
            sign in method...
          </h2>
          <button
            className="flex gap-2 items-center border-black border-2 px-6 py-3 rounded-lg mt-4"
            onClick={handleAuth}
          >
            <Image src={GoogleSvg} width={30} height={30} alt="google" />
            <p className="text-lg">signin with Google</p>
          </button>
        </div>
      </div>
    </>
  );
};

export default SigninPageComponent;
