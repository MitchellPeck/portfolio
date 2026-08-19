import * as migration_20260819_140531_initial from './20260819_140531_initial';

export const migrations = [
  {
    up: migration_20260819_140531_initial.up,
    down: migration_20260819_140531_initial.down,
    name: '20260819_140531_initial'
  },
];
