import Head from "next/head";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [hostname, setHostname] = useState();
  const [mintAddress, setMintAddress] = useState();
  const [loading, setLoading] = useState(false);
  const [firstOwner, setFirstOwner] = useState();
  const [error, setError] = useState();

  const fetchFirstOwnerInfo = async () => {
    setLoading(true);
    setError(false);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const data = {
        params: mintAddress,
      };

      const result = await axios.post(
        `${hostname}/api/find-le-lakoon`,
        data,
        config
      );

      if (result.data) {
        setFirstOwner(result.data);
      } else {
        setError(true);
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hostname = window.location.origin;
      setHostname(hostname);
    }
  }, []);

  // AJ3LyKbRCS3CJwYNf5vCQ1nXM8ZjZCBqhWA9TzekQ2xn

  return (
    <div className=" text-white flex flex-col h-full">
      <Head>
        <title>Lakoon Finder - Rakkudos Vancouver HH</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="px-6 flex-1 lg:px-20">
        <div className="py-14 flex justify-center">
          <img src="/logo.png" className="w-32" />
        </div>
        <div className="text-center">
          <p className="font-bold uppercase text-emerald-400">
            Rakkudos - Vancouver HH
          </p>
          <h1 className="text-4xl font-thin my-10">
            Find the first owner of a Rakkudo
          </h1>
        </div>
        <div className="mx-6 lg:mx-20 rounded-3xl bg-white/10 p-6 lg:p-20">
          <div className="text-center mb-4 text-red-500">
            {error && (
              <div>
                <span> The API returned an error, sadge.</span>
                <br />
                <span className="text-xs ">
                  (put a real mint address or wait 2sec)
                </span>
              </div>
            )}
          </div>
          <div className="flex justify-center">
            <div
              className={`bg-[#05040c] rounded-full flex items-center p-1 ${
                firstOwner && "w-full"
              }`}
            >
              {firstOwner ? (
                <div className="w-8/12 mx-auto text-center p-6">
                  <button
                    onClick={() => {
                      setFirstOwner(""), setMintAddress("");
                    }}
                    className="px-4 py-2 rounded-full bg-emerald-400/20 mb-4"
                  >
                    Reset
                  </button>
                  <div>
                    <span className="text-white/60">Address : </span> {"   "}
                    <span className="break-all	">{firstOwner.wallet}</span>
                  </div>
                </div>
              ) : (
                <>
                  <input
                    type="text"
                    className={`bg-[#05040c] rounded-full h-12 transition-all ${
                      loading ? "w-0" : "w-48 lg:w-96 px-8"
                    }`}
                    placeholder="Mint address of your rakkodu"
                    onChange={(e) => {
                      setMintAddress(e.target.value);
                    }}
                  />
                  <div
                    className="bg-emerald-400 rounded-full p-3 cursor-pointer hover:opacity-80"
                    onClick={fetchFirstOwnerInfo}
                  >
                    {loading ? (
                      <Loader />
                    ) : (
                      <MagnifyingGlassIcon className="h-6 w-6" />
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <footer className="flex items-center justify-center border-t border-white/10 mt-20 py-10">
        <div className="flex items-center space-x-4">
          <span className="text-gray-400">Developed by</span>

          <a
            href="https://www.linkedin.com/in/gael/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold"
          >
            <img
              src="https://bafybeifkmwiolcw6ww6yintorn77glujqxjrsgcjqmrryifi4mmyygicka.ipfs.nftstorage.link/9232.png?ext=png"
              alt="Vercel"
              className="logo h-4 w-4 rouunded inline-block"
            />{" "}
            Zjeed{" "}
          </a>
        </div>
      </footer>
    </div>
  );
}

const Loader = () => {
  return (
    <svg
      className="animate-spin  h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
};
