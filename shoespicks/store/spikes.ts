import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import { contentfulClient } from '~/plugins/contentful';
import {
  ISpikeModel,
  transrateSpikeEntityToModel
} from '~/store/model/spikeModel';
import { ISpikeShoes } from '~/types/generated/contentful';
import { AthleteLevelCode } from '~/types/shoes/athleteLevel';
import { ShoeBrandsCode } from '~/types/shoes/shoeBrands';
import { shoeColorsCode } from '~/types/shoes/shoeColors';
import { EventCategory } from '~/types/shoes/shoeEvents';

// 検索条件フォームにバインドするデータモデルのIF
export interface ISpikesSearchFormValue {
  eventCategory?: EventCategory;
  keyword?: string;
  brands?: ShoeBrandsCode[];
  level?: AthleteLevelCode;
  price?: number;
  colors?: shoeColorsCode[];
  allWeatherOnly?: boolean;
}

// APIに渡す検索条件のIF
export interface ISpikesSearchInput {
  // eslint-disable-next-line camelcase
  content_type: 'spikeShoes';
  query?: string;
  'fields.brand[in]'?: string;
  'fields.level'?: string;
  'fields.colors[in]'?: string;
  'fields.allWeatherOnly[in]'?: string;
}

// 検索条件フォームの値をAPIの検索条件に変換
export const createSearchInput = (formValue: ISpikesSearchFormValue) => {
  const input: ISpikesSearchInput = {
    content_type: 'spikeShoes',
    query: formValue?.keyword || undefined,
    'fields.brand[in]': formValue?.brands?.join(',') || undefined,
    'fields.level': formValue.level || undefined,
    'fields.colors[in]': formValue?.colors?.join(',') || undefined
  };
  return input;
};

@Module({
  name: 'spikes',
  stateFactory: true,
  namespaced: true
})
export default class Spikes extends VuexModule {
  private _spikes: ISpikeModel[] = [];

  get spikes(): ISpikeModel[] {
    return this._spikes;
  }

  @Mutation setSpikes(val: ISpikeModel[]) {
    this._spikes = val;
  }

  @Action({ rawError: true }) public async search(
    formValue: ISpikesSearchFormValue = {}
  ) {
    await contentfulClient
      .getEntries(createSearchInput(formValue))
      .then((items: any) => {
        this.setSpikes(
          items.items.map((item: ISpikeShoes) =>
            transrateSpikeEntityToModel(item)
          )
        );

        console.log(items.items);
      })
      .catch(() => {
        throw new Error('Spikes#search() faild');
      });
  }

  @Action({ rawError: true }) async getBySlug(
    slug: string
  ): Promise<ISpikeModel> {
    const input = {
      content_type: 'spikeShoes',
      'fields.slug': slug
    };

    return await contentfulClient
      .getEntries(input)
      .then((entries: any) => {
        console.log(transrateSpikeEntityToModel(entries.items[0]));
        return transrateSpikeEntityToModel(entries.items[0]);
      })
      .catch(() => {
        throw new Error('Spikes#getBySlug() faild');
      });
  }
}
