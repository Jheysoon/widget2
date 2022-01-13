import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

type Props = {
  onClose: () => void;
  open: boolean;
  record: any;
};

const CstmDialog = ({ onClose, open, record }: Props) => {
  return (
    <Dialog open={open} fullWidth maxWidth="md">
      <DialogTitle>Stats:</DialogTitle>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center"># updated records</TableCell>
              <TableCell align="center"># inserted records</TableCell>
              <TableCell align="center"># records executed</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="center">{record.updated}</TableCell>
              <TableCell align="center">{record.inserted}</TableCell>
              <TableCell align="center">{record.total}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Button
        variant="contained"
        style={{ margin: '10px auto' }}
        onClick={onClose}>
        OK & Reset
      </Button>
    </Dialog>
  );
};

export default CstmDialog;
