// component css styles
import "@mdxeditor/editor/style.css";

// services, features, and other libraries
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

// components
import {
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  CodeToggle,
  CreateLink,
  DiffSourceToggleWrapper,
  InsertThematicBreak,
  ListsToggle,
  MDXEditor,
  Separator,
  UndoRedo,
} from "@mdxeditor/editor";
import {
  diffSourcePlugin,
  headingsPlugin,
  linkPlugin,
  linkDialogPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
} from "@mdxeditor/editor";

// types
import type { MDXEditorMethods, MDXEditorProps } from "@mdxeditor/editor";
import type { Ref } from "react";

interface MarkdownEditorProps extends MDXEditorProps {
  ref?: Ref<MDXEditorMethods>;
}

export default function MarkdownEditor({ ref, className, ...props }: MarkdownEditorProps) {
  // Determine whether the current theme is dark or light
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";

  return (
    <MDXEditor
      {...props}
      ref={ref}
      className={cn("prose dark:prose-invert min-h-64 max-w-none font-mono", isDarkMode && "dark-theme", className)}
      contentEditableClassName="prose dark:prose-invert min-h-64 max-w-none font-mono"
      suppressHtmlProcessing
      plugins={[
        headingsPlugin(),
        quotePlugin(),
        listsPlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
        linkPlugin(),
        linkDialogPlugin(),
        diffSourcePlugin({ viewMode: "rich-text", diffMarkdown: "", readOnlyDiff: true }),
        toolbarPlugin({
          toolbarContents: () => (
            <DiffSourceToggleWrapper>
              <UndoRedo />
              <Separator />
              <BlockTypeSelect />
              <BoldItalicUnderlineToggles />
              <CodeToggle />
              <Separator />
              <ListsToggle />
              <Separator />
              <CreateLink />
              <Separator />
              <InsertThematicBreak />
            </DiffSourceToggleWrapper>
          ),
        }),
      ]}
    />
  );
}
