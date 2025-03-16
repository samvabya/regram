import { View, Text } from "react-native";
import React from "react";
import {
  actions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";

export default function RichTextEditor({
  editorRef,
  onChange,
}: {
  editorRef: any;
  onChange: any;
}) {
  return (
    <View>
      <RichToolbar
        actions={[
          actions.setBold,
          actions.setItalic,
          actions.insertBulletsList,
          actions.insertOrderedList,
          actions.insertLink,
          actions.setStrikethrough,
          actions.setUnderline,
          actions.removeFormat,
          actions.checkboxList,
          actions.undo,
          actions.redo,
        ]}
        // editor={editorRef}
        disabled={false}
      />
      <RichEditor 
      ref={editorRef}
      onChange={onChange}
      placeholder="What's on your mind?"
      />
    </View>
  );
}
