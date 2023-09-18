import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faBars,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

export default function Home() {
  return (
    <div className="p-2 flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <div className="flex flex-row items-center gap-2">
          <button className="btn btn-square btn-sm btn-outline text-lg">
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <div className="text-xl font-semibold">Tomato</div>
        </div>
        <button className="btn btn-square btn-ghost text-xl">
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>

      <figure className="relative h-96">
        <Image
          src={"/images/demos/shalev-cohen-5Oi5sG6G0z8-unsplash.jpg"}
          alt="image"
          style={{ objectFit: "cover" }}
          fill
          className="rounded border-2 border-primary"
        />
      </figure>

      <main className="flex flex-col pb-4 gap-2">
        <div className="flex flex-col p-2 backdrop-blur-sm px-3 border-l-4 border-primary">
          <span className="font-bold text-xl">Tomato</span>

          <span className="text-lg text-primary mt-0">Description</span>
          <span className="text-justify text-md">
            Tomatoes are versatile and popular fruits, often mistaken for
            vegetables in culinary contexts. They belong to the nightshade
            family and originated in South America. These red, juicy orbs are
            rich in vitamins, particularly vitamin C and K, and are a good
            source of antioxidants like lycopene, known for its potential health
            benefits. Tomatoes are a staple in various cuisines, used in salads,
            sauces, soups, and more. They come in different varieties, from
            cherry to beefsteak, each offering a unique flavor and texture.
            Tomatoes have played a significant role in global cuisine and
            continue to be a nutritious and flavorful addition to a wide range
            of dishes.
          </span>
        </div>

        <div className="flex flex-col p-2 backdrop-blur-sm px-3 border-l-4 border-primary">
          <span className="text-lg text-primary mt-3">Diseases</span>
          <span className="flex flex-wrap gap-2">
            <button className="btn btn-primary btn-sm btn-outline">
              Blight
            </button>
            <button className="btn btn-primary btn-sm btn-outline">
              Grey Rot
            </button>
            <button className="btn btn-primary btn-sm btn-outline">
              Spider Mites
            </button>
          </span>
        </div>
      </main>
    </div>
  );
}
function PlantCard({ imgSrc, name, description }) {
  return (
    <div className="cursor-pointer shadow flex flex-col gap-2 border-2 rounded border-base-content tr-eo hover:ring-2 hover:ring-base-content hover:scale-105 bg-base-100 p-1">
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
  );
}
