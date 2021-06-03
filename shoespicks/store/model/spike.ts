import { ISpikeShoes, ISpikeShoesFields } from '~/types/generated/contentful';

export interface IShoeColorVariation {
  id: string;
  imageUrls: string[];
}

export interface ISpikeModel extends ISpikeShoesFields {
  id: string;
  colorVariations: IShoeColorVariation[];
  reviewRating?: number;
  strength?: { icon: string; label: string; description?: string }[];
}

const getColorVariationImageProperty = (
  index: number
): keyof ISpikeShoesFields => {
  return ('colorVariationImage' + index) as keyof ISpikeShoesFields;
};

export const transrateSpikeEntityToModel = (
  entity: ISpikeShoes
): ISpikeModel => {
  if (!entity) {
    throw new Error('#transrateSpikeEntityToModel entity is null');
  }

  return {
    id: entity.sys.id,
    colorVariations: entity.fields.colors?.map((color, index) => {
      const colorVariationImageProperty = getColorVariationImageProperty(
        index + 1
      );
      return {
        id: color,
        imageUrls: entity.fields[colorVariationImageProperty]
      };
    }),
    reviewRating: 3.8,
    ...entity.fields
  } as ISpikeModel;
};
