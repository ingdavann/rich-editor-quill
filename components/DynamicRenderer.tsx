import Image from "next/image";
import React from "react";

interface DynamicRendererProps {
  htmlContent: string;
}

const DynamicRenderer: React.FC<DynamicRendererProps> = ({ htmlContent }) => {
  // Parse the HTML content and render dynamically
  const parseHTMLContent = () => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");
    const elements = Array.from(doc.body.children);

    return elements.map((el, index) => {
      switch (el.tagName) {
        case "H1":
          return (
            <h1 key={index} className="text-2xl font-bold my-4">
              {el.textContent}
            </h1>
          );
        case "H2":
          return (
            <h2 key={index} className="text-xl font-semibold my-3">
              {el.textContent}
            </h2>
          );
          case "H3":
          return (
            <h3 key={index} className="text-lg font-medium my-2">
              {el.textContent}
            </h3>
          );
        case "H4":
          return (
            <h4 key={index} className="text-base font-medium my-2">
              {el.textContent}
            </h4>
          );
        case "H5":
          return (
            <h5 key={index} className="text-sm font-medium my-2">
              {el.textContent}
            </h5>
          );
        case "H6":
          return (
            <h6 key={index} className="text-xs font-medium my-1">
              {el.textContent}
            </h6>
          );
          case "UL":
          return (
            <ul key={index} className="list-disc list-inside my-2">
              {Array.from(el.children).map((li, liIndex) => (
                <li key={liIndex}>{li.textContent}</li>
              ))}
            </ul>
          );
        case "OL":
          return (
            <ol key={index} className="list-decimal list-inside my-2">
              {Array.from(el.children).map((li, liIndex) => (
                <li key={liIndex}>{li.textContent}</li>
              ))}
            </ol>
          );
        case "LI":
          return (
            <li key={index} className="list-item my-1">
              {el.textContent}
            </li>
          );
          case "CODE":
          return (
            <pre
              key={index}
              className="bg-gray-500 text-red-600 font-mono px-2 py-1 rounded my-1"
            >
              {el.textContent}
            </pre>
          );
        case "IMAGE":
          return (
            <Image
              key={index}
              src={el.getAttribute("src") || ""}
              alt={el.getAttribute("alt") || "Image"}
              width={100} // Adjust the width as needed
              height={100} // Adjust the height as needed
              className="my-4 max-w-full"
            />
            
          );
        case "P":
          return (
            <p key={index} className="text-gray-700 my-2">
              {el.textContent}
            </p>
          );
        default:
          return null;
      }
    });
  };

  return <div className="parsed-content">{parseHTMLContent()}</div>;
};

export default DynamicRenderer;
