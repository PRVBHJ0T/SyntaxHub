"use client";
import React, { useRef, useState } from "react";
import { ModeToggleBtn } from "./mode-toggle-btn";
import {
  selectedLanguageOptionProps,
  SelectLanguages,
} from "./SelectLanguages";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Editor from "@monaco-editor/react";
import { useTheme } from "next-themes";
import { PlayIcon } from "@heroicons/react/20/solid";
import { Button } from "./ui/button";
import { codeSnippets, languageOptions } from "@/config/config";
import { compileCode } from "@/actions/compile";
import { Loader } from "lucide-react";
import { editor as monacoEditor } from "monaco-editor"; // Import Monaco Editor types

export default function EditorComponent() {
  const { theme } = useTheme("dark");
  const [sourceCode, setSourceCode] = useState(codeSnippets["javascript"]); // default language is JavaScript
  const [languageOption, setLanguageOption] = useState(languageOptions[0]);
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState<string[]>([]);
  const editorRef = useRef<monacoEditor.IStandaloneCodeEditor | null>(null); // Properly typed ref

  // Function to handle editor mount
  function handleEditorDidMount(editor: monacoEditor.IStandaloneCodeEditor) {
    editorRef.current = editor; // Assign the editor instance
    editor.focus(); // Optionally, focus the editor
  }

  // When code changes in the editor
  function handleOnChange(value: string | undefined) {
    if (value) {
      setSourceCode(value);
    }
  }

  // Handle language selection change
  function onSelect(value: selectedLanguageOptionProps) {
    setLanguageOption(value);
    setSourceCode(codeSnippets[value.language as keyof typeof codeSnippets]);
  }

  // Execute the code by sending it to the backend for compilation
  async function executeCode() {
    setLoading(true);
    const requestData = {
      language: languageOption.language,
      version: languageOption.version,
      files: [
        {
          content: sourceCode,
        },
      ],
    };
    try {
      const res = await compileCode(requestData);
      setOutput(res.run.output.split("\n"));
      console.log(res);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen dark:bg-slate-900 rounded-2xl shadow-2xl py-6 px-8">
      <div className="flex items-center justify-between pb-3">
        <h2
          className={`scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight ${
            theme === "light" ? "text-black" : "text-white"
          }`}
        >
          Syntax Hub
        </h2>
        <div className="flex items-center space-x-2">
          <ModeToggleBtn />
          <div className="w-[230px]">
            <SelectLanguages
              onSelect={onSelect}
              selectedLanguageOption={languageOption}
            />
          </div>
        </div>
      </div>
      <div className="bg-slate-400 dark:bg-slate-950 p-3 rounded-2xl">
        <div className="dark:bg-slate-900">
          <ResizablePanelGroup
            direction="horizontal"
            className="w-full rounded-lg border dark:bg-slate-900"
          >
            <ResizablePanel defaultSize={50} minSize={35}>
              <Editor
                theme={theme === "dark" ? "vs-dark" : "vs-light"}
                height="100vh"
                language={languageOption.language}
                defaultValue={sourceCode}
                value={sourceCode}
                onMount={handleEditorDidMount}
                onChange={handleOnChange}
              />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={50} minSize={25}>
              <div className="space-y-3 bg-slate-300 dark:bg-slate-900 min-h-screen">
                <div className="flex items-center justify-between pb-3 bg-slate-400 dark:bg-slate-950 px-6 py-4">
                  <h2>Output</h2>
                  {loading ? (
                    <Button
                      disabled
                      size={"sm"}
                      className="dark:bg-purple-600 text-slate-100 dark:hover:bg-purple-700 bg-slate-800 hover:bg-slate-900"
                    >
                      <Loader className="w-4 h-4 mr-2 animate-spin " />
                      <span>Loading</span>
                    </Button>
                  ) : (
                    <Button
                      onClick={executeCode}
                      size={"sm"}
                      className="dark:bg-purple-600 text-slate-100 dark:hover:bg-purple-700 bg-slate-800 hover:bg-slate-900"
                    >
                      <PlayIcon className="w-4 h-4 mr-2" />
                      <span>Run</span>
                    </Button>
                  )}
                </div>
                <div className="bg-white dark:bg-slate-900 h-full pl-4">
                  {output.map((item, index) => (
                    <h2 key={index}>{item}</h2>
                  ))}
                </div>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    </div>
  );
}
