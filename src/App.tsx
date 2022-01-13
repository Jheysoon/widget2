import { useState, useRef } from 'react';
import { Formik, Form, FormikProps } from 'formik';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import forEach from 'lodash/forEach';
import { toString } from 'lodash';

import Dropzone from './common/fields/Dropzone';
import CstmDialog from './common/components/CstmDialog';

declare var ZOHO: any;

function App() {
  const [open, setOpen] = useState(false);
  const [record, setRecord] = useState({
    updated: 0,
    inserted: 0,
    total: 0,
  });
  const formikRef = useRef<FormikProps<Record<string, unknown>>>(null);

  const importRecords = async (values: any) => {
    const list: any = [];

    forEach(values.list, value => {
      list.push({
        First_Name: value[0],
        Last_Name: value[1],
        Email: value[2],
        Mobile: toString(value[3]),
      });
    });

    const param = {
      Entity: 'Leads',
      APIData: list,
      duplicate_check_fields: ['Email'],
    };

    let _record = {
      updated: 0,
      inserted: 0,
      total: 0,
    };

    const { data } = await ZOHO.CRM.API.upsertRecord(param);

    forEach(data, (value: any) => {
      if (value.action === 'update' && value.code === 'SUCCESS') {
        _record.updated++;
      }

      if (value.action === 'insert' && value.code === 'SUCCESS') {
        _record.inserted++;
      }

      if (value.status === 'success') {
        _record.total++;
      }
    });

    setRecord(_record);
    setOpen(true);

    console.log('upsert #############');
    console.log(data);
    console.log(_record);
  };

  return (
    <div style={{ width: '100%' }}>
      <Box
        sx={{
          display: 'grid',
          width: 700,
          margin: '0 auto',
        }}>
        <Formik
          initialValues={{ list: [] }}
          onSubmit={values => {
            importRecords(values);
          }}
          innerRef={formikRef}>
          <Form>
            <Dropzone name="list" />
            <Button variant="contained" type="submit" style={{ marginTop: 10 }}>
              Import
            </Button>
          </Form>
        </Formik>

        <CstmDialog
          record={record}
          open={open}
          onClose={() => {
            formikRef.current?.resetForm();
            setOpen(false);
          }}
        />
      </Box>
    </div>
  );
}

export default App;
