'use babel';

import LatexFigsShortcutsView from './latex-figs-shortcuts-view';
import { CompositeDisposable } from 'atom';

function InsertImgDesc(){
  editor = atom.workspace.getActiveTextEditor();
  cursor = editor.getLastCursor();
  view = atom.views.getView(editor);
  atom.commands.dispatch(view, 'editor:newline')
  editor.insertText('\\begin{figure}[htbp]')
  atom.commands.dispatch(view, 'editor:newline')
  editor.insertText('\\centering')
  atom.commands.dispatch(view, 'editor:newline')
  editor.insertText('\\includegraphics[width=5cm]{')
  pos = cursor.getBufferPosition();
  editor.insertText('}')
  atom.commands.dispatch(view, 'editor:newline')
  editor.insertText('\\caption{}')
  atom.commands.dispatch(view, 'editor:newline')
  editor.insertText('\\label{}')
  atom.commands.dispatch(view, 'editor:newline')
  editor.insertText('\\end{figure}')
  cursor.setBufferPosition(pos)
}

function InsertTableDesc(){
  editor = atom.workspace.getActiveTextEditor();
  cursor = editor.getLastCursor();
  view = atom.views.getView(editor);
  atom.commands.dispatch(view, 'editor:newline')
  editor.insertText('\\begin{table}[htb]')
  atom.commands.dispatch(view, 'editor:newline')
  editor.insertText('\\begin{center}')
  atom.commands.dispatch(view, 'editor:newline')
  editor.insertText('\\caption{}')
  atom.commands.dispatch(view, 'editor:newline')
  editor.insertText('\\begin{tabular}{|l|l|} \\hline')
  atom.commands.dispatch(view, 'editor:newline')
  pos = cursor.getBufferPosition();
  editor.insertText('& \\\\ \\hline \\hline')
  atom.commands.dispatch(view, 'editor:newline')
  editor.insertText('& \\\\ \\hline')
  atom.commands.dispatch(view, 'editor:newline')
  editor.insertText('\\end{tabular}')
  atom.commands.dispatch(view, 'editor:newline')
  editor.insertText('\\label{}')
  atom.commands.dispatch(view, 'editor:newline')
  editor.insertText('\\end{center}')
  atom.commands.dispatch(view, 'editor:newline')
  editor.insertText('\\end{table}')
  cursor.setBufferPosition(pos)
}

export default {

  latexFigsShortcutsView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.latexFigsShortcutsView = new LatexFigsShortcutsView(state.latexFigsShortcutsViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.latexFigsShortcutsView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'latex-figs-shortcuts:InsertImg': () => this.InsertImg(),
      'latex-figs-shortcuts:InsertTable': () => this.InsertTable()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.latexFigsShortcutsView.destroy();
  },

  serialize() {
    return {
      latexFigsShortcutsViewState: this.latexFigsShortcutsView.serialize()
    };
  },

  InsertImg() {
    editor = atom.workspace.getActiveTextEditor();
    editor.transact(InsertImgDesc)
  },

  InsertTable() {
    editor = atom.workspace.getActiveTextEditor();
    editor.transact(InsertTableDesc)
  }

};
