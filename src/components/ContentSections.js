"use client";

import React, { useEffect, useRef, useState } from "react";
import { FaLink } from "react-icons/fa";
import copy from "copy-to-clipboard";
import toast from "react-hot-toast";
import ScrollTo from "react-scroll-into-view";

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
  ["white"]: "bg-white border border-gray-100 p-4 mb-6 rounded",
  ["rose"]: "bg-rose-100 border border-rose-200 p-4 mb-6 rounded",
  ["pink"]: "bg-pink-100 border border-pink-200 p-4 mb-6 rounded",
  ["fuchsia"]: "bg-fuchsia-100 border border-fuchsia-200 p-4 mb-6 rounded",
  ["purple"]: "bg-purple-100 border border-purple-200 p-4 mb-6 rounded",
  ["violet"]: "bg-violet-100 border border-violet-200 p-4 mb-6 rounded",
  ["indigo"]: "bg-indigo-100 border border-indigo-200 p-4 mb-6 rounded",
  ["blue"]: "bg-blue-100 border border-blue-200 p-4 mb-6 rounded",
  ["sky"]: "bg-sky-100 border border-sky-200 p-4 mb-6 rounded",
  ["cyan"]: "bg-cyan-100 border border-cyan-200 p-4 mb-6 rounded",
  ["teal"]: "bg-teal-100 border border-teal-200 p-4 mb-6 rounded",
  ["emerald"]: "bg-emerald-100 border border-emerald-200 p-4 mb-6 rounded",
  ["green"]: "bg-green-100 border border-green-200 p-4 mb-6 rounded",
  ["lime"]: "bg-lime-100 border border-lime-200 p-4 mb-6 rounded",
  ["yellow"]: "bg-yellow-100 border border-yellow-200 p-4 mb-6 rounded",
  ["amber"]: "bg-amber-100 border border-amber-200 p-4 mb-6 rounded",
  ["orange"]: "bg-orange-100 border border-orange-200 p-4 mb-6 rounded",
  ["red"]: "bg-red-100 border border-red-200 p-4 mb-6 rounded",
  ["stone"]: "bg-stone-100 border border-stone-200 p-4 mb-6 rounded",
  ["neutral"]: "bg-neutral-100 border border-neutral-200 p-4 mb-6 rounded",
  ["gray"]: "bg-gray-100 border border-gray-200 p-4 mb-6 rounded",
  ["slate"]: "bg-slate-100 border border-slate-200 p-4 mb-6 rounded"
};

const textColorThemes = {
  ["none"]: "",
  ["black"]: "text-black",
  ["white"]: "text-white",
  ["rose"]: "text-rose-800",
  ["pink"]: "text-pink-800",
  ["fuchsia"]: "text-fuchsia-800",
  ["purple"]: "text-purple-800",
  ["violet"]: "text-violet-800",
  ["indigo"]: "text-indigo-800",
  ["blue"]: "text-blue-800",
  ["sky"]: "text-sky-800",
  ["cyan"]: "text-cyan-800",
  ["teal"]: "text-teal-800",
  ["emerald"]: "text-emerald-800",
  ["green"]: "text-green-800",
  ["lime"]: "text-lime-800",
  ["yellow"]: "text-yellow-800",
  ["amber"]: "text-amber-800",
  ["orange"]: "text-orange-800",
  ["red"]: "text-red-800",
  ["stone"]: "text-stone-800",
  ["neutral"]: "text-neutral-800",
  ["gray"]: "text-gray-800",
  ["slate"]: "text-slate-800"
};

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
        if (entry.isIntersecting === true) setActiveHeader(anchor);
      },
      { rootMargin: "0px 0px -300px 0px" }
    );

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
  showMeter
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <li
      className={`flex items-center relative ${
        isHovering && editCallback ? "bg-gray-100 rounded-md" : ""
      } ${editCallback ? "-ml-2 px-2" : ""}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
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
      <div className="flex flex-col">
        <ScrollTo selector={`#heading-${id}`}>
          <div
            href={`#heading-${id}`}
            className={`${
              isHovering || (matched && offset <= activeUntil)
                ? "text-slate-800"
                : "text-gray-500"
            } ${localFont.className} grow ${
              showMeter ? "pl-4" : ""
            } pr-2 space-x-2 hover:text-gray-900 text-lg cursor-pointer ${
              showHeading ? "" : "opacity-50"
            }`}
          >
            {heading}
          </div>
        </ScrollTo>
        {isHovering && editCallback && (
          <>
            <div
              className={`${
                showMeter ? "pl-4" : ""
              } pr-2 flex gap-x-2 mt-1 mb-2`}
            >
              <span onClick={() => editCallback(id)} className={buttonClasses}>
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
          </>
        )}
      </div>
    </li>
  );
};

