import { useEffect, useCallback, useMemo, useState } from 'react';

import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

// third-party
import { flexRender, useReactTable, getCoreRowModel } from '@tanstack/react-table';

// project import
import Breadcrumbs from '@components/@extended/Breadcrumbs';
import IconButton from 'components/@extended/IconButton';
import MainCard from 'components/MainCard';
import Certificate from '@pages/certifications/Certificate';
import { getAllCertificates, deleteCertificate } from 'utils/db';
import { downloadCertificate } from './CertificateToDocX';
import { CertificateModal } from './CertificateModal';
import { EmptyTable } from './EmptyTable';

// assets
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';
import EditOutlined from '@ant-design/icons/EditOutlined';
import FileWordOutlined from '@ant-design/icons/FileWordOutlined';

const CertificationsPage: React.FC = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [isFetchingCertificates, setIsFetchingCertificates] = useState(true);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate>();

  const handleDelete = useCallback(
    async (id: number) => {
      await deleteCertificate(id).then(() => {
        setCertificates(certificates.filter((cert) => cert.id !== id));
      });
    },
    [certificates],
  );

  const handleDownloadCertificate = async (certificate: Certificate) => {
    await downloadCertificate(certificate);
  };

  const fetchCertificates = useCallback(async () => {
    setIsFetchingCertificates(true);
    const certs = await getAllCertificates();

    // Sort certificates by updated_at (latest first)
    const sortedCertificates = certs.sort((a: Certificate, b: Certificate) => {
      return new Date(b._updatedAt).getTime() - new Date(a._updatedAt).getTime();
    });

    setCertificates(sortedCertificates);
    setIsFetchingCertificates(false);
  }, []);

  const columns = useMemo(
    () => [
      {
        header: 'Ονομα',
        accessorKey: '_name',
      },
      {
        header: 'Ενεργειες',
        meta: {
          className: 'cell-center',
        },
        disableSortBy: true,
        cell: ({ row }) => {
          return (
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={0}>
              <Tooltip enterDelay={900} title="Επεξεργασία">
                <IconButton
                  color="secondary"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCertificate(row.original);
                    setShowCertificateModal(true);
                  }}
                >
                  <EditOutlined />
                </IconButton>
              </Tooltip>
              <Tooltip enterDelay={900} title="Εξαγωγή">
                <IconButton
                  color="primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDownloadCertificate(row.original);
                  }}
                >
                  <FileWordOutlined />
                </IconButton>
              </Tooltip>
              <Tooltip enterDelay={900} title="Διαγραφή">
                <IconButton
                  color="error"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(row.original.id);
                  }}
                >
                  <DeleteOutlined />
                </IconButton>
              </Tooltip>
            </Stack>
          );
        },
      },
    ],
    [handleDelete],
  );

  const table = useReactTable({
    data: certificates,
    columns,
    getCoreRowModel: getCoreRowModel(),
    // debugTable: true,
    // debugHeaders: true,
    // debugColumns: true,
  });

  useEffect(() => {
    fetchCertificates();
  }, [fetchCertificates]);

  const breadcrumbLinks = [{ title: 'Πιστοποιητικά' }];

  return (
    <>
      <Breadcrumbs divider={false} custom heading="Τα Πιστοποιητικά Μου" links={breadcrumbLinks} />
      <MainCard content={false}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableCell key={header.id} {...header.column.columnDef.meta}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody>
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} {...cell.column.columnDef.meta}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <>
                  {!isFetchingCertificates && (
                    <TableRow>
                      <TableCell colSpan={table.getAllColumns().length}>
                        <EmptyTable msg="Δεν Υπάρχουν Δεδομένα" />
                      </TableCell>
                    </TableRow>
                  )}
                </>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </MainCard>
      <CertificateModal
        open={showCertificateModal}
        modalToggler={setShowCertificateModal}
        certificate={selectedCertificate}
        fetchCertificates={fetchCertificates}
      />
    </>
  );
};

export default CertificationsPage;
