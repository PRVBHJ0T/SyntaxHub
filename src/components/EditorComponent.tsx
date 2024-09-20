"use client";
import React, { useRef, useState } from "react";
import { ModeToggleBtn } from "./mode-toggle-btn";
import { SelectLanguages } from "./SelectLanguages";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Editor from "@monaco-editor/react";
import { useTheme } from "next-themes";
import { PlayIcon } from "@heroicons/react/20/solid";
import { Button } from "./ui/button";


export default function EditorComponent() {
  const { theme, setTheme } = useTheme();
  const [sourceCode,setsourceCode]=useState("");
  const editorRef = useRef(null);

  console.log(sourceCode)
  function handleEditorDidMount(editor:any) {
    editorRef.current = editor;
    editor.focus()
  }

  function handleOnchange(value:string|undefined){
    if(value){
        setsourceCode(value);
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
          Prabhjot coder
        </h2>
        <div className="flex items-center space-x-2">
          <ModeToggleBtn />
          <div className="w-[230px]">
            <SelectLanguages />
          </div>
        </div>
      </div>
      <div className="bg-slate-400 dark:bg-slate-950 p-3 rounded-2x1">
        <div className="dark:bg-slate-900">
          <ResizablePanelGroup
            direction="horizontal"
            className="w-full rounded-lg border dark:bg-slate-900"
          >
            <ResizablePanel defaultSize={50} minSize={35}>
              <Editor
                theme={theme === "dark" ? "vs-dark" : "vs-light"}
                height="100vh"
                defaultLanguage="javascript"
                defaultValue="// some comment"
                onMount={handleEditorDidMount}
                value={sourceCode}
                onChange={handleOnchange}
              />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={50} minSize={25}>
              {/* header */}
              <div className="space-y-3 bg-slate-300 dark:bg-slate-900 min-h-screen">
              <div className="flex items-center justify-between pb-3 bg-slate-400 dark:bg-slate-950 px-6 py-4">
                <h2>
                    Output
                </h2>
                <Button size={"sm" } className="dark:bg-purple-600 text-slate-100 dark:hover:bg-purple-700 bg-slate-800 hover:bg-slate-900">
                    <PlayIcon className="w-4 h-4 mr-2"/>
                    <span>Run</span>

                </Button>
              </div>
              <div className="bg-white dark:bg-slate-900 h-full">
                <h2>Hello World</h2>
              </div>
              </div>
              {/* body */}
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    </div>
  );
}
