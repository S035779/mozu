import { dispatch } from '../dispatcher';
import NoteApiClient from '../services/NoteApiClient';
import { spn, log } from '../../utils/webutils';

const pspid = `AvailableAction`;

export default {
  incrementOpenWatch(page) {
    page = ++page > 0 ? page : 1;
    return NoteApiClient.fetchOpenWatch(page)
    .then(items => {
      dispatch({ type: 'item/fetch/openwatch', items, page });
      log.info(`${pspid}> Response: item/fetch/openwatch`);
      spn.stop();
    });
  },
  decrementOpenWatch(page) {
    page = --page > 0 ? page : 1;
    return NoteApiClient.fetchOpenWatch(page)
    .then(items => {
      dispatch({ type: 'item/fetch/openwatch', items, page });
      log.info(`${pspid}> Response: item/fetch/openwatch`);
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
