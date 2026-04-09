// src/data/heroes.ts
export type IHero = {
  id: number;
  name: string;
  imagePath: string;
  skillImagePath: string;
  isActiveSkill: boolean;
};

export const HeroData: IHero[] = [
  { id: 1, name: 'ALOK', imagePath: '/assets/hero/ALOK.png', skillImagePath: '', isActiveSkill: true },
  { id: 2, name: 'CLU', imagePath: '/assets/hero/CLU.png', skillImagePath: '', isActiveSkill: true },
  { id: 3, name: 'DIMITRI', imagePath: '/assets/hero/DIMITRI.png', skillImagePath: '', isActiveSkill: true },
  { id: 4, name: 'HOMER', imagePath: '/assets/hero/HOMER.png', skillImagePath: '', isActiveSkill: true },
  { id: 5, name: 'IGNIS', imagePath: '/assets/hero/IGNIS.png', skillImagePath: '', isActiveSkill: true },
  { id: 6, name: 'IRIS', imagePath: '/assets/hero/IRIS.png', skillImagePath: '', isActiveSkill: true },
  { id: 7, name: 'K', imagePath: '/assets/hero/K.png', skillImagePath: '', isActiveSkill: true },
  { id: 8, name: 'KASSIE', imagePath: '/assets/hero/KASSIE.png', skillImagePath: '', isActiveSkill: true },
  { id: 9, name: 'KENTA', imagePath: '/assets/hero/KENTA.png', skillImagePath: '', isActiveSkill: true },
  { id: 10, name: 'KODA', imagePath: '/assets/hero/KODA.png', skillImagePath: '', isActiveSkill: true },
  { id: 11, name: 'NERO', imagePath: '/assets/hero/NERO.png', skillImagePath: '', isActiveSkill: true },
  { id: 12, name: 'ORION', imagePath: '/assets/hero/ORION.png', skillImagePath: '', isActiveSkill: true },
  { id: 13, name: 'OSCAR', imagePath: '/assets/hero/OSCAR.png', skillImagePath: '', isActiveSkill: true },
  { id: 14, name: 'RYDEN', imagePath: '/assets/hero/RYDEN.png', skillImagePath: '', isActiveSkill: true },
  { id: 15, name: 'SANTINO', imagePath: '/assets/hero/SANTINO.png', skillImagePath: '', isActiveSkill: true },
  { id: 16, name: 'SKYLER', imagePath: '/assets/hero/SKYLER.png', skillImagePath: '', isActiveSkill: true },
  { id: 17, name: 'STEFFIE', imagePath: '/assets/hero/STEFFIE.png', skillImagePath: '', isActiveSkill: true },
  { id: 18, name: 'TATSUYA', imagePath: '/assets/hero/TATSUYA.png', skillImagePath: '', isActiveSkill: true },
  { id: 19, name: 'WUKONG', imagePath: '/assets/hero/WUKONG.png', skillImagePath: '', isActiveSkill: true },
  { id: 20, name: 'XAYNE', imagePath: '/assets/hero/XAYNE.png', skillImagePath: '', isActiveSkill: true },
  { id: 21, name: 'CHRONO', imagePath: '/assets/hero/CHRONO.png', skillImagePath: '', isActiveSkill: true },
  { id: 22, name: 'A124', imagePath: '/assets/hero/A124.png', skillImagePath: '', isActiveSkill: true },
  { id: 23, name: 'MORSE', imagePath: '/assets/hero/MORSE.png', skillImagePath: '', isActiveSkill: true },
];