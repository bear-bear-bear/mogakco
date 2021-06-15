import { Story } from '@storybook/react';
import { ComponentProps } from 'react';
import Select from './index';

export default {
  title: 'Select',
  component: Select,
};

interface IAdditionalSelectOptions {
  width?: number;
}

const Template: Story<
  ComponentProps<typeof Select> & IAdditionalSelectOptions
> = (args) => <Select {...args} />;

export const General = Template.bind({});
General.args = {
  options: [
    { value: '1', label: '프런트엔드' },
    { value: '2', label: '백엔드' },
    { value: '3', label: '인공지능' },
    { value: '3', label: '정보보안' },
    { value: '3', label: 'IT 마케팅' },
  ],
};

export const Custumizing = Template.bind({});
Custumizing.args = {
  ...General.args,
  onChange: () => window.alert('onChange!'),
  noOptionsMessage: () => '항목이 존재하지 않습니다.',
  placeholder: '항목을 선택해주세요.',
};
