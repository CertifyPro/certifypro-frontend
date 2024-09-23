// project import
import Breadcrumbs from '@components/@extended/Breadcrumbs';

const CertificationsPage: React.FC = () => {
  const breadcrumbLinks = [{ title: 'Πιστοποιητικά' }];

  return (
    <>
      <Breadcrumbs custom heading="Τα Πιστοποιητικά Μου" links={breadcrumbLinks} />
    </>
  );
};

export default CertificationsPage;
