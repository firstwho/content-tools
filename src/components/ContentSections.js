"use client";

import React, { useEffect, useRef, useState } from "react";
import copy from "copy-to-clipboard";
import toast from "react-hot-toast";
import ScrollTo from "react-scroll-into-view";
import { DndContext } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { CSS } from "@dnd-kit/utilities";
import { Transition } from "@headlessui/react";

export const CONTENT_TYPE_TEXT_LEFT = "text-only-left";
export const CONTENT_TYPE_TEXT_RIGHT = "text-only-right";
export const CONTENT_TYPE_TEXT_CENTER = "text-only-center";
export const CONTENT_TYPE_TEXT_IMAGE_LEFT = "text-with-left-image";
export const CONTENT_TYPE_TEXT_IMAGE_RIGHT = "text-with-right-image";
export const CONTENT_TYPE_IMAGE_LEFT = "image-only-left";
export const CONTENT_TYPE_IMAGE_RIGHT = "image-only-right";
export const CONTENT_TYPE_IMAGE_CENTER = "image-only-center";
export const CONTENT_TYPE_IMAGE_FULL = "image-only-full";
export const CONTENT_TYPE_DIVIDER = "divider";
export const CONTENT_TYPE_SIGN_UP = "sign-up";
export const CONTENT_TYPE_MUX_VIDEO = "mux-video";
export const CONTENT_TYPE_TESTIMONIAL = "testimonial";

/*
Theme colors:
  black
  white
  rose
  pink
  fuchsia
  purple
  violet
  indigo
  blue
  sky
  cyan
  teal
  emerald
  green
  lime
  yellow
  amber
  orange
  red
  stone
  neutral
  gray
  slate
*/

// color themes for buttons and backgrounds

const backgroundColorThemes = {
  ["none"]: "pt-0 mb-6",
  ["black"]: "bg-black border p-4 mb-6 rounded",
  ["white"]: "bg-white border border-gray-50 p-4 mb-6 rounded",
  ["rose"]: "bg-rose-50 border border-rose-200 p-4 mb-6 rounded",
  ["pink"]: "bg-pink-50 border border-pink-200 p-4 mb-6 rounded",
  ["fuchsia"]: "bg-fuchsia-50 border border-fuchsia-200 p-4 mb-6 rounded",
  ["purple"]: "bg-purple-50 border border-purple-200 p-4 mb-6 rounded",
  ["violet"]: "bg-violet-50 border border-violet-200 p-4 mb-6 rounded",
  ["indigo"]: "bg-indigo-50 border border-indigo-200 p-4 mb-6 rounded",
  ["blue"]: "bg-blue-50 border border-blue-200 p-4 mb-6 rounded",
  ["sky"]: "bg-sky-50 border border-sky-200 p-4 mb-6 rounded",
  ["cyan"]: "bg-cyan-50 border border-cyan-200 p-4 mb-6 rounded",
  ["teal"]: "bg-teal-50 border border-teal-200 p-4 mb-6 rounded",
  ["emerald"]: "bg-emerald-50 border border-emerald-200 p-4 mb-6 rounded",
  ["green"]: "bg-green-50 border border-green-200 p-4 mb-6 rounded",
  ["lime"]: "bg-lime-50 border border-lime-200 p-4 mb-6 rounded",
  ["yellow"]: "bg-yellow-50 border border-yellow-200 p-4 mb-6 rounded",
  ["amber"]: "bg-amber-50 border border-amber-200 p-4 mb-6 rounded",
  ["orange"]: "bg-orange-50 border border-orange-200 p-4 mb-6 rounded",
  ["red"]: "bg-red-50 border border-red-200 p-4 mb-6 rounded",
  ["stone"]: "bg-stone-50 border border-stone-200 p-4 mb-6 rounded",
  ["neutral"]: "bg-neutral-50 border border-neutral-200 p-4 mb-6 rounded",
  ["gray"]: "bg-gray-50 border border-gray-200 p-4 mb-6 rounded",
  ["slate"]: "bg-slate-50 border border-slate-200 p-4 mb-6 rounded"
};

const textColorThemes = {
  ["none"]: "",
  ["black"]: "text-black",
  ["white"]: "text-white",
  ["rose"]: "text-rose-900",
  ["pink"]: "text-pink-900",
  ["fuchsia"]: "text-fuchsia-900",
  ["purple"]: "text-purple-900",
  ["violet"]: "text-violet-900",
  ["indigo"]: "text-indigo-900",
  ["blue"]: "text-blue-900",
  ["sky"]: "text-sky-900",
  ["cyan"]: "text-cyan-900",
  ["teal"]: "text-teal-900",
  ["emerald"]: "text-emerald-900",
  ["green"]: "text-green-900",
  ["lime"]: "text-lime-900",
  ["yellow"]: "text-yellow-900",
  ["amber"]: "text-amber-900",
  ["orange"]: "text-orange-900",
  ["red"]: "text-red-900",
  ["stone"]: "text-stone-900",
  ["neutral"]: "text-neutral-900",
  ["gray"]: "text-gray-900",
  ["slate"]: "text-slate-900"
};

