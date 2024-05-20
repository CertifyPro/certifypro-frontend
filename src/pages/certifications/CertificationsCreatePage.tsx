// project import
import Breadcrumbs from '@components/@extended/Breadcrumbs';

import { APP_DEFAULT_PATH } from '@config';

const CertificationsCreatePage: React.FC = () => {
  const breadcrumbLinks = [
    { title: 'Home', to: APP_DEFAULT_PATH },
    { title: 'Certifications', to: '/certifications/all' },
    { title: "Create Certificate"}
  ];

  return (
    <>
      <Breadcrumbs custom heading="New Certificate" links={breadcrumbLinks} />
    </>
  )
};

export default CertificationsCreatePage;
