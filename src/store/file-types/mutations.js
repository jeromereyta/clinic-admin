
export function fetchFileTypes(state, fileTypes) {
  state.fileTypes = fileTypes;
}

export function addFileTypes(state, fileType) {
  state.fileTypes.push(fileType);
}