const buttonColorThemes = {
  ["black"]: "bg-black text-white hover:bg-gray-900",
  ["white"]:
    "bg-white text-black hover:bg-gray-100 focus-visible:outline-white border border-gray-300",
  ["rose"]:
    "bg-rose-600 text-white hover:bg-rose-500 focus-visible:outline-rose-600",
  ["pink"]:
    "bg-pink-600 text-white hover:bg-pink-500 focus-visible:outline-pink-600",
  ["fuchsia"]:
    "bg-fuchsia-600 text-white hover:bg-fuchsia-500 focus-visible:outline-fuchsia-600",
  ["purple"]:
    "bg-purple-600 text-white hover:bg-purple-500 focus-visible:outline-purple-600",
  ["violet"]:
    "bg-violet-600 text-white hover:bg-violet-500 focus-visible:outline-violet-600",
  ["indigo"]:
    "bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600",
  ["blue"]:
    "bg-blue-600 text-white hover:bg-blue-500 focus-visible:outline-blue-600",
  ["sky"]:
    "bg-sky-600 text-white hover:bg-sky-500 focus-visible:outline-sky-600",
  ["cyan"]:
    "bg-cyan-600 text-white hover:bg-cyan-500 focus-visible:outline-cyan-600",
  ["teal"]:
    "bg-teal-600 text-white hover:bg-teal-500 focus-visible:outline-teal-600",
  ["emerald"]:
    "bg-emerald-600 text-white hover:bg-emerald-500 focus-visible:outline-emerald-600",
  ["green"]:
    "bg-green-600 text-white hover:bg-green-500 focus-visible:outline-green-600",
  ["lime"]:
    "bg-lime-600 text-white hover:bg-lime-500 focus-visible:outline-lime-600",
  ["yellow"]:
    "bg-yellow-600 text-white hover:bg-yellow-500 focus-visible:outline-yellow-600",
  ["amber"]:
    "bg-amber-600 text-white hover:bg-amber-500 focus-visible:outline-amber-600",
  ["orange"]:
    "bg-orange-600 text-white hover:bg-orange-500 focus-visible:outline-orange-600",
  ["red"]:
    "bg-red-600 text-white hover:bg-red-500 focus-visible:outline-red-600",
  ["stone"]:
    "bg-stone-600 text-white hover:bg-stone-500 focus-visible:outline-stone-600",
  ["neutral"]:
    "bg-neutral-600 text-white hover:bg-neutral-500 focus-visible:outline-neutral-600",
  ["gray"]:
    "bg-gray-600 text-white hover:bg-gray-500 focus-visible:outline-gray-600",
  ["slate"]:
    "bg-slate-600 text-white hover:bg-slate-500 focus-visible:outline-slate-600"
};

const arrayMoveMutable = (array, fromIndex, toIndex) => {
  const startIndex = fromIndex < 0 ? array.length + fromIndex : fromIndex;

  if (startIndex >= 0 && startIndex < array.length) {
    const endIndex = toIndex < 0 ? array.length + toIndex : toIndex;

    const [item] = array.splice(fromIndex, 1);
    array.splice(endIndex, 0, item);
  }
};

const arrayMoveImmutable = (array, fromIndex, toIndex) => {
  if (!array) return;
  array = [...array];
  arrayMoveMutable(array, fromIndex, toIndex);
  return array;
};

