import { dispatch } from '../dispatcher';
import NoteApiClient from '../services/NoteApiClient';
import { spn, log } from '../../utils/webutils';

const pspid = `CompletedAction`;

export default {
  incrementCloseWatch(page) {
    page = ++page > 0 ? page : 1;
    return NoteApiClient.fetchCloseWatch(page)
    .then(items => {
      dispatch({type: 'item/fetch/close', items, page});
      log.info(`${pspid}> Response: item/fetch/close`);
      spn.stop();
    });
  },
  decrementCloseWatch(page) {
    page = --page > 0 ? page : 1;
    return NoteApiClient.fetchCloseWatch(page)
    .then(items => {
      dispatch({type: 'item/fetch/close', items, page});
      log.info(`${pspid}> Response: item/fetch/close`);
      spn.stop();
    });
  },
  fetchWatchIds() {
    return NoteApiClient.fetchWatchIds()
    .then(watch => {
      dispatch({type: 'id/fetch/watch/close', watch});
      log.info(`${pspid}> Response: id/fetch/watch/close`);
      spn.stop();
    });
  },
  createWatch(auctionID, watch) {
    return NoteApiClient.createWatch(auctionID)
    .then(url => {
      dispatch({type: 'item/create/watch/close', watch, url});
      log.info(`${pspid}> Response: item/create/watch/close`);
      spn.stop();
    });
  },
  deleteWatch(auctionID, watch) {
    return NoteApiClient.deleteWatch(auctionID)
    .then(url => {
      dispatch({type: 'item/delete/watch/close', watch, url});
      log.info(`${pspid}> Response: item/delete/watch/close`);
      spn.stop();
    });
  },
}
