import React from 'react';
import { Cell } from '../Components/Cell';

export default {
  title: 'Components/Cell',
  component: Cell,
};

const Template = (args) => (
  <Cell {...args} />
);

export const CellTh = Template.bind({});

CellTh.args = {
  elementType: 'th',
  children: 'text',
};

CellTh.decorators = [
  (Story) => (
    <div
      style={{
        padding: '4px 8px',
        borderBottom: '1px solid gray',
        maxWidth: 'max-content',
        fontSize: '16px',
      }}
    >
      <Story />
    </div>
  ),
];

export const CellTd = Template.bind({});

CellTd.args = {
  elementType: 'td',
  children: 'text',
};

CellTd.decorators = [
  (Story) => (
    <div style={{
      padding: '8px 12px',
      borderBottom: '1px solid gray',
      maxWidth: 'max-content',
      fontSize: '14px',
    }}>
      <Story />
    </div>
  ),
];

export const CellTdLargeText = Template.bind({});

CellTdLargeText.args = {
  elementType: 'td',
  children:
    'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloremque iure dicta esse velit ad quae enim error delectus assumenda minima!',
};

CellTdLargeText.decorators = [
  (Story) => (
    <div
      style={{
        padding: '8px 12px',
        borderBottom: '1px solid gray',
        maxWidth: 'max-content',
        fontSize: '14px',
      }}
    >
      <Story />
    </div>
  ),
];

export const CellTdWithDates = Template.bind({});

CellTdWithDates.args = {
  elementType: 'td',
  children: '9/25/2022, 10/03/2022',
};

CellTdWithDates.decorators = [
  (Story) => (
    <div
      style={{
        padding: '8px 12px',
        borderBottom: '1px solid gray',
        maxWidth: 'max-content',
        fontSize: '14px',
      }}
    >
      <Story />
    </div>
  ),
];

export const CellTest = Template.bind({});

CellTest.args = {
  elementType: 'td',
  children: 'test',
  paddX: '8px',
  paddY: '4px',
  fontSize: '14px',
  fontWeight: 'bold',
  borderBottom: '1px solid black',
};

