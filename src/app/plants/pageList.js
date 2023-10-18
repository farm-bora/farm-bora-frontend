"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCamera,
  faBars,
  faMicrophone,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE;

export function PlantListing({ data }) {
  const [filter, setFilter] = useState("");
  const filePickerRef = useRef();
  const [imageBase64, setImageBase64] = useState("");

  const plants = !filter
    ? data
    : data.filter((item) =>
        item.name.toLowerCase().includes(filter.toLowerCase())
      );

  const submitImage = async (imageBase64) => {
    if (!imageBase64) {
      return;
    }

    let body = {
      image_base64: imageBase64,
    };

    body = JSON.stringify(body);

    const response = await fetch(`${BASE_URL}/plants/search_disease`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body,
    }).then(async (response) => {
      const data = await response.json();

      if (!response.ok) {
        throw data;
      }

      return data;
    });

    console.log("submitImage", response);
  };

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
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
          <div className="flex-none hidden">
            <button className="btn btn-square btn-outline text-xl">
              <FontAwesomeIcon icon={faMicrophone} />
            </button>
          </div>
        </div>

        <main className="grid grid-cols-2 gap-4 pb-20">
          {plants?.map((item) => (
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
        <div className="flex flex-col p-3 gap-2">
          <button
            className="btn btn-primary"
            onClick={() => filePickerRef.current?.click()}
          >
            <span>Take Photo</span>
            <span className="text-lg">
              <FontAwesomeIcon icon={faCamera} />
            </span>
          </button>

          <input
            type="file"
            className="file-input file-input-bordered w-full hidden"
            accept="image/*"
            onChange={async (e) => {
              let file = null;

              const input = e.target;
              if (input?.files?.length > 0) {
                file = input.files[0];
              }

              const image_base64 = await toBase64(file);

              submitImage(image_base64);
              // console.log("Image b64", image_base64);
              // setImageBase64(image_base64);
            }}
            ref={filePickerRef}
          />
        </div>
      </nav>
    </div>
  );
}

function PlantCard({ imgSrc, plantId, name, description }) {
  return (
    <Link href={`/plants/${plantId}`}>
      <div
        className={`cursor-pointer shadow flex flex-col gap-2 border-2 rounded tr-eo p-1 h-full
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

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });
