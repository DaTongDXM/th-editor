import { useState, createContext } from 'react';
import type Editor from '@/three/Editor';

export const EditorContext = createContext({} as Editor);

export const createEditorContext = (editor: Editor) => {
  return createContext(editor);
};
