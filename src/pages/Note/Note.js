import React from 'react';
import { Container } from 'flux/utils';
import ContainerConverter from '../../FluxContainerConverter';
import noteStore from '../../stores/noteStore';
import NoteAction from '../../actions/NoteAction';
import NoteHeader from '../../components/NoteHeader/NoteHeader';
import NoteBody from '../../components/NoteBody/NoteBody';
import NoteFooter from '../../components/NoteFooter/NoteFooter';
import Tabs from '../../components/Tabs/Tabs';
import { log } from '../../../utils/webutils';

const pspid = `NoteControlerView`;

class Note extends React.Component {
  static getStores() {
    return [noteStore];
  }

  static calculateState() {
    return noteStore.getState();
  }

  componentDidMount() {
    NoteAction.increment(this.state.options, this.state.page);
  }

  render() {
    return <div className="window">
      <NoteHeader
        page={this.state.page}
        options={this.state.options} />
      <Tabs />
      <NoteBody
        items={this.state.items}
        options={this.state.options} />
      <NoteFooter />
    </div>;
  }
}
export default Container.create(ContainerConverter.convert(Note));

