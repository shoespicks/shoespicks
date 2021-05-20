// ISpikeShoesFieldsのbrandsからコピー
import { ISelectItem } from '~/types/selectItem';

export type AthleteLevelCode =
  | 'beginner'
  | 'intermediate'
  | 'advanced'
  | 'professional';

export interface AthleteLevel extends ISelectItem {
  id: AthleteLevelCode;
}

export const athleteLevels: { [key in AthleteLevelCode]: AthleteLevel } = {
  beginner: {
    id: 'beginner',
    label: '初心者'
  },
  intermediate: {
    id: 'intermediate',
    label: '中級者'
  },
  advanced: {
    id: 'advanced',
    label: '上級者'
  },
  professional: {
    id: 'professional',
    label: 'エキスパート'
  }
};
