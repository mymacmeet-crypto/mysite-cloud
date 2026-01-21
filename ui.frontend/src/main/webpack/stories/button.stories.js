import Handlebars from 'handlebars';
import template from '../components/button/button.hbs';
import '../components/button/button.css';
import '../components/button/button.js';

export default {
  title: 'AEM/Button',
  argTypes: {
    label: { control: 'text' },
    variant: { control: 'select', options: ['primary', 'secondary', 'danger'] },
    disabled: { control: 'boolean' },
    action: { control: 'select', options: ['alert', 'log', 'navigate', 'toggle', 'none'] },
    url: { control: 'text' },
  },
};

const Template = (args) => template(args); // just call the function

export const Playground = Template.bind({});
Playground.args = {
  label: 'Click Me',
  variant: 'primary',
  disabled: false,
  action: 'alert',
  url: '/content/home.html',
};