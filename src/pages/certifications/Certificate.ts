export enum InspectionType {
  AA = 'ΑΑ',
  AB = 'ΑΒ',
  AA_AB = 'ΑΑ, Α & Β',
  AA_A = 'ΑΑ, Α',
}

export enum InspectionKind {
  O = 'Ο',
  L = 'Λ',
  A = 'Α',
  O_L = 'Ο & Λ',
  NA = '-',
}

export enum InspectionArticleFieldValue {
  OK = 'OK',
  NOT_OK = 'NOT OK',
  NA = 'N/A',
}

export enum InspectionCheckType {
  AA = 'AA',
  A = 'A',
  B = 'B',
}

type InspectionArticleField = {
  description: string;
  inspectionType: InspectionType;
  inspectionKind: InspectionKind;
  templateValues: Record<
    InspectionCheckType | 'DEFAULT',
    {
      value?: InspectionArticleFieldValue;
      comments: string;
    }
  >;
};

type InpsectionArticleSubCategory = string;

export type InspectionArticle = {
  articleNumber: string;
  fields: (InspectionArticleField | InpsectionArticleSubCategory)[];
};

export type InspectionCategory = {
  name: string;
  inspectionArticles: InspectionArticle[];
};

type InspectionReport = {
  inspectionCategories: InspectionCategory[];
};

export enum CertificateType {
  INSPECTION_REPORT = 'ΕΚΘΕΣΗ ΕΠΙΘΕΩΡΗΣΗΣ',
  INSPECTION_CERTIFICATE = 'ΠΙΣΤΟΠΟΙΗΤΙΚΟ ΕΛΕΓΧΟΥ',
}

export enum CertificateCategory {
  LIFTING_MACHINE_PAPAGALAKI = 'ΓΕΡΑΝΟΣ ΕΠΙ ΟΧΗΜΑΤΟΣ - ΠΑΠΑΓΑΛΑΚΙ',
}

class Certificate {
  public id?: number;
  public _name: string;
  public _type: CertificateType;
  public _category: CertificateCategory;
  public _inspectionCheckType?: InspectionCheckType;
  public _inspectionReport: InspectionReport;
  public _createdAt: Date;
  public _updatedAt: Date;

