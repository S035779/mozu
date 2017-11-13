import { dispatch } from '../dispatcher';
import NoteApiClient from '../services/NoteApiClient';
import { spn, log } from '../../utils/webutils';

const pspid = `AvailableAction`;

export default {
  incrementOpenWatch(page) {
    page = ++page > 0 ? page : 1;
    return NoteApiClient.fetchOpenWatch(page)
    .then(items => {
      dispatch({type: 'item/fetch/open', items, page});
      log.info(`${pspid}> Response: item/fetch/open`);
      spn.stop();
    });
  },
  decrementOpenWatch(page) {
    page = --page > 0 ? page : 1;
    return NoteApiClient.fetchOpenWatch(page)
    .then(items => {
      dispatch({type: 'item/fetch/open', items, page});
      log.info(`${pspid}> Response: item/fetch/open`);
      spn.stop();
    });
  },
  fetchWatchIds() {
    return NoteApiClient.fetchWatchIds()
    .then(watch => {
      dispatch({type: 'id/fetch/watch/open', watch});
      log.info(`${pspid}> Response: id/fetch/watch/open`);
      spn.stop();
    });
  },
  createWatch(auctionID, watch) {
    return NoteApiClient.createWatch(auctionID)
    .then(url => {
      dispatch({type: 'item/create/watch/open', watch, url});
      log.info(`${pspid}> Response: item/create/watch/open`);
      spn.stop();
    });
  },
  deleteWatch(auctionID, watch) {
    return NoteApiClient.deleteWatch(auctionID)
    .then(url => {
      dispatch({type: 'item/delete/watch/open', watch, url});
      log.info(`${pspid}> Response: item/delete/watch/open`);
      spn.stop();
    });
  },
}
