import { defaultsDeep } from 'lodash-es';
import {
  ISpikeArticlesFields,
  ISpikeShoes,
  ISpikeShoesFields
} from '~/types/generated/contentful';

export interface IShoeColorVariation {
  id: string;
  imageUrls: string[];
}

export interface IShoeStrength {
  icon: string;
  label: string;
  description?: string;
}

export interface IShoeKeyFeature {
  id: string;
  title?: string;
  imageUrls?: string[];
  description?: string;
}

export interface ISpikeModel
  extends Partial<ISpikeShoesFields>,
    Partial<ISpikeArticlesFields> {
  id: string;
  name: string;
  colorVariations: IShoeColorVariation[];
  reviewRating?: number;
  strength?: IShoeStrength[];
  keyFeatures?: IShoeKeyFeature[];
}

export const transrateSpikeEntityToModel = (
  entity: ISpikeShoes
): ISpikeModel => {
  if (!entity) {
    throw new Error('#transrateSpikeEntityToModel entity is null');
  }

  const model: ISpikeModel = {
    id: entity.sys.id,
    colorVariations: createColorVariations(entity),
    reviewRating: 3.8,
    keyFeatures: createKeyFeatures(entity.fields.spikeArticle.fields)
  } as ISpikeModel;

  defaultsDeep(model, entity.fields);
  entity.fields.spikeArticle?.fields &&
    defaultsDeep(model, entity.fields.spikeArticle?.fields);
  model.spikeArticle = undefined;

  return model;
};

const createKeyFeatures = (fields: ISpikeArticlesFields): IShoeKeyFeature[] => {
  const keyFeatures: IShoeKeyFeature[] = [];

  for (let i = 1; i < 5; i++) {
    if (fields[`keyFeatureTitle${i}` as keyof ISpikeArticlesFields]) {
      keyFeatures.push({
        id: i.toString(),
        title: (fields[`keyFeatureTitle${i}` as keyof ISpikeArticlesFields] ||
          undefined) as string | undefined,
        imageUrls: (fields[
          `keyFeatureImageUrls${i}` as keyof ISpikeArticlesFields
        ] || undefined) as string[] | undefined,
        description: fields[
          `keyFeatureDescription${i}` as keyof ISpikeArticlesFields
        ] as string | undefined
      });
    }
  }

  return keyFeatures;
};

const createColorVariations = (entity: ISpikeShoes) => {
  return entity.fields.colors?.map((color, index) => {
    return {
      id: color,
      imageUrls:
        entity.fields[
          `colorVariationImage${index + 1}` as keyof ISpikeShoesFields
        ]
    };
  });
};
