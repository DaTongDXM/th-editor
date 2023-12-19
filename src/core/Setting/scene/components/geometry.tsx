import React, { useContext } from 'react';
import { EditorContext } from '@/context/editorContext';
const Geometry: React.FC<any> = () => {
  const editor = useContext(EditorContext);
  editor.dispatchEvent({
    type: 'th:model:change',
    obj: { a: 123 },
  });

  return <div className='attribute-continer'></div>;
};
export default Geometry;
