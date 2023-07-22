import { Collapse, CollapseProps } from 'antd';
import React from 'react'


const items: CollapseProps['items'] = [
    {
      key: '1',
      label: 'Genres',
      children: <p></p>,
    },
    {
      key: '2',
      label: 'Year',
      children: <p></p>,
    },
    {
      key: '3',
      label: 'IMDB',
      children: <p></p>,
    },
  ];

const FilterSection = () => {

    const onChange = (key: string | string[]) => {
        console.log(key);
      };
    



  return (
    <div className='filter'>
        <h1>Use Filter</h1>
        <Collapse items={items} defaultActiveKey={['1']} onChange={onChange} />
    </div>
  )
}

export default FilterSection