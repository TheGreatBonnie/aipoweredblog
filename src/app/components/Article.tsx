"use client";

import {
  useMakeCopilotReadable,
  useCopilotAction,
} from "@copilotkit/react-core";
import {
  CopilotTextarea,
  HTMLCopilotTextAreaElement,
} from "@copilotkit/react-textarea";
import { useRef, useState } from "react";
import { addArticle } from "../serveractions/AddArticle";

export default function Article() {
  // Define state variables for article outline, copilot text, and article title
  const [articleOutline, setArticleOutline] = useState("");
  const [copilotText, setCopilotText] = useState("");
  const [articleTitle, setArticleTitle] = useState("");

  useMakeCopilotReadable(
    "Blog article outline: " + JSON.stringify(articleOutline)
  );

  const copilotTextareaRef = useRef<HTMLCopilotTextAreaElement>(null);

  useCopilotAction(
    {
      name: "researchBlogArticleTopic",
      description: "Research a given topic for a blog article.",
      parameters: [
        {
          name: "articleTitle",
          type: "string",
          description: "Title for a blog article.",
          required: true,
        },
        {
          name: "articleOutline",
          type: "string",
          description:
            "Outline for a blog article that shows what the article covers.",
          required: true,
        },
      ],
      handler: async ({ articleOutline, articleTitle }) => {
        setArticleOutline(articleOutline);

        setArticleTitle(articleTitle);
      },
    },
    []
  );

  return (
    // Form element for article input
    <form
      action={addArticle}
      className="w-full h-full gap-10 flex flex-col items-center p-10">
      {/* Input field for article title */}
      <div className="flex w-full items-start gap-3">
        <textarea
          className="p-2 w-full h-12 rounded-lg flex-grow overflow-x-auto overflow-y-hidden whitespace-nowrap"
          id="title"
          name="title"
          value={articleTitle}
          placeholder="Article Title"
          onChange={(event) => setArticleTitle(event.target.value)}
        />
      </div>

      {/* Textarea for article content */}
      <textarea
        className="p-4 w-full aspect-square font-bold text-xl bg-slate-800 text-white rounded-lg resize-none hidden"
        id="content"
        name="content"
        value={copilotText}
        placeholder="Write your article content here"
        onChange={(event) => setCopilotText(event.target.value)}
      />

      <CopilotTextarea
        value={copilotText}
        ref={copilotTextareaRef}
        placeholder="Write your article content here"
        onChange={(event) => setCopilotText(event.target.value)}
        className="p-4 w-full aspect-square font-bold text-xl bg-slate-800 text-white rounded-lg resize-none"
        placeholderStyle={{
          color: "white",
          opacity: 0.5,
        }}
        autosuggestionsConfig={{
          textareaPurpose: articleTitle,
          chatApiConfigs: {
            suggestionsApiConfig: {
              forwardedParams: {
                max_tokens: 5,
                stop: ["\n", ".", ","],
              },
            },
            insertionApiConfig: {},
          },
          debounceTime: 250,
        }}
      />

      {/* Publish button */}
      <button
        type="submit"
        className="p-4 w-full !bg-slate-800 text-white rounded-lg">
        Publish
      </button>
    </form>
  );
}