const TableOfContents = ({
  sections,
  activeHeader,
  localFont,
  showInvisibleHeaders,
  showMeter
}) => {
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
    <div className="col-span-12 md:col-span-1">
      <div className="sticky top-[95px] hidden lg:block">
        <h3
          className={`${localFont.className} -ml-1 mb-3 text-xl font-semibold text-slate-700`}
        >
          Contents
        </h3>
        <ul
          className={`mt-2 lg:mt-4 lg:space-y-4 ${
            showMeter ? "border-l-2 border-slate-700" : ""
          }`}
        >
          {visibleSections.length > 0 &&
            visibleSections.map(
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
                />
              )
            )}
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
  textColorTheme = "none"
}) => {
  const ref = useRef();
  useOnScreen(ref, setActiveHeader, anchor);

  if (level === 1)
    return (
      <h1
        ref={ref}
        className={`${localFont.className} ${textColorThemes[textColorTheme]} mb-2 text-base font-semibold xl:mb-4 xl:text-4xl`}
      >
        {title}
      </h1>
    );
  if (level === 2)
    return (
      <h2
        onClick={() => {
          copy(
            window.location.origin + window.location.pathname + `#${anchor}`
          );
          toast.success("Link copied to clipboard", {
            position: "bottom-center"
          });
        }}
        ref={ref}
        className={`${localFont.className} cursor-pointer text-2xl font-semibold xl:mb-2 xl:text-3xl flex items-center ${textColorThemes[textColorTheme]}`}
      >
        <div>{title}</div>
        <div className="rounded-full bg-gray-100 p-1 ml-2">
          <FaLink className="h-4 w-4 text-gray-500" />
        </div>
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

const TextLeft = ({ content, textColorTheme = "none" }) => (
  <div
    className={`leading-loose prose lg:prose-lg max-w-max ${textColorThemes[textColorTheme]}`}
    dangerouslySetInnerHTML={{ __html: content }}
  />
);

const TextRight = ({ content, textColorTheme = "none" }) => (
  <div
    className={`text-right leading-loose prose lg:prose-lg max-w-max ${textColorThemes[textColorTheme]}`}
    dangerouslySetInnerHTML={{ __html: content }}
  />
);

const TextCenter = ({ content, textColorTheme = "none" }) => (
  <div
    className={`text-center leading-loose prose lg:prose-lg max-w-max ${textColorThemes[textColorTheme]}`}
    dangerouslySetInnerHTML={{ __html: content }}
  />
);

const ImageOnLeft = ({
  content,
  imageUrl,
  colSpanContent = "col-span-12 md:col-span-6",
  colSpanImage = "col-span-12 md:col-span-6"
}) => (
  <div className="grid grid-cols-12 gap-4">
    <div className={colSpanImage}>
      <img src={imageUrl} alt="" />
    </div>
    <div
      className={`${colSpanContent} leading-loose prose lg:prose-lg max-w-max`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  </div>
);

const ImageOnRight = ({
  content,
  imageUrl,
  colSpanContent = "w-full",
  colSpanImage = "w-full md:w-1/2",
  ctaContent = null
}) => (
  <div>
    <img
      src={imageUrl}
      alt=""
      className={`${colSpanImage} float-none md:float-right ml-0 md:ml-8 mb-4`}
    />
    <div
      className={`${colSpanContent} leading-loose prose lg:prose-lg max-w-max`}
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
  backgroundColorTheme = "none"
}) => {
  useScript(scripts?.[0] || false);

  return (
    <section key={id} className={backgroundColorThemes[backgroundColorTheme]}>
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
      classes = "w-full h-20";
      break;
    case "form-email-name__horizontal":
      classes = "w-full h-20";
      break;
    case "form-scheduling__horizontal":
      classes = "w-full h-20";
      break;
  }

  return (
    <iframe
      src={iframeUrl}
      className={classes}
      sandbox="allow-top-navigation allow-scripts allow-forms"
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

export const ContentSections = ({
  sections,
  colSpanContent,
  colSpanImage,
  localFont,
  setActiveHeader = () => {}
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
      buttonColorTheme
    }) => {
      const imageUrl = image && "url" in image ? image["url"] : null;
      const imageHeight = image && "height" in image ? image["height"] : null;
      const imageWidth = image && "width" in image ? image["width"] : null;

      const headingOut =
        showHeading === false || contentType === CONTENT_TYPE_DIVIDER ? null : (
          <Heading
            title={heading}
            level={headingLevel}
            anchor={`heading-${id}`}
            setActiveHeader={setActiveHeader}
            localFont={localFont}
            textColorTheme={headingColorTheme}
          />
        );
      let sectionOut;
      switch (contentType) {
        case CONTENT_TYPE_TEXT_LEFT:
          sectionOut = (
            <TextLeft content={content} textColorTheme={textColorTheme} />
          );
          break;
        case CONTENT_TYPE_TEXT_RIGHT:
          sectionOut = (
            <TextRight content={content} textColorTheme={textColorTheme} />
          );
          break;
        case CONTENT_TYPE_TEXT_CENTER:
          sectionOut = (
            <TextCenter content={content} textColorTheme={textColorTheme} />
          );
          break;
        case CONTENT_TYPE_TEXT_IMAGE_LEFT:
          sectionOut = (
            <ImageOnLeft
              content={content}
              imageUrl={imageUrl}
              colSpanContent={colSpanContent}
              colSpanImage={colSpanImage}
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
          backgroundColorTheme={backgroundColorTheme}
        />
      );
    }
  );

export const DoContentSections = ({
  sections,
  localFont,
  showInvisibleHeaders = false,
  showMeter = true
}) => {
  const [activeHeader, setActiveHeader] = useState(null);

  return (
    <div className="grid grid-cols-4 gap-0 lg:gap-6">
      <TableOfContents
        sections={sections}
        activeHeader={activeHeader}
        localFont={localFont}
        showInvisibleHeaders={showInvisibleHeaders}
        showMeter={showMeter}
      />
      <div className="col-span-4 lg:col-span-3">
        <ContentSections
          sections={sections}
          setActiveHeader={setActiveHeader}
          localFont={localFont}
        />
      </div>
    </div>
  );
};
