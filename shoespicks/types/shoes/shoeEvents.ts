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
  title: string;
  events: EventCategoryCode[];
}

export const shoeEventCategory: {
  [key in EventCategoryCode]: EventCategory;
} = {
  '100m': {
    id: '100m',
    title: '100m',
    events: ['100m']
  },
  '200m': {
    id: '200m',
    title: '200m',
    events: ['200m']
  },
  '400m': {
    id: '400m',
    title: '400m',
    events: ['400m']
  },
  '110mH': {
    id: '',
    title: '',
    events: ['110mH']
  },
  '400mH': {
    id: '',
    title: '',
    events: ['400mH']
  },
  '800m': {
    id: '800m',
    title: '800m',
    events: ['800m']
  },
  '1500m': {
    id: '1500m',
    title: '1500m',
    events: ['1500m']
  },
  '3000m': {
    id: '3000m',
    title: '3000m',
    events: ['3000m']
  },
  '5000m': {
    id: '5000m',
    title: '5000m',
    events: ['5000m']
  },
  highJump: {
    id: 'highJump',
    title: '走高跳',
    events: ['highJump']
  },
  longJump: {
    id: 'longJump',
    title: '走高跳',
    events: ['longJump']
  },
  poleVault: {
    id: 'poleVault',
    title: '棒高跳',
    events: ['poleVault']
  },
  tripleJump: {
    id: 'tripleJump',
    title: '三段跳',
    events: ['tripleJump']
  },
  shotPut: {
    id: 'shotPut',
    title: '砲丸投',
    events: ['shotPut']
  },
  discusThrow: {
    id: 'discusThrow',
    title: '円盤投',
    events: ['discusThrow']
  },
  hammerThrow: {
    id: 'hammerThrow',
    title: 'ハンマー投',
    events: ['hammerThrow']
  },
  javelinThrow: {
    id: 'javelinThrow',
    title: 'やり投',
    events: ['javelinThrow']
  },

  // ここからカテゴリ

  'short-distance': {
    id: 'short-distance',
    title: '短距離',
    events: ['100m', '200m', '400m']
  },
  'middle-distance': {
    id: 'middle-distance',
    title: '中距離',
    events: ['800m', '1500m']
  },
  'long-distance': {
    id: 'long-distance',
    title: '長距離',
    events: ['3000m', '5000m']
  },
  jumping: {
    id: 'jumping',
    title: '跳躍',
    events: ['longJump', 'highJump', 'tripleJump', 'poleVault']
  },
  throwing: {
    id: 'throwing',
    title: '投てき',
    events: ['shotPut', 'discusThrow', 'javelinThrow', 'hammerThrow']
  }
};
