'use client';
import { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css"; // Import Quill's snow theme CSS
import { toolbarOptions } from "@/utils/toolbarOptions ";
import DynamicRenderer from "@/components/DynamicRenderer";

const Editor = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);
  const [editorContent, setEditorContent] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined" && editorRef.current) {
      // Dynamically import Quill and initialize it
      import("quill").then((Quill) => {
        if (editorRef.current) {
          quillRef.current = new Quill.default(editorRef.current, {
            theme: "snow", // Use the Snow theme
            placeholder: "Write something amazing...",
            modules: {
              toolbar: toolbarOptions,
            },
          });

        // Listen to text-change events to get content
        quillRef.current.on("text-change", () => {
            if (quillRef.current) {
              setEditorContent(quillRef.current.root.innerHTML);
            }
          });
        }
      });
    }
  }, []);

  return (
    <div>
      {/* Quill replaces this div */}
      <div ref={editorRef} style={{ height: "500px" }}> </div>

      <div className="mt-10">
        <h3>Editor Content:</h3>
        {/* <div dangerouslySetInnerHTML={{ __html: editorContent }} /> */}
        <DynamicRenderer htmlContent={editorContent}/>
      </div>
    </div>
  );
};

export default Editor;
