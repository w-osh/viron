import { constants as mutations } from '../mutations';

export default {
  /**
   * モーダルを追加します。
   * @param {riotx.Context} context
   * @param {String} tagName
   * @param {Object} tagOpts
   * @param {Object} modalOpts
   * @return {Promise}
   */
  add: (context, tagName, tagOpts, modalOpts) => {
    return Promise
      .resolve()
      .then(() => {
        context.commit(mutations.MODAL_ADD, tagName, tagOpts, modalOpts);
      });
  },

  /**
   * モーダルを削除します。
   * @param {riotx.Context} context
   * @param {String} modalID
   * @return {Promise}
   */
  remove: (context, modalID) => {
    return Promise
      .resolve()
      .then(() => {
        context.commit(mutations.MODAL_REMOVE, modalID);
      });
  }
};