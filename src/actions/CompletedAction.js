import { dispatch } from '../dispatcher';
import NoteApiClient from '../services/NoteApiClient';
import { spn, log } from '../../utils/webutils';

const pspid = `CompletedAction`;

export default {
  incrementCloseWatch(page) {
    page = ++page > 0 ? page : 1;
    return NoteApiClient.fetchCloseWatch(page)
    .then(items => {
      dispatch({ type: 'item/fetch/closewatch', items, page });
      log.info(`${pspid}> Response: item/fetch/closewatch`);
      spn.stop();
    });
  },
  decrementCloseWatch(page) {
    page = --page > 0 ? page : 1;
    return NoteApiClient.fetchCloseWatch(page)
    .then(items => {
      dispatch({ type: 'item/fetch/closewatch', items, page });
      log.info(`${pspid}> Response: item/fetch/closewatch`);
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
