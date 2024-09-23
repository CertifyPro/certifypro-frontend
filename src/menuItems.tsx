import FileTextOutlined from '@ant-design/icons/FileTextOutlined';
import SettingOutlined from '@ant-design/icons/SettingOutlined';

const menuItems = {
  items: [
    {
      id: 'group-certifications',
      type: 'group',
      children: [
        {
          id: 'certification',
          title: 'Πιστοποιητικά',
          type: 'collapse',
          icon: FileTextOutlined,
          url: '/certifications/all',
          breadcrumbs: false,
          children: [
            {
              id: 'certification-create',
              title: 'Δημιουργία',
              type: 'item',
              url: '/certifications/new',
              breadcrumbs: false,
            },
          ],
        },
      ],
    },
    {
      id: 'settings',
      type: 'group',
      children: [
        {
          id: 'settings',
          title: 'Ρυθμίσεις',
          type: 'item',
          breadcrumbs: false,
          icon: SettingOutlined,
          url: '/settings',
        },
      ],
    },
  ],
};

export default menuItems;
