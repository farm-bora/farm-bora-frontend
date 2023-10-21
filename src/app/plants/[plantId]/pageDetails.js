"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faBars } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";
import { marked } from "marked";

export function PlantDetails({ params, res, BASE_URL, BACKEND_URL }) {
  return (
    <div className="p-2 flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <div className="flex flex-row items-center gap-2">
          <Link href="/plants">
            <button className="btn btn-square btn-sm btn-outline text-lg">
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
          </Link>
          <div className="text-xl font-semibold">
            <span>#{params.plantId}</span> {res.name}
          </div>
        </div>
        <button className="btn btn-square btn-ghost text-xl">
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>

      <figure className="relative h-96">
        <Image
          src={`${BACKEND_URL}/media/${res.image}`}
          alt="image"
          style={{ objectFit: "cover" }}
          fill
          className="rounded border-2 border-primary"
        />
      </figure>

      <main className="flex flex-col pb-4 gap-2">
        <div className="flex flex-col p-2 backdrop-blur-sm px-3 border-l-4 border-primary">
          <span className="font-bold text-xl">{res.name}</span>

          <span className="text-lg text-primary mt-0">Description</span>
          <span
            className="text-justify text-md"
            dangerouslySetInnerHTML={{ __html: marked.parse(res.details) }}
          ></span>
        </div>

        <div className="flex flex-col p-2 backdrop-blur-sm px-3 border-l-4 border-primary">
          <span className="text-lg text-primary mt-3">Diseases</span>
          <span className="flex flex-wrap gap-2">
            {res.diseases.map((item) => (
              <Link
                href={`/plants/${res.id}/diseases/${item.id}`}
                key={item.id}
              >
                <button className="btn btn-primary btn-sm btn-outline capitalize">
                  {item.name}
                </button>
              </Link>
            ))}
          </span>
        </div>
      </main>
    </div>
  );
}