  constructor(
    type: CertificateType = CertificateType.INSPECTION_CERTIFICATE,
    category: CertificateCategory = CertificateCategory.LIFTING_MACHINE_PAPAGALAKI,
    inspectionCheckType: InspectionCheckType | undefined,
    name?: string,
    createdAt?: Date,
    updatedAt?: Date,
    id?: number,
  ) {
    this.id = id;
    this._name = name || `${category} - ΤΥΠΟΥ-${inspectionCheckType}`;
    this._type = type;
    this._category = category;
    this._inspectionCheckType = inspectionCheckType;
    this._createdAt = createdAt || new Date();
    this._updatedAt = updatedAt || new Date();
    this._inspectionReport = {
      inspectionCategories: [
        {
          name: 'I. ΓΕΝΙΚΑ',
          inspectionArticles: [
            { articleNumber: '1.', fields: ['ΕΠΙΘΕΩΡΗΣΗ ΕΓΓΡΑΦΩΝ'] },
            {
              articleNumber: '1.1',
              fields: [
                {
                  description: 'ΜΕΛΕΤΗ – ΣΧΕΔΙΑΓΡΑΜΜΑTA (ΕΛΕΓΧΟΣ ΠΛΗΡΟΤΗΤΑΣ ΜΕΛΕΤΗΣ)',
                  inspectionType: InspectionType.AA,
                  inspectionKind: InspectionKind.A,
                  templateValues: {
                    DEFAULT: {
                      value: undefined,
                      comments: '',
                    },
                    [InspectionCheckType.AA]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: 'Σύμφωνα με το βιβλίο του κατασκευαστή και την μελέτη έδρασης του γερανού',
                    },
                    [InspectionCheckType.A]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.B]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                  },
                },
              ],
            },
            {
              articleNumber: '1.2',
              fields: [
                {
                  description:
                    'ΠΙΣΤΟΠΟΙΗΤΙΚΑ (ΔΗΛΩΣΗ CE, ΕΞΑΡΤΗΜΑΤΑ, ΥΛΙΚΑ – ΕΛΕΓΧΟΣ ΤΑΥΤΙΣΗΣ ΜΕ ΤΑ ΕΓΚΑΤΕΣΤΗΜΕΝΑ ΥΛΙΚΑ)',
                  inspectionType: InspectionType.AA,
                  inspectionKind: InspectionKind.A,
                  templateValues: {
                    DEFAULT: {
                      value: undefined,
                      comments: '',
                    },
                    [InspectionCheckType.AA]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: 'Σήμανση CE & πιστοποιητικό από τον κατασκευαστή (FASSI)',
                    },
                    [InspectionCheckType.A]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.B]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                  },
                },
              ],
            },
            {
              articleNumber: '1.3',
              fields: [
                {
                  description: 'ΕΓΧΕΙΡΙΔΙΟ ΛΕΙΤΟΥΡΓΙΑΣ',
                  inspectionType: InspectionType.AA_AB,
                  inspectionKind: InspectionKind.A,
                  templateValues: {
                    DEFAULT: {
                      value: undefined,
                      comments: '',
                    },
                    [InspectionCheckType.AA]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: '',
                    },
                    [InspectionCheckType.A]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: '',
                    },
                    [InspectionCheckType.B]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: '',
                    },
                  },
                },
              ],
            },
            {
              articleNumber: '1.4',
              fields: [
                {
                  description: 'ΒΙΒΛΙΟ ΣΥΝΤΗΡΗΣΗΣ & ΕΛΕΓΧΩΝ',
                  inspectionType: InspectionType.AA_AB,
                  inspectionKind: InspectionKind.A,
                  templateValues: {
                    DEFAULT: {
                      value: undefined,
                      comments: '',
                    },
                    [InspectionCheckType.AA]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: 'Τηρείται στο αρχείο του πελάτη από την FASSI έναρξη 9ος 2022',
                    },
                    [InspectionCheckType.A]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: 'Τηρείται στο αρχείο του πελάτη από την FASSI έναρξη 9ος 2022',
                    },
                    [InspectionCheckType.B]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: 'Τηρείται στο αρχείο του πελάτη από την FASSI έναρξη 9ος 2022',
                    },
                  },
                },
              ],
            },
            {
              articleNumber: '1.5',
              fields: [
                {
                  description: 'ΑΔΕΙΟΥΧΟΣ ΧΕΙΡΙΣΤΗΣ',
                  inspectionType: InspectionType.AA_AB,
                  inspectionKind: InspectionKind.A,
                  templateValues: {
                    DEFAULT: {
                      value: undefined,
                      comments: '',
                    },
                    [InspectionCheckType.AA]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: '',
                    },
                    [InspectionCheckType.A]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: '',
                    },
                    [InspectionCheckType.B]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: '',
                    },
                  },
                },
              ],
            },
            { articleNumber: '2.', fields: ['ΣΗΜΑΝΣΗ'] },
            {
              articleNumber: '2.1',
              fields: [
                {
                  description: 'ΠΙΝΑΚΙΔΙΟ ΣΤΟΙΧΕΙΩΝ ΑΝΥΨΩΤΙΚΟΥ ΜΗΧΑΝΗΜΑΤΟΣ',
                  inspectionType: InspectionType.AA_AB,
                  inspectionKind: InspectionKind.O,
                  templateValues: {
                    DEFAULT: {
                      value: undefined,
                      comments: '',
                    },
                    [InspectionCheckType.AA]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: '',
                    },
                    [InspectionCheckType.A]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: '',
                    },
                    [InspectionCheckType.B]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: '',
                    },
                  },
                },
              ],
            },
            {
              articleNumber: '2.2',
              fields: [
                {
                  description: 'ΈΝΔΕΙΞΗ ΑΝΥΨΩΤΙΚΗΣ ΙΚΑΝΟΤΗΤΑΣ',
                  inspectionType: InspectionType.AA_AB,
                  inspectionKind: InspectionKind.O,
                  templateValues: {
                    DEFAULT: {
                      value: undefined,
                      comments: '',
                    },
                    [InspectionCheckType.AA]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: 'Σε διαγράμματα εντός της καμπίνας',
                    },
                    [InspectionCheckType.A]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: 'Σε διαγράμματα εντός της καμπίνας',
                    },
                    [InspectionCheckType.B]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: 'Σε διαγράμματα εντός της καμπίνας',
                    },
                  },
                },
              ],
            },
            {
              articleNumber: '2.3',
              fields: [
                {
                  description: 'ΠΡΟΕΙΔΟΠΟΙΗΤΙΚΕΣ ΣΗΜΑΝΣΕΙΣ - ΜΕΤΡΑ',
                  inspectionType: InspectionType.AA_AB,
                  inspectionKind: InspectionKind.O,
                  templateValues: {
                    DEFAULT: {
                      value: undefined,
                      comments: '',
                    },
                    [InspectionCheckType.AA]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: '',
                    },
                    [InspectionCheckType.A]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: '',
                    },
                    [InspectionCheckType.B]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: '',
                    },
                  },
                },
              ],
            },
            {
              articleNumber: '3.',
              fields: [
                'ΔΟΜΙΚΑ ΣΤΟΙΧΕΙΑ & ΜΗΧΑΝΟΛΟΓΙΚΟΣ ΕΞΟΠΛΙΣΜΟΣ',
                {
                  description: 'ΟΠΤΙΚΟΣ ΕΛΕΓΧΟΣ ΚΑΤΑΣΤΑΣΗΣ & ΜΕΤΑΤΡΟΠΩΝ',
                  inspectionType: InspectionType.AA_AB,
                  inspectionKind: InspectionKind.NA,
                  templateValues: {
                    DEFAULT: {
                      value: undefined,
                      comments: '',
                    },
                    [InspectionCheckType.AA]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: '',
                    },
                    [InspectionCheckType.A]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: '',
                    },
                    [InspectionCheckType.B]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: '',
                    },
                  },
                },
                {
                  description: 'ΈΛΕΓΧΟΣ ΣΥΜΜΟΡΦΩΣΗΣ ΜΕ ΣΧΕΔΙΑ, ΜΕΛΕΤΗ & ΠΙΣΤΟΠΟΙΗΤΙΚΑ',
                  inspectionType: InspectionType.AA,
                  inspectionKind: InspectionKind.NA,
                  templateValues: {
                    DEFAULT: {
                      value: undefined,
                      comments: '',
                    },
                    [InspectionCheckType.AA]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: 'Σύμφωνα με το βιβλίο του κατασκευαστή και την μελέτη έδρασης του γερανού',
                    },
                    [InspectionCheckType.A]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.B]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                  },
                },
              ],
            },
            { articleNumber: '3.1', fields: ['ΒΑΣΗ, ΚΟΡΜΟΣ & ΒΡΑΧΙΩΝΕΣ ΑΝΥΨΩΤΙΚΟΥ ΜΗΧΑΝΗΜΑΤΟΣ'] },
            {
              articleNumber: '3.1.1',
              fields: [
                {
                  description: 'ΔΟΜΙΚΑ ΣΤΟΙΧΕΙΑ',
                  inspectionType: InspectionType.AA_AB,
                  inspectionKind: InspectionKind.O,
                  templateValues: {
                    DEFAULT: {
                      value: undefined,
                      comments: '',
                    },
                    [InspectionCheckType.AA]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: '',
                    },
                    [InspectionCheckType.A]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: '',
                    },
                    [InspectionCheckType.B]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: '',
                    },
                  },
                },
              ],
            },
            {
              articleNumber: '3.1.2',
              fields: [
                {
                  description: 'ΣΥΓΚΟΛΛΗΣΕΙΣ',
                  inspectionType: InspectionType.AA_AB,
                  inspectionKind: InspectionKind.O,
                  templateValues: {
                    DEFAULT: {
                      value: undefined,
                      comments: '',
                    },
                    [InspectionCheckType.AA]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: '',
                    },
                    [InspectionCheckType.A]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: '',
                    },
                    [InspectionCheckType.B]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: '',
                    },
                  },
                },
              ],
            },
            {
              articleNumber: '3.1.3',
              fields: [
                {
                  description: 'ΣΥΝΔΕΣΜΟΙ',
                  inspectionType: InspectionType.AA_AB,
                  inspectionKind: InspectionKind.O,
                  templateValues: {
                    DEFAULT: {
                      value: undefined,
                      comments: '',
                    },
                    [InspectionCheckType.AA]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: '',
                    },
                    [InspectionCheckType.A]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: '',
                    },
                    [InspectionCheckType.B]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: '',
                    },
                  },
                },
              ],
            },
            {
              articleNumber: '3.1.4',
              fields: [
                {
                  description: 'ΜΕΣΑ ΑΝΥΨΩΣΗΣ (ΣΥΡΜΑΤΟΣΧΟΙΝΑ, ΑΛΥΣΙΔΕΣ, ΕΜΒΟΛΑ)',
                  inspectionType: InspectionType.AA_AB,
                  inspectionKind: InspectionKind.O_L,
                  templateValues: {
                    DEFAULT: {
                      value: undefined,
                      comments: '',
                    },
                    [InspectionCheckType.AA]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: '',
                    },
                    [InspectionCheckType.A]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: '',
                    },
                    [InspectionCheckType.B]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: '',
                    },
                  },
                },
              ],
            },
            {
              articleNumber: '3.1.5',
              fields: [
                {
                  description: 'ΑΠΟΣΒΕΣΤΗΡΕΣ - ΤΕΡΜΑΤΑ ΔΙΑΔΡΟΜΗΣ',
                  inspectionType: InspectionType.AA_AB,
                  inspectionKind: InspectionKind.O_L,
                  templateValues: {
                    DEFAULT: {
                      value: undefined,
                      comments: '',
                    },
                    [InspectionCheckType.AA]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: '',
                    },
                    [InspectionCheckType.A]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: '',
                    },
                    [InspectionCheckType.B]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: '',
                    },
                  },
                },
              ],
            },
            { articleNumber: '3.2', fields: ['ΔΙΑΔΡΟΜΗ ΚΙΝΗΣΗΣ ΑΝΥΨΩΤΙΚΟΥ ΜΗΧΑΝΗΜΑΤΟΣ'] },
            {
              articleNumber: '3.2.1',
              fields: [
                {
                  description: 'ΔΟΜΙΚΑ ΣΤΟΙΧΕΙΑ',
                  inspectionType: InspectionType.AA_AB,
                  inspectionKind: InspectionKind.O,
                  templateValues: {
                    DEFAULT: {
                      value: undefined,
                      comments: '',
                    },
                    [InspectionCheckType.AA]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.A]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.B]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                  },
                },
              ],
            },
            {
              articleNumber: '3.2.2',
              fields: [
                {
                  description: 'ΣΥΝΔΕΣΜΟΙ - ΣΥΓΚΟΛΛΗΣΕΙΣ',
                  inspectionType: InspectionType.AA_AB,
                  inspectionKind: InspectionKind.O,
                  templateValues: {
                    DEFAULT: {
                      value: undefined,
                      comments: '',
                    },
                    [InspectionCheckType.AA]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.A]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.B]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                  },
                },
              ],
            },
            {
              articleNumber: '3.2.3',
              fields: [
                {
                  description: 'ΚΙΝΗΤΗΡΙΟΣ ΜΗΧΑΝΙΣΜΟΣ, ΦΡΕΝΑ',
                  inspectionType: InspectionType.AA_AB,
                  inspectionKind: InspectionKind.O_L,
                  templateValues: {
                    DEFAULT: {
                      value: undefined,
                      comments: '',
                    },
                    [InspectionCheckType.AA]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.A]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.B]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                  },
                },
              ],
            },
            {
              articleNumber: '3.2.4',
              fields: [
                {
                  description: 'ΤΡΟΧΙΕΣ, ΟΔΗΓΟΙ, ΡΑΟΥΛΑ, ΤΡΟΧΟΙ ΚΙΝΗΣΗΣ',
                  inspectionType: InspectionType.AA_AB,
                  inspectionKind: InspectionKind.O,
                  templateValues: {
                    DEFAULT: {
                      value: undefined,
                      comments: '',
                    },
                    [InspectionCheckType.AA]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.A]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.B]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                  },
                },
              ],
            },
            {
              articleNumber: '3.2.5',
              fields: [
                {
                  description: 'ΟΡΙΟΘΕΤΕΣ, ΑΠΟΣΒΕΣΤΗΡΕΣ',
                  inspectionType: InspectionType.AA_AB,
                  inspectionKind: InspectionKind.O_L,
                  templateValues: {
                    DEFAULT: {
                      value: undefined,
                      comments: '',
                    },
                    [InspectionCheckType.AA]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.A]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.B]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                  },
                },
              ],
            },
            {
              articleNumber: '3.2.6',
              fields: [
                {
                  description: 'ΣΥΣΤΗΜΑΤΑ ΑΣΦΑΛΙΣΗΣ',
                  inspectionType: InspectionType.AA_AB,
                  inspectionKind: InspectionKind.O_L,
                  templateValues: {
                    DEFAULT: {
                      value: undefined,
                      comments: '',
                    },
                    [InspectionCheckType.AA]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.A]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.B]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                  },
                },
              ],
            },
            { articleNumber: '3.3', fields: ['ΦΟΡΕΙΟ - ΑΝΥΨΩΤΙΚΟΣ ΜΗΧΑΝΙΣΜΟΣ'] },
            {
              articleNumber: '3.3.1',
              fields: [
                {
                  description: 'ΔΟΜΙΚΑ ΣΤΟΙΧΕΙΑ',
                  inspectionType: InspectionType.AA_AB,
                  inspectionKind: InspectionKind.O,
                  templateValues: {
                    DEFAULT: {
                      value: undefined,
                      comments: '',
                    },
                    [InspectionCheckType.AA]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: '',
                    },
                    [InspectionCheckType.A]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: '',
                    },
                    [InspectionCheckType.B]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: '',
                    },
                  },
                },
              ],
            },
            {
              articleNumber: '3.3.2',
              fields: [
                {
                  description: 'ΒΑΡΟΥΛΚΟ, ΤΡΟΧΑΛΙΕΣ - ΡΑΟΥΛΑ',
                  inspectionType: InspectionType.AA_AB,
                  inspectionKind: InspectionKind.O_L,
                  templateValues: {
                    DEFAULT: {
                      value: undefined,
                      comments: '',
                    },
                    [InspectionCheckType.AA]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.A]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.B]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                  },
                },
              ],
            },
            {
              articleNumber: '3.3.3',
              fields: [
                {
                  description: 'ΦΡΕΝΑ (ΚΑΤΑΣΤΑΣΗ, ΛΕΙΤΟΥΡΓΙΚΟΣ ΕΛΕΓΧΟΣ)',
                  inspectionType: InspectionType.AA_AB,
                  inspectionKind: InspectionKind.O_L,
                  templateValues: {
                    DEFAULT: {
                      value: undefined,
                      comments: '',
                    },
                    [InspectionCheckType.AA]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: '',
                    },
                    [InspectionCheckType.A]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: '',
                    },
                    [InspectionCheckType.B]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: '',
                    },
                  },
                },
              ],
            },
            {
              articleNumber: '3.3.4',
              fields: [
                {
                  description: 'ΣΥΓΚΟΛΛΗΣΕΙΣ - ΣΥΝΔΕΣΜΟΙ',
                  inspectionType: InspectionType.AA_AB,
                  inspectionKind: InspectionKind.O,
                  templateValues: {
                    DEFAULT: {
                      value: undefined,
                      comments: '',
                    },
                    [InspectionCheckType.AA]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: '',
                    },
                    [InspectionCheckType.A]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: '',
                    },
                    [InspectionCheckType.B]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: '',
                    },
                  },
                },
              ],
            },
            { articleNumber: '3.4', fields: ['ΔΙΑΔΡΟΜΗ ΦΟΡΕΙΟΥ'] },
            {
              articleNumber: '3.4.1',
              fields: [
                {
                  description: 'ΣΙΔΗΡΟΤΡΟΧΙΕΣ, ΡΑΟΥΛΑ - ΤΡΟΧΟΙ ΚΙΝΗΣΗΣ',
                  inspectionType: InspectionType.AA_AB,
                  inspectionKind: InspectionKind.O,
                  templateValues: {
                    DEFAULT: {
                      value: undefined,
                      comments: '',
                    },
                    [InspectionCheckType.AA]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.A]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.B]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                  },
                },
              ],
            },
            {
              articleNumber: '3.4.2',
              fields: [
                {
                  description: 'ΑΠΟΣΒΕΣΤΗΡΕΣ - ΤΕΡΜΑΤΑ ΔΙΑΔΡΟΜΗΣ',
                  inspectionType: InspectionType.AA_AB,
                  inspectionKind: InspectionKind.O_L,
                  templateValues: {
                    DEFAULT: {
                      value: undefined,
                      comments: '',
                    },
                    [InspectionCheckType.AA]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.A]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.B]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                  },
                },
              ],
            },
            {
              articleNumber: '3.4.3',
              fields: [
                {
                  description: 'ΣΥΝΔΕΣΜΟΙ - ΣΥΓΚΟΛΛΗΣΕΙΣ',
                  inspectionType: InspectionType.AA_AB,
                  inspectionKind: InspectionKind.O,
                  templateValues: {
                    DEFAULT: {
                      value: undefined,
                      comments: '',
                    },
                    [InspectionCheckType.AA]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.A]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.B]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                  },
                },
              ],
            },
            {
              articleNumber: '3.4.4',
              fields: [
                {
                  description: 'ΚΙΝΗΤΗΡΙΟΣ ΜΗΧΑΝΙΣΜΟΣ, ΦΡΕΝΑ',
                  inspectionType: InspectionType.AA_AB,
                  inspectionKind: InspectionKind.O_L,
                  templateValues: {
                    DEFAULT: {
                      value: undefined,
                      comments: '',
                    },
                    [InspectionCheckType.AA]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.A]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.B]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                  },
                },
              ],
            },
            {
              articleNumber: '3.4.5',
              fields: [
                {
                  description: 'ΣΥΣΤΗΜΑΤΑ ΑΣΦΑΛΙΣΗΣ',
                  inspectionType: InspectionType.AA_AB,
                  inspectionKind: InspectionKind.O_L,
                  templateValues: {
                    DEFAULT: {
                      value: undefined,
                      comments: '',
                    },
                    [InspectionCheckType.AA]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.A]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.B]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                  },
                },
              ],
            },
            { articleNumber: '3.5', fields: ['ΜΕΣΑ ΠΡΟΣΒΑΣΗΣ'] },
            {
              articleNumber: '3.5.1',
              fields: [
                {
                  description: 'ΣΚΑΛΕΣ',
                  inspectionType: InspectionType.AA_AB,
                  inspectionKind: InspectionKind.O,
                  templateValues: {
                    DEFAULT: {
                      value: undefined,
                      comments: '',
                    },
                    [InspectionCheckType.AA]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.A]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.B]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                  },
                },
              ],
            },
            {
              articleNumber: '3.5.2',
              fields: [
                {
                  description: 'ΔΙΑΔΡΟΜΟΙ',
                  inspectionType: InspectionType.AA_AB,
                  inspectionKind: InspectionKind.O,
                  templateValues: {
                    DEFAULT: {
                      value: undefined,
                      comments: '',
                    },
                    [InspectionCheckType.AA]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.A]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.B]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                  },
                },
              ],
            },
            {
              articleNumber: '3.5.3',
              fields: [
                {
                  description: 'ΆΛΛΑ ΜΕΣΑ - ΠΛΑΤΦΟΡΜΕΣ ΕΡΓΑΣΙΩΝ',
                  inspectionType: InspectionType.AA_AB,
                  inspectionKind: InspectionKind.O,
                  templateValues: {
                    DEFAULT: {
                      value: undefined,
                      comments: '',
                    },
                    [InspectionCheckType.AA]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.A]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.B]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                  },
                },
              ],
            },
            { articleNumber: '3.6', fields: ['ΑΛΛΑ ΣΤΟΙΧΕΙΑ'] },
            {
              articleNumber: '3.6.1',
              fields: [
                {
                  description: 'ΤΡΟΧΟΙ ΠΟΡΕΙΑΣ',
                  inspectionType: InspectionType.AA_AB,
                  inspectionKind: InspectionKind.O_L,
                  templateValues: {
                    DEFAULT: {
                      value: undefined,
                      comments: '',
                    },
                    [InspectionCheckType.AA]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.A]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.B]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                  },
                },
              ],
            },
            {
              articleNumber: '3.6.2',
              fields: [
                {
                  description: 'ΜΕΣΑ ΕΥΣΤΑΘΕΙΑΣ - ΑΝΑΒΟΛΕΙΣ ΠΤΩΣΗΣ',
                  inspectionType: InspectionType.AA_AB,
                  inspectionKind: InspectionKind.O,
                  templateValues: {
                    DEFAULT: {
                      value: undefined,
                      comments: '',
                    },
                    [InspectionCheckType.AA]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: '4 ποδαρικά στήριξης κατά την λειτουργία',
                    },
                    [InspectionCheckType.A]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: '4 ποδαρικά στήριξης κατά την λειτουργία',
                    },
                    [InspectionCheckType.B]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: '4 ποδαρικά στήριξης κατά την λειτουργία',
                    },
                  },
                },
              ],
            },
            {
              articleNumber: '3.6.3',
              fields: [
                {
                  description: 'ΆΞΟΝΕΣ - ΣΥΝΔΕΣΜΟΛΟΓΙΑ ΑΞΟΝΩΝ',
                  inspectionType: InspectionType.AA_AB,
                  inspectionKind: InspectionKind.O,
                  templateValues: {
                    DEFAULT: {
                      value: undefined,
                      comments: '',
                    },
                    [InspectionCheckType.AA]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: '',
                    },
                    [InspectionCheckType.A]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: '',
                    },
                    [InspectionCheckType.B]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: '',
                    },
                  },
                },
              ],
            },
            {
              articleNumber: '3.6.4',
              fields: [
                {
                  description: 'ΤΥΜΠΑΝΑ ΠΕΡΙΕΛΙΞΕΩΣ',
                  inspectionType: InspectionType.AA_AB,
                  inspectionKind: InspectionKind.O_L,
                  templateValues: {
                    DEFAULT: {
                      value: undefined,
                      comments: '',
                    },
                    [InspectionCheckType.AA]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.A]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.B]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                  },
                },
              ],
            },
            {
              articleNumber: '3.6.5',
              fields: [
                {
                  description: 'ΤΡΟΧΑΛΙΕΣ',
                  inspectionType: InspectionType.AA_AB,
                  inspectionKind: InspectionKind.O,
                  templateValues: {
                    DEFAULT: {
                      value: undefined,
                      comments: '',
                    },
                    [InspectionCheckType.AA]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.A]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.B]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                  },
                },
              ],
            },
            {
              articleNumber: '3.6.6',
              fields: [
                {
                  description: 'ΟΔΟΝΤΩΤΟΙ ΤΡΟΧΟΙ',
                  inspectionType: InspectionType.AA_AB,
                  inspectionKind: InspectionKind.O,
                  templateValues: {
                    DEFAULT: {
                      value: undefined,
                      comments: '',
                    },
                    [InspectionCheckType.AA]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: '',
                    },
                    [InspectionCheckType.A]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: '',
                    },
                    [InspectionCheckType.B]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: '',
                    },
                  },
                },
              ],
            },
            {
              articleNumber: '3.6.7',
              fields: [
                {
                  description: 'ΚΟΧΛΙΕΣ, ΠΕΡΙΚΟΧΛΙΑ, ΣΦΗΝΕΣ',
                  inspectionType: InspectionType.AA_AB,
                  inspectionKind: InspectionKind.O,
                  templateValues: {
                    DEFAULT: {
                      value: undefined,
                      comments: '',
                    },
                    [InspectionCheckType.AA]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: '',
                    },
                    [InspectionCheckType.A]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: '',
                    },
                    [InspectionCheckType.B]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: '',
                    },
                  },
                },
              ],
            },
            {
              articleNumber: '3.6.8',
              fields: [
                {
                  description: 'ΥΔΡΑΥΛΙΚΑ &amp; ΠΝΕΥΜΑΤΙΚΑ ΣΥΣΤΗΜΑΤΑ',
                  inspectionType: InspectionType.AA_AB,
                  inspectionKind: InspectionKind.O,
                  templateValues: {
                    DEFAULT: {
                      value: undefined,
                      comments: '',
                    },
                    [InspectionCheckType.AA]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: '',
                    },
                    [InspectionCheckType.A]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: '',
                    },
                    [InspectionCheckType.B]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: '',
                    },
                  },
                },
              ],
            },
            {
              articleNumber: '3.6.9',
              fields: [
                {
                  description:
                    'ΣΥΣΤΗΜΑΤΑ ΑΥΤΟΜΑΤΗΣ ΠΡΟΕΙΔΟΠΟΙΗΣΗΣ, ΣΥΣΤΗΜΑΤΑ ΟΡΙΑΚΟΥ ΤΕΡΜΑΤΙΣΜΟΥ, ΠΡΟΣΤΑΣΙΑ ΥΠΕΡΦΟΡΤΙΣΗΣ, ΒΑΛΒΙΔΑ ΑΣΦΑΛΕΙΑΣ',
                  inspectionType: InspectionType.AA_AB,
                  inspectionKind: InspectionKind.O_L,
                  templateValues: {
                    DEFAULT: {
                      value: undefined,
                      comments: '',
                    },
                    [InspectionCheckType.AA]: {
                      value: InspectionArticleFieldValue.OK,
                      comments:
                        'Στο μηχάνημα υπάρχει φάρος με φωτεινή ένδειξη υπέρβαρου και ηχητικό σήμα με ένδειξη ( % ) για την υπερφόρτιση',
                    },
                    [InspectionCheckType.A]: {
                      value: InspectionArticleFieldValue.OK,
                      comments:
                        'Στο μηχάνημα υπάρχει φάρος με φωτεινή ένδειξη υπέρβαρου και ηχητικό σήμα με ένδειξη ( % ) για την υπερφόρτιση',
                    },
                    [InspectionCheckType.B]: {
                      value: InspectionArticleFieldValue.OK,
                      comments:
                        'Στο μηχάνημα υπάρχει φάρος με φωτεινή ένδειξη υπέρβαρου και ηχητικό σήμα με ένδειξη ( % ) για την υπερφόρτιση',
                    },
                  },
                },
              ],
            },
            {
              articleNumber: '3.6.10',
              fields: [
                {
                  description: 'ΠΡΟΦΥΛΑΚΤΗΡΕΣ & ΣΥΣΤΗΜΑΤΑ ΠΡΟΣΤΑΣΙΑΣ',
                  inspectionType: InspectionType.AA_AB,
                  inspectionKind: InspectionKind.O,
                  templateValues: {
                    DEFAULT: {
                      value: undefined,
                      comments: '',
                    },
                    [InspectionCheckType.AA]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: '',
                    },
                    [InspectionCheckType.A]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: '',
                    },
                    [InspectionCheckType.B]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: '',
                    },
                  },
                },
              ],
            },
            {
              articleNumber: '3.7',
              fields: [
                {
                  description: 'ΣΥΣΤΗΜΑΤΑ ΛΙΠΑΝΣΗΣ',
                  inspectionType: InspectionType.AA_AB,
                  inspectionKind: InspectionKind.O,
                  templateValues: {
                    DEFAULT: {
                      value: undefined,
                      comments: '',
                    },
                    [InspectionCheckType.AA]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: '',
                    },
                    [InspectionCheckType.A]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: '',
                    },
                    [InspectionCheckType.B]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: '',
                    },
                  },
                },
              ],
            },
            {
              articleNumber: '3.8',
              fields: [
                {
                  description: 'ΑΠΟΣΤΑΣΕΙΣ ΑΣΦΑΛΕΙΑΣ, ΠΡΟΦΥΛΑΚΤΗΡΕΣ',
                  inspectionType: InspectionType.AA_AB,
                  inspectionKind: InspectionKind.O,
                  templateValues: {
                    DEFAULT: {
                      value: undefined,
                      comments: '',
                    },
                    [InspectionCheckType.AA]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: '',
                    },
                    [InspectionCheckType.A]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: '',
                    },
                    [InspectionCheckType.B]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: '',
                    },
                  },
                },
              ],
            },
            {
              articleNumber: '3.9',
              fields: [
                {
                  description: 'ΈΔΡΑΣΗ - ΑΓΚΥΡΩΣΕΙΣ',
                  inspectionType: InspectionType.AA_AB,
                  inspectionKind: InspectionKind.O_L,
                  templateValues: {
                    DEFAULT: {
                      value: undefined,
                      comments: '',
                    },
                    [InspectionCheckType.AA]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: 'Έδραση του γερανού',
                    },
                    [InspectionCheckType.A]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: 'Έδραση του γερανού',
                    },
                    [InspectionCheckType.B]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: 'Έδραση του γερανού',
                    },
                  },
                },
              ],
            },
            {
              articleNumber: '3.10',
              fields: [
                {
                  description: 'ΛΗΨΗ ΜΕΤΡΩΝ ΑΣΦΑΛΕΙΑΣ',
                  inspectionType: InspectionType.AA_AB,
                  inspectionKind: InspectionKind.O,
                  templateValues: {
                    DEFAULT: {
                      value: undefined,
                      comments: '',
                    },
                    [InspectionCheckType.AA]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: '',
                    },
                    [InspectionCheckType.A]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: '',
                    },
                    [InspectionCheckType.B]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: '',
                    },
                  },
                },
              ],
            },
            { articleNumber: '4.', fields: ['ΗΛΕΚΤΡΟΛΟΓΙΚΟΣ ΕΞΟΠΛΙΣΜΟΣ - ΧΕΙΡΙΣΤΗΡΙΑ'] },
            {
              articleNumber: '4.1',
              fields: [
                {
                  description: 'ΔΙΑΚΟΠΤΕΣ & ΕΝΕΡΓΟΠΟΙΗΤΕΣ',
                  inspectionType: InspectionType.AA_AB,
                  inspectionKind: InspectionKind.O_L,
                  templateValues: {
                    DEFAULT: {
                      value: undefined,
                      comments: '',
                    },
                    [InspectionCheckType.AA]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: '',
                    },
                    [InspectionCheckType.A]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: '',
                    },
                    [InspectionCheckType.B]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: '',
                    },
                  },
                },
              ],
            },
            {
              articleNumber: '4.2',
              fields: [
                {
                  description: 'ΓΡΑΜΜΕΣ ΤΡΟΦΟΔΟΣΙΑΣ, ΓΕΙΩΣΕΙΣ, ΜΟΝΩΣΕΙΣ',
                  inspectionType: InspectionType.AA_AB,
                  inspectionKind: InspectionKind.O,
                  templateValues: {
                    DEFAULT: {
                      value: undefined,
                      comments: '',
                    },
                    [InspectionCheckType.AA]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: '',
                    },
                    [InspectionCheckType.A]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: '',
                    },
                    [InspectionCheckType.B]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: '',
                    },
                  },
                },
              ],
            },
            {
              articleNumber: '4.3',
              fields: [
                {
                  description: 'ΠΙΝΑΚΕΣ, ΚΑΤΑΝΑΛΩΤΕΣ ΙΣΧΥΟΣ',
                  inspectionType: InspectionType.AA_AB,
                  inspectionKind: InspectionKind.O,
                  templateValues: {
                    DEFAULT: {
                      value: undefined,
                      comments: '',
                    },
                    [InspectionCheckType.AA]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.A]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.B]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                  },
                },
              ],
            },
            {
              articleNumber: '4.4',
              fields: [
                {
                  description: 'ΣΥΣΤΗΜΑΤΑ, ΔΙΑΚΟΠΤΕΣ ΑΣΦΑΛΕΙΑΣ',
                  inspectionType: InspectionType.AA_AB,
                  inspectionKind: InspectionKind.O_L,
                  templateValues: {
                    DEFAULT: {
                      value: undefined,
                      comments: '',
                    },
                    [InspectionCheckType.AA]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: '',
                    },
                    [InspectionCheckType.A]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: '',
                    },
                    [InspectionCheckType.B]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: '',
                    },
                  },
                },
              ],
            },
            {
              articleNumber: '4.5',
              fields: [
                {
                  description: 'ΧΕΙΡΙΣΤΗΡΙΑ',
                  inspectionType: InspectionType.AA_AB,
                  inspectionKind: InspectionKind.O_L,
                  templateValues: {
                    DEFAULT: {
                      value: undefined,
                      comments: '',
                    },
                    [InspectionCheckType.AA]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: 'Και ασύρματο',
                    },
                    [InspectionCheckType.A]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: 'Και ασύρματο',
                    },
                    [InspectionCheckType.B]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: 'Και ασύρματο',
                    },
                  },
                },
              ],
            },
            {
              articleNumber: '4.6',
              fields: [
                {
                  description: 'ΘΑΛΑΜΟΙ ΧΕΙΡΙΣΜΟΥ',
                  inspectionType: InspectionType.AA_AB,
                  inspectionKind: InspectionKind.O,
                  templateValues: {
                    DEFAULT: {
                      value: undefined,
                      comments: '',
                    },
                    [InspectionCheckType.AA]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.A]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.B]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                  },
                },
              ],
            },
            {
              articleNumber: '4.7',
              fields: [
                {
                  description: 'ΦΩΤΙΣΜΟΣ',
                  inspectionType: InspectionType.AA_AB,
                  inspectionKind: InspectionKind.O_L,
                  templateValues: {
                    DEFAULT: {
                      value: undefined,
                      comments: '',
                    },
                    [InspectionCheckType.AA]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: '',
                    },
                    [InspectionCheckType.A]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: '',
                    },
                    [InspectionCheckType.B]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: '',
                    },
                  },
                },
              ],
            },
            {
              articleNumber: '4.8',
              fields: [
                {
                  description: 'ΓΕΙΩΣΗ',
                  inspectionType: InspectionType.AA_AB,
                  inspectionKind: InspectionKind.O,
                  templateValues: {
                    DEFAULT: {
                      value: undefined,
                      comments: '',
                    },
                    [InspectionCheckType.AA]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.A]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.B]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                  },
                },
              ],
            },
            { articleNumber: '5.', fields: ['ΕΞΟΠΛΙΣΜΟΣ ΧΕΙΡΙΣΜΟΥ ΦΟΡΤΙΟΥ'] },
            {
              articleNumber: '5.1',
              fields: [
                {
                  description: 'ΣΥΡΜΑΤΟΣΧΟΙΝΑ',
                  inspectionType: InspectionType.AA_AB,
                  inspectionKind: InspectionKind.O_L,
                  templateValues: {
                    DEFAULT: {
                      value: undefined,
                      comments: '',
                    },
                    [InspectionCheckType.AA]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.A]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.B]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                  },
                },
              ],
            },
            {
              articleNumber: '5.2',
              fields: [
                {
                  description: 'ΆΛΛΑ ΕΞΑΡΤΗΜΑΤΑ ΑΝΑΡΤΗΣΗΣ ΦΟΡΤΙΟΥ',
                  inspectionType: InspectionType.AA_AB,
                  inspectionKind: InspectionKind.O,
                  templateValues: {
                    DEFAULT: {
                      value: undefined,
                      comments: '',
                    },
                    [InspectionCheckType.AA]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: 'Φέρει μηχανισμό Fly Jib',
                    },
                    [InspectionCheckType.A]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: 'Φέρει μηχανισμό Fly Jib',
                    },
                    [InspectionCheckType.B]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: 'Φέρει μηχανισμό Fly Jib',
                    },
                  },
                },
              ],
            },
            {
              articleNumber: '5.3',
              fields: [
                {
                  description: 'ΑΓΚΙΣΤΡΑ, ΑΡΠΑΓΕΣ ΚΑΙ ΥΠΟΛΟΙΠΟΣ ΣΥΝΑΦΗΣ ΕΞΟΠΛΙΣΜΟΣ',
                  inspectionType: InspectionType.AA_AB,
                  inspectionKind: InspectionKind.O,
                  templateValues: {
                    DEFAULT: {
                      value: undefined,
                      comments: '',
                    },
                    [InspectionCheckType.AA]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: 'Φέρει δύο άγκιστρα\nΆγκιστρο του Fly Jib & της κύριας μπούμας',
                    },
                    [InspectionCheckType.A]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: 'Φέρει δύο άγκιστρα\nΆγκιστρο του Fly Jib & της κύριας μπούμας',
                    },
                    [InspectionCheckType.B]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: 'Φέρει δύο άγκιστρα\nΆγκιστρο του Fly Jib & της κύριας μπούμας',
                    },
                  },
                },
              ],
            },
            { articleNumber: '6.', fields: ['ΠΡΟΣΤΑΣΙΑ ΟΔΗΓΟΥ'] },
            {
              articleNumber: '6.1',
              fields: [
                {
                  description: 'ΠΡΟΣΤΑΣΙΑ ΚΑΜΠΙΝΑΣ ΟΔΗΓΟΥ',
                  inspectionType: InspectionType.AA_AB,
                  inspectionKind: InspectionKind.O,
                  templateValues: {
                    DEFAULT: {
                      value: undefined,
                      comments: '',
                    },
                    [InspectionCheckType.AA]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.A]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.B]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                  },
                },
              ],
            },
            {
              articleNumber: '6.2',
              fields: [
                {
                  description: 'ΘΕΣΗ ΟΔΗΓΟΥ',
                  inspectionType: InspectionType.AA_AB,
                  inspectionKind: InspectionKind.O,
                  templateValues: {
                    DEFAULT: {
                      value: undefined,
                      comments: '',
                    },
                    [InspectionCheckType.AA]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.A]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.B]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                  },
                },
              ],
            },
            {
              articleNumber: '6.3',
              fields: [
                {
                  description: 'ΧΕΙΡΙΣΤΗΡΙΑ',
                  inspectionType: InspectionType.AA_AB,
                  inspectionKind: InspectionKind.O_L,
                  templateValues: {
                    DEFAULT: {
                      value: undefined,
                      comments: '',
                    },
                    [InspectionCheckType.AA]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.A]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.B]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                  },
                },
              ],
            },
            {
              articleNumber: '6.4',
              fields: [
                {
                  description: 'ΑΝΤΙΕΚΡΗΚΤΙΚΗ ΠΡΟΣΤΑΣΙΑ',
                  inspectionType: InspectionType.AA_AB,
                  inspectionKind: InspectionKind.O,
                  templateValues: {
                    DEFAULT: {
                      value: undefined,
                      comments: '',
                    },
                    [InspectionCheckType.AA]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.A]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.B]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                  },
                },
              ],
            },
            {
              articleNumber: '6.5',
              fields: [
                {
                  description: 'ΣΥΣΤΗΜΑ ΠΡΟΣΤΑΣΙΑΣ & ΕΙΔΟΠΟΙΗΣΗΣ ΧΕΙΡΙΣΤΗ',
                  inspectionType: InspectionType.AA_AB,
                  inspectionKind: InspectionKind.O_L,
                  templateValues: {
                    DEFAULT: {
                      value: undefined,
                      comments: '',
                    },
                    [InspectionCheckType.AA]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.A]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.B]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                  },
                },
              ],
            },
            { articleNumber: '7.', fields: ['ΔΟΚΙΜΕΣ ΑΝΥΨΩΣΗΣ ΦΟΡΤΙΟΥ'] },
            {
              articleNumber: '7.1',
              fields: [
                {
                  description: 'ΈΛΕΓΧΟΣ ΒΑΡΩΝ',
                  inspectionType: InspectionType.AA_A,
                  inspectionKind: InspectionKind.O,
                  templateValues: {
                    DEFAULT: {
                      value: undefined,
                      comments: '',
                    },
                    [InspectionCheckType.AA]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: 'Χρησιμοποιήθηκε δυναμοζυγός',
                    },
                    [InspectionCheckType.A]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: 'Χρησιμοποιήθηκε δυναμοζυγός',
                    },
                    [InspectionCheckType.B]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                  },
                },
              ],
            },
            {
              articleNumber: '7.1.1',
              fields: [
                {
                  description: 'ΔΙΑΚΡΙΒΩΜΕΝΑ ΒΑΡΗ',
                  inspectionType: InspectionType.AA_A,
                  inspectionKind: InspectionKind.O,
                  templateValues: {
                    DEFAULT: {
                      value: undefined,
                      comments: '',
                    },
                    [InspectionCheckType.AA]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.A]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.B]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                  },
                },
              ],
            },
            {
              articleNumber: '7.1.2',
              fields: [
                {
                  description: 'ΜΗ ΔΙΑΚΡΙΒΩΜΕΝΑ ΒΑΡΗ - ΖΥΓΙΣΗ ΣΕ ΔΙΑΚΡΙΒΩΜΕΝΗ ΠΛΑΣΤΙΓΚΑ',
                  inspectionType: InspectionType.AA_A,
                  inspectionKind: InspectionKind.O,
                  templateValues: {
                    DEFAULT: {
                      value: undefined,
                      comments: '',
                    },
                    [InspectionCheckType.AA]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.A]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.B]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                  },
                },
              ],
            },
            {
              articleNumber: '7.1.3',
              fields: [
                {
                  description: 'ΜΗ ΔΙΑΚΡΙΒΩΜΕΝΑ ΒΑΡΗ - ΣΥΓΚΡΙΣΗ ΜΕ ΔΙΑΚΡΙΒΩΜΕΝΑ ΑΝΤΙΒΑΡΑ ΓΕΡΑΝΩΝ',
                  inspectionType: InspectionType.AA_A,
                  inspectionKind: InspectionKind.O,
                  templateValues: {
                    DEFAULT: {
                      value: undefined,
                      comments: '',
                    },
                    [InspectionCheckType.AA]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.A]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.B]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                  },
                },
              ],
            },
            {
              articleNumber: '7.1.4',
              fields: [
                {
                  description: 'ΜΗ ΔΙΑΚΡΙΒΩΜΕΝΑ ΒΑΡΗ - ΑΛΛΟ:',
                  inspectionType: InspectionType.AA_A,
                  inspectionKind: InspectionKind.O,
                  templateValues: {
                    DEFAULT: {
                      value: undefined,
                      comments: '',
                    },
                    [InspectionCheckType.AA]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: 'Περονοφόρο όχημα 3900kg & Αντίβαρα μεταλλικά ζυγισμένα',
                    },
                    [InspectionCheckType.A]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: 'Περονοφόρο όχημα 3900kg & Αντίβαρα μεταλλικά ζυγισμένα',
                    },
                    [InspectionCheckType.B]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                  },
                },
              ],
            },
            {
              articleNumber: '7.2',
              fields: [
                {
                  description: 'ΣΤΑΤΙΚH ΔΟΚΙΜH',
                  inspectionType: InspectionType.AA_A,
                  inspectionKind: InspectionKind.L,
                  templateValues: {
                    DEFAULT: {
                      value: undefined,
                      comments: '',
                    },
                    [InspectionCheckType.AA]: {
                      value: InspectionArticleFieldValue.OK,
                      comments:
                        'Η στατική δοκιμή πραγματοποιήθηκε με βάρος:\n' +
                        '<b><u>1,25 x P για P ≤ 20 TONS</u></b>\n' +
                        '<b><u>επί το φορτίο πιστοποίησης.</u></b>\n' +
                        'Το φορτίο που χρησιμοποιήθηκε για ην διεξαγωγή της στατικής δοκιμής, ήταν:\n' +
                        '<b>3,925 tons at 10,40 m R</b>\n' +
                        '<b>2,162 tons at 16,75 m R</b>\n' +
                        '<b>0,82 tons at 24,85 m R Fly Jib</b>\n' +
                        'καλύπτοντας έτσι τα κριτήρια που ορίζει το ΦΕΚ 1186Β/2003 για τα ανυψωτικά μηχανήματα.',
                    },
                    [InspectionCheckType.A]: {
                      value: InspectionArticleFieldValue.OK,
                      comments:
                        'Η στατική δοκιμή πραγματοποιήθηκε με βάρος:\n' +
                        '<b><u>1,25 x P για P ≤ 20 TONS</u></b>\n' +
                        '<b><u>επί το φορτίο πιστοποίησης.</u></b>\n' +
                        'Το φορτίο που χρησιμοποιήθηκε για ην διεξαγωγή της στατικής δοκιμής, ήταν:\n' +
                        '<b>3,925 tons at 10,40 m R</b>\n' +
                        '<b>2,162 tons at 16,75 m R</b>\n' +
                        '<b>0,82 tons at 24,85 m R Fly Jib</b>\n' +
                        'καλύπτοντας έτσι τα κριτήρια που ορίζει το ΦΕΚ 1186Β/2003 για τα ανυψωτικά μηχανήματα.',
                    },
                    [InspectionCheckType.B]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                  },
                },
              ],
            },
            {
              articleNumber: '7.2α',
              fields: [
                {
                  description: 'ΈΛΕΓΧΟΣ ΒΕΛΟΥΣ ΚΑΜΨΗΣ',
                  inspectionType: InspectionType.AA_A,
                  inspectionKind: InspectionKind.O_L,
                  templateValues: {
                    DEFAULT: {
                      value: undefined,
                      comments: '',
                    },
                    [InspectionCheckType.AA]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.A]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.B]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                  },
                },
              ],
            },
            {
              articleNumber: '7.3',
              fields: [
                {
                  description: 'ΔΥΝΑΜΙΚH ΔΟΚΙΜH',
                  inspectionType: InspectionType.AA_A,
                  inspectionKind: InspectionKind.L,
                  templateValues: {
                    DEFAULT: {
                      value: undefined,
                      comments: '',
                    },
                    [InspectionCheckType.AA]: {
                      value: InspectionArticleFieldValue.OK,
                      comments:
                        'Η δυναμική δοκιμή πραγματοποιήθηκε με βάρος:\n' +
                        '<b><u>1,1 x P επί φορτίο πιστοποίησης.</u></b>\n' +
                        'Το φορτίο που χρησιμοποιήθηκε για την διεξαγωγή της δυναμικής δοκιμής, ήταν:\n' +
                        '<b>3,454 tons at 10,40 m R</b>\n' +
                        '<b>1,903 tons at 16,75 m R</b>\n' +
                        '<b>0,72 tons at 24,85 m R Fly Jib</b>\n' +
                        'καλύπτοντας έτσι τα κριτήρια που ορίζει το ΦΕΚ 1186Β/2003 για τα ανυψωτικά μηχανήματα.',
                    },
                    [InspectionCheckType.A]: {
                      value: InspectionArticleFieldValue.OK,
                      comments:
                        'Η δυναμική δοκιμή πραγματοποιήθηκε με βάρος:\n' +
                        '<b><u>1,1 x P επί φορτίο πιστοποίησης.</u></b>\n' +
                        'Το φορτίο που χρησιμοποιήθηκε για την διεξαγωγή της δυναμικής δοκιμής, ήταν:\n' +
                        '<b>3,454 tons at 10,40 m R</b>\n' +
                        '<b>1,903 tons at 16,75 m R</b>\n' +
                        '<b>0,72 tons at 24,85 m R Fly Jib</b>\n' +
                        'καλύπτοντας έτσι τα κριτήρια που ορίζει το ΦΕΚ 1186Β/2003 για τα ανυψωτικά μηχανήματα.',
                    },
                    [InspectionCheckType.B]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                  },
                },
              ],
            },
            {
              articleNumber: '7.4',
              fields: [
                {
                  description: 'ΔΟΚΙΜH ΕΥΣΤΑΘΕΙΑΣ',
                  inspectionType: InspectionType.AA_A,
                  inspectionKind: InspectionKind.L,
                  templateValues: {
                    DEFAULT: {
                      value: undefined,
                      comments: '',
                    },
                    [InspectionCheckType.AA]: {
                      value: InspectionArticleFieldValue.OK,
                      comments:
                        'Η δοκιμή ευστάθειας πραγματοποιήθηκε με βάρος:\n' +
                        '<b><u>1,25 επί του ονομαστικού φορτίου + 0,1 επί το βάρος της κεραίας του ανυψωτικού, </u></b>' +
                        'καλύπτοντας έτσι τα κριτήρια που ορίζει το ΦΕΚ 1186Β/2003 για τα ανυψωτικά μηχανήματα.',
                    },
                    [InspectionCheckType.A]: {
                      value: InspectionArticleFieldValue.OK,
                      comments:
                        'Η δοκιμή ευστάθειας πραγματοποιήθηκε με βάρος:\n' +
                        '<b><u>1,25 επί του ονομαστικού φορτίου + 0,1 επί το βάρος της κεραίας του ανυψωτικού, </u></b>' +
                        'καλύπτοντας έτσι τα κριτήρια που ορίζει το ΦΕΚ 1186Β/2003 για τα ανυψωτικά μηχανήματα.',
                    },
                    [InspectionCheckType.B]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                  },
                },
              ],
            },
          ],
        },
        {
          name: 'ΙΙ. ΕΠΙΠΛΕΟΝ ΑΠΑΙΤΗΣΕΙΣ ΓΙΑ ΚΙΝΗΤΑ ΑΝΥΨΩΤΙΚΑ',
          inspectionArticles: [
            {
              articleNumber: '1.',
              fields: [
                {
                  description: 'ΜΕΣΑ ΕΥΣΤΑΘΕΙΑΣ, ΑΝΑΒΟΛΕΙΣ ΠΤΩΣΗΣ',
                  inspectionType: InspectionType.AA_AB,
                  inspectionKind: InspectionKind.O,
                  templateValues: {
                    DEFAULT: {
                      value: undefined,
                      comments: '',
                    },
                    [InspectionCheckType.AA]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: '',
                    },
                    [InspectionCheckType.A]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: '',
                    },
                    [InspectionCheckType.B]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: '',
                    },
                  },
                },
              ],
            },
            {
              articleNumber: '2.',
              fields: [
                {
                  description: 'ΣΤΟΙΧΕΙΑ ΟΧΗΜΑΤΟΣ, ΣΗΜΑΝΣΗ, ΠΡΟΕΙΔΟΠΟΙΗΤΙΚΑ',
                  inspectionType: InspectionType.AA_AB,
                  inspectionKind: InspectionKind.L,
                  templateValues: {
                    DEFAULT: {
                      value: undefined,
                      comments: '',
                    },
                    [InspectionCheckType.AA]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: '',
                    },
                    [InspectionCheckType.A]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: '',
                    },
                    [InspectionCheckType.B]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: '',
                    },
                  },
                },
              ],
            },
            {
              articleNumber: '3.',
              fields: [
                {
                  description: 'ΣΥΣΤΗΜΑ ΕΛΕΓΧΟΥ ΑΝΥΨΩΣΗΣ ΑΠΟ ΤΟ ΘΑΛΑΜΟ',
                  inspectionType: InspectionType.AA_AB,
                  inspectionKind: InspectionKind.O_L,
                  templateValues: {
                    DEFAULT: {
                      value: undefined,
                      comments: '',
                    },
                    [InspectionCheckType.AA]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.A]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.B]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                  },
                },
              ],
            },
            {
              articleNumber: '4.',
              fields: [
                {
                  description: 'ΣΚΕΛΕΤΟΣ ΟΧΗΜΑΤΟΣ, ΤΡΟΧΟΙ',
                  inspectionType: InspectionType.AA_AB,
                  inspectionKind: InspectionKind.O,
                  templateValues: {
                    DEFAULT: {
                      value: undefined,
                      comments: '',
                    },
                    [InspectionCheckType.AA]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: '',
                    },
                    [InspectionCheckType.A]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: '',
                    },
                    [InspectionCheckType.B]: {
                      value: InspectionArticleFieldValue.OK,
                      comments: '',
                    },
                  },
                },
              ],
            },
            {
              articleNumber: '5.',
              fields: [
                {
                  description: 'ΠΡΟΣΤΑΣΙΑ ΚΑΜΠΙΝΑΣ ΟΔΗΓΟΥ',
                  inspectionType: InspectionType.AA_AB,
                  inspectionKind: InspectionKind.O,
                  templateValues: {
                    DEFAULT: {
                      value: undefined,
                      comments: '',
                    },
                    [InspectionCheckType.AA]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.A]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.B]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                  },
                },
              ],
            },
          ],
        },
        {
          name: 'ΙΙI. ΕΠΙΠΛΕΟΝ ΑΠΑΙΤΗΣΕΙΣ ΓΙΑ ΠΕΡΟΝΟΦΟΡΑ',
          inspectionArticles: [
            {
              articleNumber: '1.',
              fields: [
                {
                  description: 'ΌΧΗΜΑ, ΠΛΑΙΣΙΟ ΑΝΥΨΩΣΗΣ',
                  inspectionType: InspectionType.AA_AB,
                  inspectionKind: InspectionKind.O_L,
                  templateValues: {
                    DEFAULT: {
                      value: undefined,
                      comments: '',
                    },
                    [InspectionCheckType.AA]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.A]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.B]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                  },
                },
              ],
            },
            {
              articleNumber: '1.1',
              fields: [
                {
                  description: 'ΣΤΟΙΧΕΙΑ ΟΧΗΜΑΤΟΣ, ΣΗΜΑΝΣΗ, ΙΣΤΟΣ',
                  inspectionType: InspectionType.AA_AB,
                  inspectionKind: InspectionKind.O,
                  templateValues: {
                    DEFAULT: {
                      value: undefined,
                      comments: '',
                    },
                    [InspectionCheckType.AA]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.A]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.B]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                  },
                },
              ],
            },
            {
              articleNumber: '1.2',
              fields: [
                {
                  description: 'ΡΑΟΥΛΑ ΚΥΛΙΣΗΣ',
                  inspectionType: InspectionType.AA_AB,
                  inspectionKind: InspectionKind.O_L,
                  templateValues: {
                    DEFAULT: {
                      value: undefined,
                      comments: '',
                    },
                    [InspectionCheckType.AA]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.A]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.B]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                  },
                },
              ],
            },
            {
              articleNumber: '1.3',
              fields: [
                {
                  description: 'ΈΔΡΑΣΗ ΤΡΟΧΩΝ ΚΥΛΙΣΗΣ',
                  inspectionType: InspectionType.AA_AB,
                  inspectionKind: InspectionKind.O_L,
                  templateValues: {
                    DEFAULT: {
                      value: undefined,
                      comments: '',
                    },
                    [InspectionCheckType.AA]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.A]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.B]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                  },
                },
              ],
            },
            {
              articleNumber: '1.4',
              fields: [
                {
                  description: 'ΡΑΟΥΛΑ ΑΛΥΣΙΔΩΝ',
                  inspectionType: InspectionType.AA_AB,
                  inspectionKind: InspectionKind.O_L,
                  templateValues: {
                    DEFAULT: {
                      value: undefined,
                      comments: '',
                    },
                    [InspectionCheckType.AA]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.A]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.B]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                  },
                },
              ],
            },
            {
              articleNumber: '1.5',
              fields: [
                {
                  description: 'ΑΛΥΣΙΔΑ',
                  inspectionType: InspectionType.AA_AB,
                  inspectionKind: InspectionKind.O_L,
                  templateValues: {
                    DEFAULT: {
                      value: undefined,
                      comments: '',
                    },
                    [InspectionCheckType.AA]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.A]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.B]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                  },
                },
              ],
            },
            {
              articleNumber: '1.6',
              fields: [
                {
                  description: 'ΦΡΕΝΑ ΟΧΗΜΑΤΟΣ',
                  inspectionType: InspectionType.AA_AB,
                  inspectionKind: InspectionKind.O_L,
                  templateValues: {
                    DEFAULT: {
                      value: undefined,
                      comments: '',
                    },
                    [InspectionCheckType.AA]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.A]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.B]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                  },
                },
              ],
            },
            {
              articleNumber: '2.',
              fields: [
                {
                  description: 'ΣΥΣΤΗΜΑ ΦΟΡΤΙΟΥ',
                  inspectionType: InspectionType.AA_AB,
                  inspectionKind: InspectionKind.O_L,
                  templateValues: {
                    DEFAULT: {
                      value: undefined,
                      comments: '',
                    },
                    [InspectionCheckType.AA]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.A]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.B]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                  },
                },
              ],
            },
            {
              articleNumber: '2.1',
              fields: [
                {
                  description: 'ΦΟΡΕΑΣ ΠΕΡΟΝΩΝ, ΠΕΡΟΝΕΣ',
                  inspectionType: InspectionType.AA_AB,
                  inspectionKind: InspectionKind.O_L,
                  templateValues: {
                    DEFAULT: {
                      value: undefined,
                      comments: '',
                    },
                    [InspectionCheckType.AA]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.A]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.B]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                  },
                },
              ],
            },
            {
              articleNumber: '2.2',
              fields: [
                {
                  description: 'ΈΛΕΓΧΟΣ ΥΠΕΡΦΟΡΤΩΣΗΣ, ΕΠΙΠΛΕΟΝ ΕΠΙΣΚΕΥΕΣ',
                  inspectionType: InspectionType.AA_AB,
                  inspectionKind: InspectionKind.O_L,
                  templateValues: {
                    DEFAULT: {
                      value: undefined,
                      comments: '',
                    },
                    [InspectionCheckType.AA]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.A]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.B]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                  },
                },
              ],
            },
            {
              articleNumber: '3.',
              fields: [
                {
                  description: 'ΠΡΟΣΤΑΣΙΑ ΟΔΗΓΟΥ',
                  inspectionType: InspectionType.AA_AB,
                  inspectionKind: InspectionKind.O,
                  templateValues: {
                    DEFAULT: {
                      value: undefined,
                      comments: '',
                    },
                    [InspectionCheckType.AA]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.A]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.B]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                  },
                },
              ],
            },
            {
              articleNumber: '3.1',
              fields: [
                {
                  description: 'ΠΡΟΣΤΑΤΕΥΤΙΚΟ ΔΙΚΤΥΩΜΑ ‘Η ΚΟΥΒΟΥΚΛΙΟ ΘΕΣΗΣ ΟΔΗΓΟΥ',
                  inspectionType: InspectionType.AA_AB,
                  inspectionKind: InspectionKind.O,
                  templateValues: {
                    DEFAULT: {
                      value: undefined,
                      comments: '',
                    },
                    [InspectionCheckType.AA]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.A]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.B]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                  },
                },
              ],
            },
            {
              articleNumber: '3.2',
              fields: [
                {
                  description: 'ΘΕΣΗ ΟΔΗΓΟΥ',
                  inspectionType: InspectionType.AA_AB,
                  inspectionKind: InspectionKind.O,
                  templateValues: {
                    DEFAULT: {
                      value: undefined,
                      comments: '',
                    },
                    [InspectionCheckType.AA]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.A]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.B]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                  },
                },
              ],
            },
            {
              articleNumber: '3.3',
              fields: [
                {
                  description: 'ΠΡΟΣΤΑΣΙΑ ΠΥΡΚΑΓΙΑΣ, ΠΡΟΣΤΑΣΙΑ ΣΤΑΤΙΚΟΥ ΗΛΕΚΤΡΙΣΜΟΥ',
                  inspectionType: InspectionType.AA_AB,
                  inspectionKind: InspectionKind.O_L,
                  templateValues: {
                    DEFAULT: {
                      value: undefined,
                      comments: '',
                    },
                    [InspectionCheckType.AA]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.A]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.B]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                  },
                },
              ],
            },
            {
              articleNumber: '3.4',
              fields: [
                {
                  description: 'ΑΝΤΙΕΚΡΗΚΤΙΚΗ ΠΡΟΣΤΑΣΙΑ',
                  inspectionType: InspectionType.AA_AB,
                  inspectionKind: InspectionKind.O_L,
                  templateValues: {
                    DEFAULT: {
                      value: undefined,
                      comments: '',
                    },
                    [InspectionCheckType.AA]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.A]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.B]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                  },
                },
              ],
            },
          ],
        },
        {
          name: 'ΙV. ΕΠΙΠΛΕΟΝ ΑΠΑΙΤΗΣΕΙΣ ΓΙΑ ΑΝΤΛΙΕΣ ΣΚΥΡΟΔΕΜΑΤΟΣ',
          inspectionArticles: [
            {
              articleNumber: '1.',
              fields: [
                {
                  description: 'ΔΙΚΤΥΟ ΣΚΥΡΟΔΕΜΑΤΟΣ',
                  inspectionType: InspectionType.AA_AB,
                  inspectionKind: InspectionKind.O,
                  templateValues: {
                    DEFAULT: {
                      value: undefined,
                      comments: '',
                    },
                    [InspectionCheckType.AA]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.A]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.B]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                  },
                },
              ],
            },
            {
              articleNumber: '2.',
              fields: [
                {
                  description: 'ΣΗΜΑΝΣΕΙΣ',
                  inspectionType: InspectionType.AA_AB,
                  inspectionKind: InspectionKind.O,
                  templateValues: {
                    DEFAULT: {
                      value: undefined,
                      comments: '',
                    },
                    [InspectionCheckType.AA]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.A]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.B]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                  },
                },
              ],
            },
          ],
        },
        {
          name: 'V. ΕΠΙΠΛΕΟΝ ΑΠΑΙΤΗΣΕΙΣ ΓΙΑ ΜΗΧΑΝΗΜΑΤΑ ΕΡΓΩΝ',
          inspectionArticles: [
            {
              articleNumber: '1.',
              fields: [
                {
                  description: 'ΣΥΣΤΗΜΑ ΔΙΕΥΘΥΝΣΗΣ',
                  inspectionType: InspectionType.AA_AB,
                  inspectionKind: InspectionKind.O_L,
                  templateValues: {
                    DEFAULT: {
                      value: undefined,
                      comments: '',
                    },
                    [InspectionCheckType.AA]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.A]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.B]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                  },
                },
              ],
            },
            {
              articleNumber: '2.',
              fields: [
                {
                  description: 'ΣΥΣΤΗΜΑ ΑΝΑΡΤΗΣΗΣ',
                  inspectionType: InspectionType.AA_AB,
                  inspectionKind: InspectionKind.O_L,
                  templateValues: {
                    DEFAULT: {
                      value: undefined,
                      comments: '',
                    },
                    [InspectionCheckType.AA]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.A]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.B]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                  },
                },
              ],
            },
            {
              articleNumber: '3.',
              fields: [
                {
                  description: 'ΣΥΣΤΗΜΑ ΠΕΔΗΣΗΣ',
                  inspectionType: InspectionType.AA_AB,
                  inspectionKind: InspectionKind.O_L,
                  templateValues: {
                    DEFAULT: {
                      value: undefined,
                      comments: '',
                    },
                    [InspectionCheckType.AA]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.A]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.B]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                  },
                },
              ],
            },
            {
              articleNumber: '4.',
              fields: [
                {
                  description: 'ΤΡΟΧΟΙ, ΕΛΑΣΤΙΚΑ, ΕΡΠΥΣΤΡΙΕΣ',
                  inspectionType: InspectionType.AA_AB,
                  inspectionKind: InspectionKind.O,
                  templateValues: {
                    DEFAULT: {
                      value: undefined,
                      comments: '',
                    },
                    [InspectionCheckType.AA]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.A]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.B]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                  },
                },
              ],
            },
            {
              articleNumber: '5.',
              fields: [
                {
                  description: 'ΦΩΤΑ',
                  inspectionType: InspectionType.AA_AB,
                  inspectionKind: InspectionKind.O_L,
                  templateValues: {
                    DEFAULT: {
                      value: undefined,
                      comments: '',
                    },
                    [InspectionCheckType.AA]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.A]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                    [InspectionCheckType.B]: {
                      value: InspectionArticleFieldValue.NA,
                      comments: '',
                    },
                  },
                },
              ],
            },
          ],
        },
      ],
    };
  }
}

export default Certificate;