const VideoItem = ({
  muxPlaybackId,
  muxPosterOffset,
  borderClasses = "border-gray-100",
  content,
  textColorTheme = {},
  muxAccentColor = "indigo"
}) => {
  const colorThemes = {
    ["none"]: {
      border: "border-indigo-600",
      borderHover: "border-gray-900",
      backgroundHover: "bg-indigo-600",
      background: "bg-indigo-800",
      fill: "fill-indigo-50"
    },
    ["black"]: "bg-black border p-4 mb-6 rounded",
    ["white"]: {
      border: "border-indigo-600",
      borderHover: "border-gray-900",
      backgroundHover: "bg-indigo-600",
      background: "bg-indigo-800",
      fill: "fill-indigo-50"
    },
    ["rose"]: {
      border: "border-rose-600",
      borderHover: "border-gray-900",
      backgroundHover: "bg-rose-600",
      background: "bg-rose-800",
      fill: "fill-rose-50"
    },
    ["pink"]: {
      border: "border-pink-600",
      borderHover: "border-gray-900",
      backgroundHover: "bg-pink-600",
      background: "bg-pink-800",
      fill: "fill-pink-50"
    },
    ["fuchsia"]: {
      border: "border-fuchsia-600",
      borderHover: "border-gray-900",
      backgroundHover: "bg-fuchsia-600",
      background: "bg-fuchsia-800",
      fill: "fill-fuchsia-50"
    },
    ["purple"]: {
      border: "border-purple-600",
      borderHover: "border-gray-900",
      backgroundHover: "bg-purple-600",
      background: "bg-purple-800",
      fill: "fill-purple-50"
    },
    ["violet"]: {
      border: "border-violet-600",
      borderHover: "border-gray-900",
      backgroundHover: "bg-violet-600",
      background: "bg-violet-800",
      fill: "fill-violet-50"
    },
    ["indigo"]: {
      border: "border-indigo-600",
      borderHover: "border-gray-900",
      backgroundHover: "bg-indigo-600",
      background: "bg-indigo-800",
      fill: "fill-indigo-50"
    },
    ["indigo-inverted"]: {
      border: "border-indigo-200",
      borderHover: "border-indigo-300",
      backgroundHover: "bg-indigo-50",
      background: "bg-white",
      fill: "fill-indigo-700"
    },
    ["blue"]: {
      border: "border-blue-600",
      borderHover: "border-gray-900",
      backgroundHover: "bg-blue-600",
      background: "bg-blue-800",
      fill: "fill-blue-50"
    },
    ["sky"]: {
      border: "border-sky-600",
      borderHover: "border-gray-900",
      backgroundHover: "bg-sky-600",
      background: "bg-sky-800",
      fill: "fill-sky-50"
    },
    ["cyan"]: {
      border: "border-cyan-600",
      borderHover: "border-gray-900",
      backgroundHover: "bg-cyan-600",
      background: "bg-cyan-800",
      fill: "fill-cyan-50"
    },
    ["teal"]: {
      border: "border-teal-600",
      borderHover: "border-gray-900",
      backgroundHover: "bg-teal-600",
      background: "bg-teal-800",
      fill: "fill-teal-50"
    },
    ["emerald"]: {
      border: "border-emerald-600",
      borderHover: "border-gray-900",
      backgroundHover: "bg-emerald-600",
      background: "bg-emerald-800",
      fill: "fill-emerald-50"
    },
    ["green"]: {
      border: "border-green-600",
      borderHover: "border-gray-900",
      backgroundHover: "bg-green-600",
      background: "bg-green-800",
      fill: "fill-green-50"
    },
    ["lime"]: {
      border: "border-lime-600",
      borderHover: "border-gray-900",
      backgroundHover: "bg-lime-600",
      background: "bg-lime-800",
      fill: "fill-lime-50"
    },
    ["yellow"]: {
      border: "border-yellow-600",
      borderHover: "border-gray-900",
      backgroundHover: "bg-yellow-600",
      background: "bg-yellow-800",
      fill: "fill-yellow-50"
    },
    ["amber"]: {
      border: "border-amber-600",
      borderHover: "border-gray-900",
      backgroundHover: "bg-amber-600",
      background: "bg-amber-800",
      fill: "fill-amber-50"
    },
    ["orange"]: {
      border: "border-orange-600",
      borderHover: "border-gray-900",
      backgroundHover: "bg-orange-600",
      background: "bg-orange-800",
      fill: "fill-orange-50"
    },
    ["red"]: {
      border: "border-red-600",
      borderHover: "border-gray-900",
      backgroundHover: "bg-red-600",
      background: "bg-red-800",
      fill: "fill-red-50"
    },
    ["stone"]: {
      border: "border-stone-600",
      borderHover: "border-gray-900",
      backgroundHover: "bg-stone-600",
      background: "bg-stone-800",
      fill: "fill-stone-50"
    },
    ["neutral"]: {
      border: "border-neutral-600",
      borderHover: "border-gray-900",
      backgroundHover: "bg-neutral-600"
    },
    ["gray"]: {
      border: "border-gray-600",
      borderHover: "border-gray-900",
      backgroundHover: "bg-gray-600",
      background: "bg-gray-800",
      fill: "fill-gray-50"
    },
    ["slate"]: {
      border: "border-slate-600",
      borderHover: "border-gray-900",
      backgroundHover: "bg-slate-600",
      background: "bg-slate-800",
      fill: "fill-slate-50"
    }
  };

  console.log("muxAccentColor", muxAccentColor);

  if (!(muxAccentColor in colorThemes)) muxAccentColor = "indigo";

  const [showVideo, setShowVideo] = useState(false);

  if (content) borderClasses = `${backgroundColorThemes} mb-4`;

  const videoOut = showVideo ? (
    <mux-video
      style={{ width: "100%", aspectRatio: "16/9", objectFit: "contain" }}
      className={`flex ${borderClasses}`}
      playback-id={muxPlaybackId}
      metadata-video-title="About FirstWho"
      disable-tracking
      disable-cookies
      controls
      autoplay
    ></mux-video>
  ) : (
    <div
      onClick={() => {
        setShowVideo(true);
      }}
      className={`group/item cursor-pointer aspect-video rounded-lg ${borderClasses} grid`}
    >
      <img
        className="object-cover col-start-1 row-start-1"
        src={`https://image.mux.com/${muxPlaybackId}/thumbnail.jpg?width=1920&height=1080&time=${
          muxPosterOffset || 1
        }`}
      />
      <div
        className={`${colorThemes[muxAccentColor]["border"]} opacity-80 border-2 x-group-hover/item:${colorThemes[muxAccentColor]["borderHover"]} group-hover/item:${colorThemes[muxAccentColor]["backgroundHover"]} col-start-1 row-start-1 grid h-12 w-16 md:h-24 md:w-32 place-self-center rounded-full ${colorThemes[muxAccentColor]["background"]}`}
      >
        <svg
          className="mt-2 md:mt-3 h-8 w-8 md:h-20 md:w-20 place-self-center"
          viewBox="0 0 100 125"
        >
          <path
            className={`${colorThemes[muxAccentColor]["fill"]}`}
            d="m77.6 54.3-46 26.6c-2 1.2-4.6-.3-4.6-2.7V25c0-2.4 2.6-3.8 4.6-2.7l46 26.6c2 1.3 2 4.2 0 5.4z"
          />
        </svg>
      </div>
    </div>
  );

  return (
    <>
      {videoOut}
      {content && (
        <TextLeft content={content} textColorTheme={textColorTheme} />
      )}
    </>
  );
};

