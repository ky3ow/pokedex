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
    <div className='filter'>
      <select
        className='filter__select'
        name='filter'
        id='filter'
        value={filter}
        onChange={(e) => setter(e.target.value as ElementType)}
      >
        <option className='filter__option' value='no filter'>
          no filter
        </option>
        {colors.map((element) => {
          return (
            <option
              className='filter__option'
              key={element}
              value={element}
              style={{ '--element-color': colorMap[element] }}
            >
              {element}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default ElementFilter;
