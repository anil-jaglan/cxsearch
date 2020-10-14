import { withStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';

const CustomAccordion = withStyles({
    root: {      
      boxShadow: 'none',
    }
  })(Accordion);

  export default CustomAccordion;