const SortableList = ({
  rows,
  dispatch,
  collection,
  sortApi,
  idField = "id",
  sortableItems = [],
  setIsSorting
}) => (
  <DndContext
    id={collection}
    modifiers={[restrictToVerticalAxis]}
    onDragStart={({ active: { id } }) => {
      setIsSorting(id);
    }}
    onDragCancel={() => {
      setIsSorting(null);
    }}
    onDragEnd={async ({ active: { id: activeId }, over: { id: overId } }) => {
      const oldIndex = rows.findIndex((row) => row[idField] === activeId);
      const newIndex = rows.findIndex((row) => row[idField] === overId);
      let sortedRows = arrayMoveImmutable(rows, oldIndex, newIndex);
      let ids = sortedRows.map((row) => row[idField]);

      dispatch({
        type: "SORT_ROWS",
        data: {
          collection: collection || null,
          oldIndex: oldIndex,
          newIndex: newIndex,
          sortedRows,
          ids,
          idField
        }
      });

      // api
      if (sortApi) await sortApi({ ids });

      setIsSorting(null);
    }}
  >
    <SortableContext items={rows} strategy={verticalListSortingStrategy}>
      {sortableItems}
    </SortableContext>
  </DndContext>
);

// NOTE localFont is NextJS font object

const useScript = (url) => {
  useEffect(() => {
    if (!url) return;
    const script = document.createElement("script");

    script.src = url;
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [url]);
};

const useOnScreen = (ref, setActiveHeader, anchor) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!(typeof entry === "object" && entry !== null)) return;
        if (entry.isIntersecting === true) setActiveHeader(anchor);
      },
      { rootMargin: "0px 0px -300px 0px" }
    );

    if (!(typeof ref.current === "object" && ref.current !== null)) return;

    observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  }, [ref, anchor, setActiveHeader]);
};

