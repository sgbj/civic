import React from 'react';
import { storiesOf } from '@storybook/react';
import { number, withKnobs } from '@storybook/addon-knobs';
import { checkA11y } from '@storybook/addon-a11y';
import { Erin } from '../src';

export default () =>
  storiesOf('Erin', module)
    .add('Erin', () => <Erin/>);