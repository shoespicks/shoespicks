// ISpikeShoesFieldsのeventsからコピー
export type EventCode =
  | '100m'
  | '200m'
  | '400m'
  | '110mH'
  | '400mH'
  | '800m'
  | '1500m'
  | '3000m'
  | '5000m'
  | 'highJump'
  | 'longJump'
  | 'poleVault'
  | 'tripleJump'
  | 'shotPut'
  | 'discusThrow'
  | 'hammerThrow'
  | 'javelinThrow';

export type EventCategoryCode =
  | 'short-distance'
  | 'middle-distance'
  | 'long-distance'
  | 'jumping'
  | 'throwing'
  | EventCode;

export interface EventCategory {
  id: string;
  label: string;
  events: EventCategoryCode[];
}

export const shoeEventCategory: {
  [key in EventCategoryCode]: EventCategory;
} = {
  '100m': {
    id: '100m',
    label: '100m',
    events: ['100m']
  },
  '200m': {
    id: '200m',
    label: '200m',
    events: ['200m']
  },
  '400m': {
    id: '400m',
    label: '400m',
    events: ['400m']
  },
  '110mH': {
    id: '',
    label: '',
    events: ['110mH']
  },
  '400mH': {
    id: '',
    label: '',
    events: ['400mH']
  },
  '800m': {
    id: '800m',
    label: '800m',
    events: ['800m']
  },
  '1500m': {
    id: '1500m',
    label: '1500m',
    events: ['1500m']
  },
  '3000m': {
    id: '3000m',
    label: '3000m',
    events: ['3000m']
  },
  '5000m': {
    id: '5000m',
    label: '5000m',
    events: ['5000m']
  },
  highJump: {
    id: 'highJump',
    label: '走高跳',
    events: ['highJump']
  },
  longJump: {
    id: 'longJump',
    label: '走高跳',
    events: ['longJump']
  },
  poleVault: {
    id: 'poleVault',
    label: '棒高跳',
    events: ['poleVault']
  },
  tripleJump: {
    id: 'tripleJump',
    label: '三段跳',
    events: ['tripleJump']
  },
  shotPut: {
    id: 'shotPut',
    label: '砲丸投',
    events: ['shotPut']
  },
  discusThrow: {
    id: 'discusThrow',
    label: '円盤投',
    events: ['discusThrow']
  },
  hammerThrow: {
    id: 'hammerThrow',
    label: 'ハンマー投',
    events: ['hammerThrow']
  },
  javelinThrow: {
    id: 'javelinThrow',
    label: 'やり投',
    events: ['javelinThrow']
  },

  // ここからカテゴリ

  'short-distance': {
    id: 'short-distance',
    label: '短距離',
    events: ['100m', '200m', '400m']
  },
  'middle-distance': {
    id: 'middle-distance',
    label: '中距離',
    events: ['800m', '1500m']
  },
  'long-distance': {
    id: 'long-distance',
    label: '長距離',
    events: ['3000m', '5000m']
  },
  jumping: {
    id: 'jumping',
    label: '跳躍',
    events: ['longJump', 'highJump', 'tripleJump', 'poleVault']
  },
  throwing: {
    id: 'throwing',
    label: '投てき',
    events: ['shotPut', 'discusThrow', 'javelinThrow', 'hammerThrow']
  }
};
