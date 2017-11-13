import { dispatch } from '../dispatcher';
import NoteApiClient from '../services/NoteApiClient';
import { spn, log } from '../../utils/webutils';

const pspid = `NoteAction`;

export default {
  increment(options, page) {
    page = ++page > 0 ? page : 1;
    return NoteApiClient.fetchItems(options, page)
    .then(items => {
      dispatch({type: 'item/fetch/note', items, options, page});
      log.info(`${pspid}> Response: item/fetch/note`);
      spn.stop();
    });
  },
  decrement(options, page) {
    page = --page > 0 ? page : 1;
    return NoteApiClient.fetchItems(options, page)
    .then(items => {
      dispatch({type: 'item/fetch/note', items, options, page});
      log.info(`${pspid}> Response: item/fetch/note`);
      spn.stop();
    });
  },
  fetchWatchIds() {
    return NoteApiClient.fetchWatchIds()
    .then(watch => {
      dispatch({type: 'id/fetch/watch/note', watch});
      log.info(`${pspid}> Response: id/fetch/watch/note`);
      spn.stop();
    });
  },
  createWatch(auctionID, watch) {
    return NoteApiClient.createWatch(auctionID)
    .then(url => {
      dispatch({type: 'item/create/watch/note', watch, url});
      log.info(`${pspid}> Response: item/create/watch/note`);
      spn.stop();
    });
  },
  deleteWatch(auctionID, watch) {
    return NoteApiClient.deleteWatch(auctionID)
    .then(url => {
      dispatch({type: 'item/delete/watch/note', watch, url});
      log.info(`${pspid}> Response: item/delete/watch/note`);
      spn.stop();
    });
  },
}
