import { constants as actions } from '../../store/actions';
import '../../components/viron-error/index.tag';

export default {
  /**
   * ページ遷移前の処理。
   * @param {riotx.Store} store
   * @param {Object} route
   * @param {Function} replace
   * @return {Promise}
   */
  onBefore: (store, route, replace) => {
    const endpointKey = route.params.endpointKey;
    const endpoint = store.getter('endpoints.one', endpointKey);

    // endpointが存在しなければTOPに戻す。
    if (!endpoint) {
      return Promise
        .resolve()
        .then(() => {
          replace('/');
        })
        .catch(err => store.action(actions.MODALS_ADD, 'viron-error', {
          error: err
        }));
    }

    return Promise
      .resolve()
      .then(() => store.action(actions.CURRENT_UPDATE, endpointKey))
      .then(() => {
        // 無駄な通信を減らすために、`viron`データを未取得の場合のみfetchする。
        const isVironExist = store.getter('viron.existence');
        if (isVironExist) {
          return Promise.resolve();
        }
        return Promise
          .resolve()
          .then(() => store.action(actions.OAS_SETUP, endpointKey, endpoint.url, endpoint.token))
          .then(() => store.action(actions.VIRON_GET));
      })
      .then(() => {
        // pageが指定されていない場合は`viron`のpageリストの先頭項目を自動選択する。
        if (!route.params.page) {
          return Promise.resolve().then(() => {
            const pageName = store.getter('viron.pageIdOf', 0);
            replace(`/${endpointKey}/${pageName}`);
          });
        }
        return store.action(actions.PAGE_GET, route.params.page);
      })
      .catch(err => {
        // 401 = 認証エラー
        // 通常エラーと認証エラーで処理を振り分ける。
        if (err.status !== 401) {
          return store.action(actions.MODALS_ADD, 'viron-error', {
            error: err
          });
        }
        return Promise
          .resolve()
          .then(() => store.action(actions.MODALS_ADD, 'viron-error', {
            title: '認証切れ',
            message: '認証が切れました。再度ログインして下さい。'
          }))
          .then(() => {
            replace('/');
          });
      });
  },

  /**
   * ページ遷移時の処理。
   * @param {riotx.Store} store
   * @param {Object} route
   * @return {Promise}
   */
  onEnter: (store, route) => {
    return store.action(actions.LOCATION_UPDATE, {
      name: 'components',
      route
    });
  }
};
