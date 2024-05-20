// project import
import Breadcrumbs from '@components/@extended/Breadcrumbs';

import { APP_DEFAULT_PATH } from '@config';

const CertificationsPage: React.FC = () => {
  const breadcrumbLinks = [{ title: 'Home', to: APP_DEFAULT_PATH }, { title: 'Certifications' }];

  return (
    <>
      <Breadcrumbs custom heading="My Certifications" links={breadcrumbLinks} />
    </>
  )
};

export default CertificationsPage;