const TocItem = ({
  id,
  heading,
  showHeading,
  editCallback,
  deleteCallback,
  buttonClasses,
  offset,
  activeUntil,
  matched,
  visibleSections,
  localFont,
  showMeter,
  sortCollection,
  isSorting,
  tocItemClasses,
  tocItemMatchedClasses
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    sortCollection
      ? useSortable({ id })
      : {
          attributes: {},
          listeners: {},
          setNodeRef: null,
          transform: "",
          transition: ""
        };

  const style = sortCollection
    ? {
        transform: CSS.Translate.toString(transform),
        transition
      }
    : {};

  const [isDeleting, setIsDeleting] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const showStuff = editCallback && ((isHovering && !isSorting) || isSorting);

  const itemClasses = tocItemClasses
    ? `${localFont.className} grow space-x-2 cursor-pointer ${tocItemClasses} ${
        matched && offset <= activeUntil
          ? tocItemMatchedClasses
          : "text-gray-500"
      }`
    : `${editCallback ? "hover:underline" : ""} ${
        matched && offset <= activeUntil
          ? "text-slate-800"
          : editCallback
          ? "text-slate-800"
          : "text-gray-500"
      } ${localFont.className} grow ${
        showMeter ? "pl-4" : ""
      } pr-2 space-x-2 hover:text-gray-900 text-lg cursor-pointer ${
        showHeading ? "" : "opacity-50"
      }`;

  return (
    <li
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={`${
        isSorting ? "bg-gray-50 z-index-50" : ""
      } flex items-center relative ${
        editCallback ? "pt-2 first:pt-0 pl-4" : ""
      }`}
    >
      {showMeter && offset === 0 && (
        <div className="absolute h-1/2 w-4 top-0 -left-2 bg-white z-10"></div>
      )}
      {showMeter && offset === visibleSections.length - 1 && (
        <div className="absolute h-1/2 w-4 bottom-0 -left-2 bg-white z-10"></div>
      )}
      {showMeter && (
        <div
          className={`${
            matched && offset <= activeUntil ? "bg-slate-700" : "bg-white"
          } shrink-0 rounded-full w-3 h-3 border-slate-800 border-2 -ml-[7px] z-20`}
        ></div>
      )}
      <div className="flex grow">
        <Transition
          show={showStuff || false}
          className="transition-all duration-500 overflow-hidden"
          enterFrom="transform scale-95 opacity-0 max-h-0"
          enterTo="transform scale-100 opacity-100 max-h-96"
          leaveFrom="transform scale-100 opacity-100 max-h-96"
          leaveTo="transform scale-95 opacity-0 max-h-0"
        >
          <div
            {...listeners}
            className="h-6 w-6 inline-block text-slate-500 -ml-1 mr-1 shrink"
            aria-hidden="true"
            style={{ marginTop: "2px" }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.1813 1.68179C7.35704 1.50605 7.64196 1.50605 7.8177 1.68179L10.3177 4.18179C10.4934 4.35753 10.4934 4.64245 10.3177 4.81819C10.142 4.99392 9.85704 4.99392 9.6813 4.81819L7.9495 3.08638L7.9495 11.9136L9.6813 10.1818C9.85704 10.0061 10.142 10.0061 10.3177 10.1818C10.4934 10.3575 10.4934 10.6424 10.3177 10.8182L7.8177 13.3182C7.73331 13.4026 7.61885 13.45 7.4995 13.45C7.38015 13.45 7.26569 13.4026 7.1813 13.3182L4.6813 10.8182C4.50557 10.6424 4.50557 10.3575 4.6813 10.1818C4.85704 10.0061 5.14196 10.0061 5.3177 10.1818L7.0495 11.9136L7.0495 3.08638L5.3177 4.81819C5.14196 4.99392 4.85704 4.99392 4.6813 4.81819C4.50557 4.64245 4.50557 4.35753 4.6813 4.18179L7.1813 1.68179Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
        </Transition>

        <div className="grow flex flex-col">
          <ScrollTo selector={`#heading-${id}`} className="flex">
            <span className={itemClasses}>{heading}</span>
          </ScrollTo>

          <Transition
            show={showStuff || false}
            className="transition-all duration-500 overflow-hidden"
            enterFrom="transform scale-95 opacity-0 max-h-0"
            enterTo="transform scale-100 opacity-100 max-h-96"
            leaveFrom="transform scale-100 opacity-100 max-h-96"
            leaveTo="transform scale-95 opacity-0 max-h-0"
          >
            <div>
              <div className={`${showMeter ? "pl-4" : ""} flex gap-x-2`}>
                <span
                  onClick={() => editCallback(id)}
                  className={buttonClasses}
                >
                  Edit
                </span>
                <span
                  onClick={() => setIsDeleting(!isDeleting)}
                  className={buttonClasses}
                >
                  Delete
                </span>
              </div>
              {isDeleting && (
                <div className="bg-white p-4 flex flex-col gap-y-4 rounded-md my-2">
                  <div className="font-semibold">
                    Are you sure you want to delete this section?
                  </div>
                  <div className="flex gap-x-4">
                    <span
                      onClick={() => setIsDeleting(false)}
                      className="cursor-pointer rounded-md bg-gray-200 px-2.5 py-1.5 text-base font-semibold text-gray-900 shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-200"
                    >
                      Cancel
                    </span>
                    <span
                      onClick={async () => {
                        await deleteCallback({ id });
                      }}
                      className="cursor-pointer rounded-md bg-red-600 px-2.5 py-1.5 text-base font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                    >
                      Delete
                    </span>
                  </div>
                </div>
              )}
            </div>
          </Transition>
        </div>
      </div>
    </li>
  );
};

const TableOfContents = ({
  sections,
  activeHeader,
  localFont,
  showInvisibleHeaders,
  showMeter,
  tocHeading = "Contents",
  sortApi = () => {},
  dispatch,
  sortCollection,
  tocGridClasses = "col-span-12 md:col-span-1",
  tocItemClasses,
  tocItemMatchedClasses
}) => {
  const [isSorting, setIsSorting] = useState(null);

  const visibleSections = showInvisibleHeaders
    ? sections
    : sections.filter(({ show_heading: showHeading }) => showHeading === true);
  const [matched, activeUntil] =
    activeHeader === null
      ? [false, -1]
      : visibleSections.reduce(
          ([isMatched, matchedOffset], { id }, offset) => {
            if (isMatched) return [isMatched, matchedOffset];
            if (`heading-${id}` === activeHeader) return [true, offset];
            return [false, -1];
          },
          [false, -1]
        );

  return (
    <div className={tocGridClasses}>
      <div
        className={`sticky ${
          sortCollection ? "top-0" : "top-[95px]"
        } hidden lg:block`}
      >
        {tocHeading && (
          <h3
            className={`${
              (localFont && localFont?.className) || ""
            } -ml-1 mb-3 text-xl font-semibold text-slate-700`}
          >
            {tocHeading}
          </h3>
        )}
        <ul
          className={`${sortCollection ? "" : "mt-2"} ${
            tocHeading ? "lg:mt-4" : ""
          } ${
            sortCollection
              ? "lg:space-y-2 grid grid-cols-1 divide-y"
              : "lg:space-y-4"
          } ${showMeter ? "border-l-2 border-slate-700" : ""}`}
        >
          <SortableList
            setIsSorting={setIsSorting}
            rows={visibleSections}
            sortableItems={visibleSections.map(
              (
                {
                  id,
                  heading,
                  show_heading: showHeading,
                  editCallback,
                  deleteCallback,
                  buttonClasses
                },
                offset
              ) => (
                <TocItem
                  matched={matched}
                  activeUntil={activeUntil}
                  key={id}
                  id={id}
                  heading={heading}
                  showHeading={showHeading}
                  offset={offset}
                  visibleSections={visibleSections}
                  localFont={localFont}
                  editCallback={editCallback}
                  deleteCallback={deleteCallback}
                  buttonClasses={buttonClasses}
                  showMeter={showMeter}
                  sortCollection={sortCollection}
                  isSorting={id === isSorting}
                  tocItemClasses={tocItemClasses}
                  tocItemMatchedClasses={tocItemMatchedClasses}
                />
              )
            )}
            collection={sortCollection}
            dispatch={dispatch}
            sortApi={sortApi}
          />
        </ul>
      </div>
    </div>
  );
};

const Heading = ({
  title,
  level = 2,
  anchor,
  setActiveHeader,
  localFont,
  textColorTheme = "none",
  showCopyLink = true,
  headingClasses = "text-2xl font-semibold xl:mb-2 xl:text-3xl"
}) => {
  const ref = useRef();
  useOnScreen(ref, setActiveHeader, anchor);

  if (level === 1)
    return (
      <h1
        ref={ref}
        className={`${(localFont && localFont?.className) || ""} ${
          textColorThemes[textColorTheme]
        } mb-2 text-base font-semibold xl:mb-4 xl:text-4xl`}
      >
        {title}
      </h1>
    );
  if (level === 2)
    return (
      <h2
        onClick={() => {
          if (!showCopyLink) return;
          copy(
            window.location.origin + window.location.pathname + `#${anchor}`
          );
          toast.success("Link copied to clipboard", {
            position: "bottom-center"
          });
        }}
        ref={ref}
        className={`${
          (localFont && localFont?.className) || ""
        } cursor-pointer ${headingClasses} flex items-center ${
          textColorThemes[textColorTheme]
        }`}
      >
        <div>{title}</div>
        {showCopyLink && (
          <div className="p-1 ml-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
              />
            </svg>
          </div>
        )}
      </h2>
    );
  if (level === 3)
    return (
      <h3
        ref={ref}
        className={`${localFont.className} text-md font-semibold xl:mb-2 xl:text-2xl ${textColorThemes[textColorTheme]}`}
      >
        {title}
      </h3>
    );
  if (level === 4)
    return (
      <h4
        ref={ref}
        className={`${localFont.className} text-base font-semibold xl:mb-2 xl:text-xl ${textColorThemes[textColorTheme]}`}
      >
        {title}
      </h4>
    );
  if (level === 5)
    return (
      <h5
        ref={ref}
        className={`${localFont.className} text-base font-semibold xl:mb-2 ${textColorThemes[textColorTheme]}`}
      >
        {title}
      </h5>
    );
  return null;
};

const TextLeft = ({ content, textColorTheme = "none", contentFont = {} }) => (
  <div
    className={`${
      contentFont?.className || ""
    } leading-loose prose lg:prose-lg max-w-none ${
      textColorThemes[textColorTheme]
    }`}
    dangerouslySetInnerHTML={{ __html: content }}
  />
);

const TextRight = ({ content, textColorTheme = "none", contentFont = {} }) => (
  <div
    className={`${
      contentFont?.className || ""
    } text-right leading-loose prose lg:prose-lg max-w-none ${
      textColorThemes[textColorTheme]
    }`}
    dangerouslySetInnerHTML={{ __html: content }}
  />
);

const TextCenter = ({ content, textColorTheme = "none", contentFont = {} }) => (
  <div
    className={`${
      contentFont?.className || ""
    } text-center leading-loose prose lg:prose-lg max-w-none ${
      textColorThemes[textColorTheme]
    }`}
    dangerouslySetInnerHTML={{ __html: content }}
  />
);

const ImageOnLeft = ({
  content,
  imageUrl,
  colSpanContent = "col-span-12 md:col-span-6",
  colSpanImage = "col-span-12 md:col-span-6",
  contentFont = {}
}) => (
  <div className="grid grid-cols-12 gap-4">
    <div className={colSpanImage}>
      <img src={imageUrl} alt="" />
    </div>
    <div
      className={`${colSpanContent} ${
        contentFont?.className || ""
      } leading-loose prose lg:prose-lg max-w-none`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  </div>
);

const ImageOnRight = ({
  content,
  imageUrl,
  colSpanContent = "w-full",
  colSpanImage = "w-full md:w-1/2",
  ctaContent = null,
  contentFont = {}
}) => (
  <div>
    <img
      src={imageUrl}
      alt=""
      className={`${colSpanImage} float-none md:float-right ml-0 md:ml-8 mb-4`}
    />
    <div
      className={`${colSpanContent} ${
        contentFont?.className || ""
      } leading-loose prose lg:prose-lg max-w-none`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
    {ctaContent}
  </div>
);

const ImageCenter = ({ imageUrl, height, width }) => (
  <div className="flex justify-center">
    <img src={imageUrl} height={height} width={width} alt="" />
  </div>
);

const ImageCenterFull = ({ imageUrl }) => (
  <div>
    <img className="object-fill" src={imageUrl} alt="" />
  </div>
);

const ImageLeft = ({ imageUrl, height, width }) => (
  <div className="flex justify-start">
    <img src={imageUrl} height={height} width={width} alt="" />
  </div>
);

const ImageRight = ({ imageUrl, height, width }) => (
  <div className="flex justify-end">
    <img src={imageUrl} height={height} width={width} alt="" />
  </div>
);

const Section = ({
  sectionOut,
  id,
  headingOut,
  scripts,
  backgroundColorTheme = "none",
  emptyContent = false
}) => {
  useScript(scripts?.[0] || false);

  let className = backgroundColorThemes[backgroundColorTheme];
  if (emptyContent) className = className.replace("mb-6", "mb-0");

  return (
    <section key={id} className={className}>
      <div className="relative">
        <a
          className="absolute -top-10"
          id={`heading-${id}`}
          name={`heading-${id}`}
        ></a>
      </div>

      {headingOut}
      {sectionOut}
    </section>
  );
};

const CTAButton = ({ label, url, buttonColorTheme = "indigo" }) => (
  <a
    href={url}
    className={`${buttonColorThemes[buttonColorTheme]} rounded-md px-3.5 py-2.5 text-base font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`}
  >
    {label}
  </a>
);

const CTALink = ({ label, url }) => (
  <a
    href={url}
    className="text-base font-semibold leading-6 text-gray-900 hover:underline"
  >
    {label}
  </a>
);

const CTAForm = ({ iframeUrl, type, formOrientation }) => {
  let classes = "";
  switch (`${type}__${formOrientation}`) {
    case "form-email__vertical":
      classes = "w-full h-36";
      break;
    case "form-email-name__vertical":
      classes = "w-full h-64";
      break;
    case "form-scheduling__vertical":
      classes = "w-full h-64";
      break;
    case "form-email__horizontal":
      classes = "w-full h-44 md:h-20";
      break;
    case "form-email-name__horizontal":
      classes = "w-full h-56 md:h-20";
      break;
    case "form-scheduling__horizontal":
      classes = "w-full h-56 md:h-20";
      break;
  }

  return (
    <iframe
      src={iframeUrl}
      className={classes}
      sandbox="allow-top-navigation allow-scripts allow-forms allow-same-origin"
    />
  );
};

const CTASection = ({
  id,
  image,
  ctaData = {},
  content,
  buttonColorTheme,
  textColorTheme
}) => {
  const {
    cta_primary: primaryLabel,
    cta_primary_type: primaryType,
    cta_primary_url: primaryUrl,
    cta_secondary: secondaryLabel,
    cta_secondary_type: secondaryType,
    cta_secondary_url: secondaryUrl,
    job_id: jobId,
    workflow_step_id: workflowStepId,
    url: iframeUrl,
    cta_form_orientation: formOrientation
  } = ctaData;

  const imageUrl = image && image?.url ? image.url : null;

  const ctas = [
    {
      id: `id-${id}-cta-primary`,
      type: primaryType,
      label: primaryLabel,
      url: primaryUrl
    }
  ].concat(
    secondaryLabel
      ? [
          {
            id: `id-${id}-cta-secondary`,
            type: secondaryType,
            label: secondaryLabel,
            url: secondaryUrl
          }
        ]
      : []
  );

  const ctaContent = (
    <>
      {content && (
        <TextLeft content={content} textColorTheme={textColorTheme} />
      )}
      <div className="mt-4 flex items-center gap-x-6 rounded-lg">
        {ctas.map(({ id, type, label, url }) => {
          if (type === "button")
            return (
              <CTAButton
                key={id}
                label={label}
                url={url}
                buttonColorTheme={buttonColorTheme}
              />
            );
          if (type === "link")
            return (
              <CTALink
                key={id}
                label={label}
                url={url}
                textColorTheme={textColorTheme}
              />
            );
          return (
            <CTAForm
              type={type}
              formOrientation={formOrientation}
              key={id}
              label={label}
              url={url}
              jobId={jobId}
              workflowStepId={workflowStepId}
              iframeUrl={iframeUrl}
            />
          );
        })}
      </div>
    </>
  );

  if (imageUrl)
    return (
      <ImageOnRight
        content={content}
        imageUrl={imageUrl}
        ctaContent={ctaContent}
      />
    );

  return <div>{ctaContent}</div>;
};

const BaseTestimonialSection = ({ heading, id, testimonials, showHeading }) => {
  return <div>Testimonials</div>;
};

export const ContentSections = ({
  showCopyLink = true,
  sections,
  colSpanContent,
  colSpanImage,
  localFont,
  headingFont,
  contentFont,
  headingClasses,
  setActiveHeader = () => {},
  TestimonialComponent = BaseTestimonialSection
}) =>
  sections.map(
    ({
      content,
      content_type: contentType,
      heading,
      heading_level: headingLevel,
      id,
      image,
      show_heading: showHeading,
      ctaData,
      scripts,
      backgroundColorTheme,
      textColorTheme,
      headingColorTheme,
      buttonColorTheme,
      muxPlaybackId,
      muxPosterOffset,
      muxAccentColor,
      borderClasses,
      testimonials
    }) => {
      const imageUrl = image && "url" in image ? image["url"] : null;
      const imageHeight = image && "height" in image ? image["height"] : null;
      const imageWidth = image && "width" in image ? image["width"] : null;
      const emptyContent =
        ([
          CONTENT_TYPE_TEXT_LEFT,
          CONTENT_TYPE_TEXT_RIGHT,
          CONTENT_TYPE_TEXT_CENTER
        ].includes(contentType) &&
          (content === null ||
            content === "" ||
            content === "<div></div>" ||
            content === "<p></p>")) ||
        false;

      const headingOut =
        showHeading === false || contentType === CONTENT_TYPE_DIVIDER ? null : (
          <Heading
            title={heading}
            level={headingLevel}
            anchor={`heading-${id}`}
            setActiveHeader={setActiveHeader}
            localFont={headingFont || localFont}
            textColorTheme={headingColorTheme}
            showCopyLink={showCopyLink}
            headingClasses={headingClasses}
          />
        );
      let sectionOut;
      switch (contentType) {
        case CONTENT_TYPE_TEXT_LEFT:
          sectionOut = emptyContent ? null : (
            <TextLeft
              content={content}
              textColorTheme={textColorTheme || "none"}
              contentFont={contentFont || localFont}
            />
          );
          break;
        case CONTENT_TYPE_TEXT_RIGHT:
          sectionOut = emptyContent ? null : (
            <TextRight
              content={content}
              textColorTheme={textColorTheme || "none"}
              contentFont={contentFont || localFont}
            />
          );
          break;
        case CONTENT_TYPE_TEXT_CENTER:
          sectionOut = emptyContent ? null : (
            <TextCenter
              content={content}
              textColorTheme={textColorTheme || "none"}
              contentFont={contentFont || localFont}
            />
          );
          break;
        case CONTENT_TYPE_TEXT_IMAGE_LEFT:
          sectionOut = (
            <ImageOnLeft
              content={content}
              imageUrl={imageUrl}
              colSpanContent={colSpanContent}
              colSpanImage={colSpanImage}
              contentFont={contentFont || localFont}
            />
          );
          break;
        case CONTENT_TYPE_TEXT_IMAGE_RIGHT:
          sectionOut = (
            <ImageOnRight
              content={content}
              imageUrl={imageUrl}
              colSpanContent={colSpanContent}
              colSpanImage={colSpanImage}
              contentFont={contentFont || localFont}
            />
          );
          break;
        case CONTENT_TYPE_IMAGE_LEFT:
          sectionOut = (
            <ImageLeft
              imageUrl={imageUrl}
              height={imageHeight}
              width={imageWidth}
            />
          );
          break;
        case CONTENT_TYPE_IMAGE_RIGHT:
          sectionOut = (
            <ImageRight
              imageUrl={imageUrl}
              height={imageHeight}
              width={imageWidth}
            />
          );
          break;
        case CONTENT_TYPE_IMAGE_CENTER:
          sectionOut = (
            <ImageCenter
              imageUrl={imageUrl}
              height={imageHeight}
              width={imageWidth}
            />
          );
          break;
        case CONTENT_TYPE_IMAGE_FULL:
          sectionOut = <ImageCenterFull imageUrl={imageUrl} />;
          break;

        case CONTENT_TYPE_DIVIDER:
          sectionOut = (
            <hr className="my-4 mx-auto w-10/12 border-b-2 border-gray-300 md:my-10" />
          );
          break;

        case CONTENT_TYPE_MUX_VIDEO:
          sectionOut = (
            <VideoItem
              muxPlaybackId={muxPlaybackId}
              muxAccentColor={muxAccentColor}
              muxPosterOffset={muxPosterOffset}
              content={content}
              textColorTheme={textColorTheme || "none"}
              borderClasses={borderClasses || "border-gray-100"}
            />
          );
          break;

        case CONTENT_TYPE_TESTIMONIAL:
          sectionOut = (
            <TestimonialComponent
              heading={heading}
              id={id}
              testimonials={testimonials}
              showHeading={showHeading}
            />
          );
          break;

        case CONTENT_TYPE_SIGN_UP:
          sectionOut = (
            <CTASection
              heading={heading}
              id={id}
              image={image}
              showHeading={showHeading}
              ctaData={ctaData}
              content={content}
              buttonColorTheme={buttonColorTheme}
              textColorTheme={textColorTheme}
              contentFont={contentFont || localFont}
            />
          );
          break;

        default:
          sectionOut = null;
          break;
      }

      return (
        <Section
          key={id}
          sectionOut={sectionOut}
          id={id}
          headingOut={headingOut}
          scripts={scripts}
          backgroundColorTheme={backgroundColorTheme || "none"}
          emptyContent={emptyContent}
        />
      );
    }
  );

export const DoContentSections = ({
  sections,
  localFont,
  tocFont,
  headingFont,
  contentFont,
  showInvisibleHeaders = false,
  showMeter = true,
  showCopyLink = true,
  tocHeading = "Contents",
  sortApi = () => {},
  dispatch,
  sortCollection,
  outerGridClasses = "grid grid-cols-4 gap-0 md:gap-6",
  tocGridClasses = "col-span-4 md:col-span-1",
  mainGridClasses = "col-span-4 md:col-span-3",
  tocItemClasses,
  tocItemMatchedClasses,
  headingClasses = "text-2xl font-semibold xl:mb-2 xl:text-3xl",
  TestimonialComponent = BaseTestimonialSection
}) => {
  const [activeHeader, setActiveHeader] = useState(null);

  return (
    <div className={outerGridClasses}>
      <TableOfContents
        sections={sections}
        activeHeader={activeHeader}
        localFont={tocFont || localFont}
        showInvisibleHeaders={showInvisibleHeaders}
        showMeter={showMeter}
        tocHeading={tocHeading}
        sortApi={sortApi}
        dispatch={dispatch}
        sortCollection={sortCollection}
        tocGridClasses={tocGridClasses}
        tocItemClasses={tocItemClasses}
        tocItemMatchedClasses={tocItemMatchedClasses}
      />
      <div className={mainGridClasses}>
        <ContentSections
          showCopyLink={showCopyLink}
          sections={sections}
          setActiveHeader={setActiveHeader}
          localFont={localFont}
          headingFont={headingFont}
          contentFont={contentFont}
          headingClasses={headingClasses}
          TestimonialComponent={TestimonialComponent || BaseTestimonialSection}
        />
      </div>
    </div>
  );
};
