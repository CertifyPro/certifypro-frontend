// third-party
import merge from 'lodash.merge';

// project import
import Button from './Button';
import ButtonBase from './ButtonBase';
import IconButton from './IconButton';
import LinearProgress from './LinearProgress';
import Typography from './Typography';

// ==============================|| OVERRIDES - MAIN ||============================== //

export default function ComponentsOverrides(theme) {
  return merge(Button(theme), ButtonBase(), IconButton(theme), LinearProgress(), Typography());
}
