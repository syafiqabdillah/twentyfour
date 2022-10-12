import Link from "next/link";
import React from "react";

function Home() {
  return (
    <div className="flex items-center justify-center">
      <div className="px-8 py-4 bg-blue-400 rounded">
        <Link href={"/play"}>Play</Link>
      </div>
    </div>
  );
}

export default Home;
