import { CertificateCategory, InspectionArticleFieldValue, InspectionCheckType } from '../Certificate';

import { getLMATemplateFieldValue } from './LMAFieldsTemplate';
import { getLMBTemplateFieldValue } from './LMBFieldsTemplate';

export const getTemplateFieldValue = (
  category: CertificateCategory,
  id: string,
  inspectionCheckType: InspectionCheckType,
) => {
  let templateMap: Record<
    string,
    Record<InspectionCheckType, { value: InspectionArticleFieldValue; comments: string }>
  >;

  switch (category) {
    case CertificateCategory.LIFTING_MACHINE_PAPAGALAKI:
      templateMap = getLMATemplateFieldValue();
      break;
    case CertificateCategory.ELECTRIC_CHAIN_HOIST_WITH_SUSPENSION_BRACKET:
      templateMap = getLMBTemplateFieldValue();
      break;
  }

  try {
    return { ...templateMap[id][inspectionCheckType], id };
  } catch (e) {
    console.error('Can not find field value for LMB template with error: ', e);
    return {
      value: undefined,
      comments: '',
      id,
    };
  }
};
