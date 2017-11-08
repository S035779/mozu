import { dispatch } from '../dispatcher';
import NoteApiClient from '../services/NoteApiClient';
import { spn, log } from '../../utils/webutils';

const pspid = `NoteAction`;

export default {
  increment(options, page) {
    page = ++page > 0 ? page : 1;
    return NoteApiClient.fetchItems(options, page)
    .then(items => {
      dispatch({ type: 'item/fetch', items, options, page });
      log.info(`${pspid}> Response: item/fetch`);
      spn.stop();
    });
  },
  decrement(options, page) {
    page = --page > 0 ? page : 1;
    return NoteApiClient.fetchItems(options, page)
    .then(items => {
      dispatch({ type: 'item/fetch', items, options, page });
      log.info(`${pspid}> Response: item/fetch`);
      spn.stop();
    });
  },
  createWatch(auctionID) {
    return NoteApiClient.createWatch(auctionID)
    .then(url => {
      dispatch({ type: 'item/create/watch', url });
      log.info(`${pspid}> Response: item/create/watch`);
      spn.stop();
    });
  },
  deleteWatch(auctionID) {
    return NoteApiClient.deleteWatch(auctionID)
    .then(url => {
      dispatch({ type: 'item/delete/watch', url });
      log.info(`${pspid}> Response: item/delete/watch`);
      spn.stop();
    });
  },
}
