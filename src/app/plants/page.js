import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCamera,
  faBars,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE;
async function getData() {
  const res = await fetch(`${BASE_URL}/plants`);

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Home() {
  const res = await getData();

  return (
    <div className="px-4 py-3 mt-3 relative">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <div className="text-xl font-semibold">Home</div>
          <button className="btn btn-square btn-ghost text-xl">
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
        <div className="flex gap-2 mb-3">
          <div className="grow">
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Type to Search"
            />
          </div>
          <div className="flex-none">
            <button className="btn btn-square btn-outline">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </div>
        </div>

        <main className="grid grid-cols-2 gap-4 pb-20">
          {res?.map((item) => (
            <PlantCard
              key={item.id}
              plantId={item.id}
              imgSrc="/images/demos/shalev-cohen-5Oi5sG6G0z8-unsplash.jpg"
              name={item.name}
              description={item.botanical_name}
            />
          ))}
        </main>
      </div>

      <nav className="fixed bottom-0 right-0 w-full">
        <div className="flex flex-col p-3">
          <button className="btn btn-primary">
            <span>Take Photo</span>
            <span className="text-lg">
              <FontAwesomeIcon icon={faCamera} />
            </span>
          </button>
        </div>
      </nav>
    </div>
  );
}
function PlantCard({ imgSrc, plantId, name, description }) {
  return (
    <Link href={`/plants/${plantId}`}>
      <div
        className={`cursor-pointer shadow flex flex-col gap-2 border-2 rounded tr-eo p-1
      border-base-content hover:ring-2 hover:ring-base-content hover:scale-105 active:scale-95 bg-base-100`}
      >
        <figure className="relative h-40">
          <Image
            src={imgSrc}
            alt="image"
            style={{ objectFit: "cover" }}
            fill
            className="rounded-t"
          />
        </figure>
        <main className="p-2 flex flex-col pb-4">
          <span className="font-bold">{name}</span>
          <span className="text-sm">{description}</span>
        </main>
      </div>
    </Link>
  );
}
