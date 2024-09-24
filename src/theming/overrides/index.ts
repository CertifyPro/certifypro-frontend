// third-party
import merge from 'lodash.merge';

// project import
import Accordion from './Accordion';
import AccordionDetails from './AccordionDetails';
import AccordionSummary from './AccordionSummary';
import Button from './Button';
import ButtonBase from './ButtonBase';
import Dialog from './Dialog';
import DialogContentText from './DialogContentText';
import DialogTitle from './DialogTitle';
import IconButton from './IconButton';
import InputLabel from './InputLabel';
import LinearProgress from './LinearProgress';
import Radio from './Radio';
import TableBody from './TableBody';
import TableCell from './TableCell';
import TableHead from './TableHead';
import TableRow from './TableRow';
import Tooltip from './Tooltip';
import Typography from './Typography';

// ==============================|| OVERRIDES - MAIN ||============================== //

export default function ComponentsOverrides(theme) {
  return merge(
    Accordion(theme),
    AccordionDetails(theme),
    AccordionSummary(theme),
    Button(theme),
    ButtonBase(),
    Dialog(),
    DialogContentText(theme),
    DialogTitle(),
    IconButton(theme),
    InputLabel(theme),
    LinearProgress(),
    Radio(theme),
    TableBody(theme),
    TableCell(theme),
    TableHead(theme),
    TableRow(),
    Tooltip(theme),
    Typography(),
  );
}
