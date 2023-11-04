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

const TableOfContents = ({ sections, activeHeader, localFont }) => {
  const visibleSections = sections.filter(
    ({ show_heading: showHeading }) => showHeading === true
  );
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
        <ul className="mt-2 border-l-2 lg:mt-4 lg:space-y-4 border-slate-700">
          {visibleSections.length > 0 &&
            visibleSections.map(({ id, heading }, offset) => (
              <li key={id} className="flex items-center relative">
                {offset === 0 && (
                  <div className="absolute h-1/2 w-4 top-0 -left-2 bg-white z-10"></div>
                )}
                {offset === visibleSections.length - 1 && (
                  <div className="absolute h-1/2 w-4 bottom-0 -left-2 bg-white z-10"></div>
                )}
                <div
                  className={`${
                    matched && offset <= activeUntil
                      ? "bg-slate-700"
                      : "bg-white"
                  } shrink-0 rounded-full w-3 h-3 border-slate-800 border-2 -ml-[7px] z-20`}
                ></div>
                <ScrollTo selector={`#heading-${id}`}>
                  <div
                    href={`#heading-${id}`}
                    className={`${
                      matched && offset <= activeUntil
                        ? "text-slate-800"
                        : "text-gray-500"
                    } ${
                      localFont.className
                    } grow px-2 pl-4 pr-2 space-x-2 hover:text-gray-900 text-lg cursor-pointer`}
                  >
                    {heading}
                  </div>
                </ScrollTo>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

const Heading = ({ title, level = 2, anchor, setActiveHeader, localFont }) => {
  const ref = useRef();
  useOnScreen(ref, setActiveHeader, anchor);

  if (level === 1)
    return (
      <h1
        ref={ref}
        className={`${localFont.className} mb-2 text-base font-semibold xl:mb-4 xl:text-4xl`}
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
        className={`${localFont.className} cursor-pointer mt-4 text-2xl font-semibold xl:mb-2 xl:text-3xl flex items-center text-slate-700 hover:text-slate-900`}
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
        className={`${localFont.className} mb-2 text-md font-semibold xl:mb-4 xl:text-2xl`}
      >
        {title}
      </h3>
    );
  if (level === 4)
    return (
      <h4
        ref={ref}
        className={`${localFont.className} mb-2 text-base font-semibold xl:mb-4 xl:text-xl`}
      >
        {title}
      </h4>
    );
  if (level === 5)
    return (
      <h5
        ref={ref}
        className={`${localFont.className} mb-2 text-base font-semibold xl:mb-4`}
      >
        {title}
      </h5>
    );
  return null;
};

const TextLeft = ({ content }) => (
  <div
    className="leading-loose prose lg:prose-lg max-w-max"
    dangerouslySetInnerHTML={{ __html: content }}
  />
);

const TextRight = ({ content }) => (
  <div
    className="text-right leading-loose prose lg:prose-lg max-w-max"
    dangerouslySetInnerHTML={{ __html: content }}
  />
);

const TextCenter = ({ content }) => (
  <div
    className="text-center leading-loose prose lg:prose-lg max-w-max"
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
      <img src={imageUrl} alt=""  />
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
    <img
      src={imageUrl}
      height={height}
      width={width}
      alt=""
      
    />
  </div>
);

const ImageCenterFull = ({ imageUrl }) => (
  <div>
    <img className="object-fill" src={imageUrl} alt="" />
  </div>
);

const ImageLeft = ({ imageUrl, height, width }) => (
  <div className="flex justify-start">
    <img
      src={imageUrl}
      height={height}
      width={width}
      alt=""
      
    />
  </div>
);

const ImageRight = ({ imageUrl, height, width }) => (
  <div className="flex justify-end">
    <img
      src={imageUrl}
      height={height}
      width={width}
      alt=""
      
    />
  </div>
);

const Section = ({ sectionOut, id, headingOut, scripts }) => {
  useScript(scripts[0]);

  return (
    <section key={id} className="pt-0 pb-6">
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

const CTAButton = ({ label, url }) => (
  <a
    href={url}
    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
  >
    {label}
  </a>
);

const CTALink = ({ label, url }) => (
  <a href={url} className="text-sm font-semibold leading-6 text-gray-900">
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

const CTASection = ({ id, image, ctaData, content }) => {
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
    },
    {
      id: `id-${id}-cta-secondary`,
      type: secondaryType,
      label: secondaryLabel,
      url: secondaryUrl
    }
  ];

  const ctaContent = (
    <div className="mt-10 flex items-center gap-x-6 bg-amber-100 p-2 rounded-lg">
      {ctas.map(({ id, type, label, url }) => {
        if (type === "button")
          return <CTAButton key={id} label={label} url={url} />;
        if (type === "link")
          return <CTALink key={id} label={label} url={url} />;
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
  );

  if (imageUrl)
    return (
      <imgOnRight
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
      scripts
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
          />
        );
      let sectionOut;
      switch (contentType) {
        case CONTENT_TYPE_TEXT_LEFT:
          sectionOut = <TextLeft content={content} />;
          break;
        case CONTENT_TYPE_TEXT_RIGHT:
          sectionOut = <TextRight content={content} />;
          break;
        case CONTENT_TYPE_TEXT_CENTER:
          sectionOut = <TextCenter content={content} />;
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
        />
      );
    }
  );

export const DoContentSections = ({ sections, localFont }) => {
  const [activeHeader, setActiveHeader] = useState(null);

  return (
    <div className="grid grid-cols-4 gap-0 lg:gap-6">
      <TableOfContents sections={sections} activeHeader={activeHeader} localFont={localFont} />
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
