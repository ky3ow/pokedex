import React from 'react';
import type { ElementType } from './Element';
import Element, { colorMap } from './Element';

type Props = {
  filter?: ElementType | 'no filter';
  setter: (type: ElementType) => void;
};

const ElementFilter = ({ filter, setter }: Props) => {
  const colors = Object.keys(colorMap) as ElementType[];
  return (
    <select
      name='filter'
      id='filter'
      value={filter}
      onChange={(e) => setter(e.target.value as ElementType)}
    >
      <option value='no filter'>no filter</option>
      {colors.map((element) => {
        return (
          <option key={element} value={element}>
            {element}
          </option>
        );
      })}
    </select>
  );
};

export default ElementFilter;
