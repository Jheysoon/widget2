import { useDropzone } from 'react-dropzone';
import { useField } from 'formik';
import XLSX from 'xlsx';
import drop from 'lodash/drop';
import size from 'lodash/size';

import Container from '../components/Container';
import TableList from '../components/TableList';

const Dropzone = ({ name }: any) => {
  const [field, , helpers] = useField({ name });
  const { setValue } = helpers;

  const onDrop = (acceptedFiles: any) => {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      /* Parse data */
      const ab = e.target.result;
      const wb = XLSX.read(ab, { type: 'array' });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      /* Update state */
      //console.log('data here ###########');
      //console.log(drop(data));
      setValue(drop(data));
      //setData(data);
      //setCols(make_cols(ws['!ref']))
    };

    reader.readAsArrayBuffer(acceptedFiles[0]);
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    isDragAccept,
  } = useDropzone({
    onDrop,
    maxFiles: 1,
  });

  return (
    <div style={{ width: '100%' }}>
      <Container
        {...getRootProps({ isDragActive, isDragAccept, isDragReject })}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </Container>

      {size(field.value) > 0 && <TableList rows={field.value} />}
    </div>
  );
};

export default Dropzone;
