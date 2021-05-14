// ISpikeShoesFieldsのbrandsからコピー
export type AthleteLevelCode =
  | 'beginner'
  | 'intermediate'
  | 'advanced'
  | 'professional';

export interface AthleteLevel {
  id: AthleteLevelCode;
  name: string;
}

export const athleteLevels: { [key in AthleteLevelCode]: AthleteLevel } = {
  beginner: {
    id: 'beginner',
    name: '初心者'
  },
  intermediate: {
    id: 'intermediate',
    name: '中級者'
  },
  advanced: {
    id: 'advanced',
    name: '上級者'
  },
  professional: {
    id: 'professional',
    name: 'エキスパート'
  }
};
